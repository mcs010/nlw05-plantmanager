import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';

//Storage
import AsyncStorage from '@react-native-async-storage/async-storage';


//Styles
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userImg from '../assets/matheus.jpeg';

import {getStatusBarHeight} from 'react-native-iphone-x-helper';


export function Header(){

    //States
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        loadStorageUserName();
    },[]);

    return(
        <View style={styles.container}>

            {/* Agroup Greeting */}
            <View>

                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>
                    {userName}
                </Text>

            </View>

            {/* Profile Image */}
            <Image source={userImg} style={styles.image} />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },

    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },

    userName:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },

    image:{
        width: 70,
        height: 70,
        borderRadius: 40
    }
});