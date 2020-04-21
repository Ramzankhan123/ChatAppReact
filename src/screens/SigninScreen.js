import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import Button from '../components/Button';
import MyText from '../components/MyText';
import Strings from '../const/Strings';
import PasswordText from '../components/PasswordText';
import Constants from '../const/Constants';
//import DismissKeyBoard from '../components/DismissKeyBoard';
import Utility from '../utils/Utility';
import Color from '../utils/Colors';
import images from '../const/Images';
import DismissKeyBoard from '../components/DismissKeyBoard';
import firebase from '../firebase/Firebase';



function SigninScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState('');

    validateEmailAddress = () => {
        const isValidEmail = Utility.isEmailValid(email);
        isValidEmail ? setEmailError('') : setEmailError(Strings.InvalidEmailAddress)
        return isValidEmail
    }

    validatePasswordField = () => {
        const isValidField = Utility.isValidFiled(password);
        isValidField ? setPasswordError('') : setPasswordError(Strings.PasswordFieldEmpty)
        return isValidField
    }
    performAuth = () =>{
        const isValidEmail = validateEmailAddress();
        const isValidPassword = validatePasswordField();
        if(isValidEmail && isValidPassword){
            setEmailError('');
            setPasswordError('');
            registration(email , password);
        }
    }

    registration = async(email, password) => {
        try {
            setIsLoading(true);
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    setIsLoading(false);
                   // navigation.navigate('GroupPage');
                    navigation.reset({
                        index : 0,
                        routes : [{name : "GroupPage"}]
                    })
                    //Alert.alert('Logged in ');

                })
                .catch((error) => {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(user => {
                            setIsLoading(false);
                            Alert.alert("New User Create Please Login Again !");
                        })
                        .catch((error) => {
                            setIsLoading(false);
                            console.log("firebase error=>", error);
                            Alert.alert(error.message);
                        })
                })
        } catch (error) {
            setIsLoading(false);
            Alert.alert(error.message);
        }
    }

    return (
        //   <DismissKeyBoard>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View>
                <SafeAreaView>
                    <Image style={styles.logo} source={images.sign_up} />
                    <MyText
                        terms={email}
                        error={emailError}
                        placeholders={Strings.EmailPlaceHolder}
                        OnTermsChange={newEmail => setEmail(newEmail)}
                        OnValidateEmailAddress={validateEmailAddress}
                    />
                    <PasswordText
                        terms={password}
                        error={passwordError}
                        placeholders={Strings.PasswordPlaceHolder}
                        OnTermsChange={newPass => setPasword(newPass)}
                        OnValidatePassword={validatePasswordField}
                    />
                    <Button title={Strings.Join} onPress={performAuth} isLoading={isLoading}/>
                </SafeAreaView>
            </View>

        </KeyboardAvoidingView>
        //   </DismissKeyBoard>
        // <View style={styles.container}>
        //     <Text style={styles.text}>SignIn Screeen</Text>
        //     <MyText />
        //     <PasswordText />
        //     <Button title={Strings.Join} />
        // </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        margin: Constants.screenHeight * 0.04

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.Darkwhite
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default SigninScreen;