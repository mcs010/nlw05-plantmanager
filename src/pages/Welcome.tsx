import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';

//Icons
import { Feather } from '@expo/vector-icons';

//Styles
import wateringImg from '../assets/watering.png';
import colors from '../../src/styles/colors';
import fonts from '../styles/fonts';

//Navigation
import { useNavigation } from '@react-navigation/core';

export function Welcome() {

    //State
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification');
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* Agroup */}
            <View style={styles.wrapper}>
                
                {/* Title */}
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil
                </Text>

                {/* Image */}
                <Image source={wateringImg} style={styles.image} resizeMode='contain' />

                {/* Text */}
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
                    sempre que precisar.
                </Text>

                {/* Button */}
                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.5}
                    onPress={handleStart} 
                >
                    <Feather name="chevron-right" style={styles.buttonIcon} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },

    title: {
        fontFamily: fonts.heading,
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        lineHeight: 34
    },

    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },

    image: {
        height: Dimensions.get('window').width * 0.7

    },

    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        width: 56,
        height: 56
    },

    buttonIcon: {
        fontSize: 32,
        color: colors.white,
    }
});