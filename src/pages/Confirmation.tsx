import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

//Navigation
import { useNavigation, useRoute } from '@react-navigation/core';

//Components
import {Button} from '../components/Button';

//Styles
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params{
    title: string,
    subtitle: string,
    buttonTitle: string,
    icon: 'smile' | 'hug',
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😄',
}

export function Confirmation(){

    //States
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    function handleMoveOn(){
        navigation.navigate(nextScreen);
    }

    return(
        <SafeAreaView style={styles.container} >

            <View style={styles.content}>

                {/* Icon */}
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                {/* Title */}
                <Text style={styles.title}>
                    {title}
                </Text>
                
                {/* Subtitle */}
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>

                {/* Confirmation Button */}
                <View style={styles.footer}>
                    <Button 
                        title={buttonTitle}
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