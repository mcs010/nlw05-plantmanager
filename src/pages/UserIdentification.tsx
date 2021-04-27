import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';

//Navigation
import { useNavigation } from '@react-navigation/core';

//Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

//Components
import { Button } from '../components/Button';

//Styles
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
    //States
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();


    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    //
    async function handleSubmit() {
        if(!name)
            return Alert.alert('Me diz como chamar você 😢');

        //Saves user name on device
        await AsyncStorage.setItem('@plantmanager:user', name); //Awaits it till its saved - '@appName:user' avoids it to be overwritten

        navigation.navigate('Confirmation');
    }

    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >

                {/* Touch anywhere to dismiss keyboard */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    {/* Agroup */}
                    <View style={styles.content}>

                        {/* Form Area */}
                        <View style={styles.form}>

                            {/* Agroup Emoji and Title */}
                            <View style={styles.header}>

                                {/* Emoji */}
                                <Text style={styles.emoji}>
                                    {isFilled ? '😄' : '😀'}
                                </Text>

                                {/* Title */}
                                <Text style={styles.title} >
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>

                            </View>

                            {/* Name input */}
                            <TextInput
                                style={[styles.input, (isFocused || isFilled) && { borderColor: colors.green }]}
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />

                            {/* Confirmation Button */}
                            <View style={styles.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>

                        </View>

                    </View>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        width: '100%'
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },

    header: {
        alignItems: 'center'
    },

    emoji: {
        fontSize: 44
    },

    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },

    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }
});