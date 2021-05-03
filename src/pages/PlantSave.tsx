import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Alert,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

//Dealing with Svg
import { SvgFromUri } from 'react-native-svg';

//Assets
import waterdrop from '../assets/waterdrop.png';

//Components
import { Button } from '../components/Button';

//Libs
import { PlantProps, savePlant } from '../libs/storage';

//Styles
import colors from '../styles/colors';
import fonts from '../styles/fonts';

//Interface
interface Params {
    plant: PlantProps
}


export function PlantSave() {

    //States
    const route = useRoute();
    const { plant } = route.params as Params;
    const navigation = useNavigation();

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDateTimePicker, setShowDateTimePicker] = useState(Platform.OS === 'ios');

    function handleChangeTime(event: Event, datetime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDateTimePicker(oldState => !oldState);
        }

        if(datetime && isBefore(datetime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Não é possível escolher uma data/hora já passada! ⏰');
        }

        if(datetime)
            setSelectedDateTime(datetime);
    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDateTimePicker(oldState => !oldState);
    }

    async function handleSave(){
        try{
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito Obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants',
            });

        }catch{
            Alert.alert('Não foi possível salvar 😢');
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>

                {/* Agroup Plant Info and Image */}
                <View style={styles.plantInfo}>

                    {/* Image */}
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />

                    {/* Plant Name & Plant About Text */}
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>

                </View>

                {/* Agroup Tips, Alert and Button */}
                <View style={styles.controller}>

                    {/* Agroup Tips */}
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {showDateTimePicker &&(
                        <DateTimePicker
                            value={selectedDateTime}
                            mode='time'
                            display='spinner'
                            onChange={handleChangeTime}
                        />
                    )}

                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                            style={styles.dateTimePickerButton}
                                onPress={handleOpenDateTimePickerForAndroid}
                            >
                                <Text style={styles.dateTimePickerText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                    <Button
                        title="Cadastrar Planta"
                        onPress={handleSave}
                    />

                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },

    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },

    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },

    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },

    tipImage: {
        width: 56,
        height: 56,
    },

    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },

    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },

    dateTimePickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },

    dateTimePickerText:{
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    }
});