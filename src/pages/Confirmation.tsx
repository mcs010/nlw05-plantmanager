import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

//Navigation
import { useNavigation } from '@react-navigation/core';

//Components
import {Button} from '../components/Button';

//Styles
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation(){

    //States
    const navigation = useNavigation();

    function handleMoveOn(){
        navigation.navigate('PlantSelect');
    }

    return(
        <SafeAreaView style={styles.container} >

            <View style={styles.content}>

                {/* Icon */}
                <Text style={styles.emoji}>
                    😄
                </Text>

                {/* Title */}
                <Text style={styles.title}>
                    Prontinho
                </Text>
                
                {/* Subtitle */}
                <Text style={styles.subtitle}>
                    Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
                </Text>

                {/* Confirmation Button */}
                <View style={styles.footer}>
                    <Button 
                        title="Começar"
                        onPress={handleMoveOn}
                    />
                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },

    emoji: {
        fontSize: 78
    },

    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },

    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading
    },

    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    }
});