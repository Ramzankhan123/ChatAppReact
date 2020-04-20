import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomTextField from '../components/CustomTextField';
import Button from '../components/Button';
import Color from '../utils/Colors';
import Utility from '../utils/Utility';
import Strings from '../const/Strings';
import firebase, { firestore } from '../firebase/Firebase';

function AddGroupScreen({ navigation }) {
    const [groupName, setGroupName] = useState('');
    const [fieldError, setFieldError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    validateField = () => {
        const isValidField = Utility.isValidFiled(groupName);
        isValidField ? setFieldError('') : setFieldError(Strings.GroupNameEmpty);
        return isValidField;
    }

    function createGroupFireBase() {
        setIsLoading(true)
        const groupRef = firestore.collection("groups").doc();
        const userID = firebase.auth().currentUser.uid
        groupRef.set({
            groupID: groupRef.id,
            groupName: groupName,
            userID: userID
        }).then(function (docRef) {
            setIsLoading(false);
            console.log("Document written with ID :", groupRef.id);
            addMemberOfChatToFirebase(groupRef.id, userID);

        }).catch(function (error) {
            Alert.alert(error.message);
            setIsLoading(false);
            console.log("Error adding doc", error);

        })
    }

    function addMemberOfChatToFirebase(groupId, userID){
        const memberRef = firestore.collection("members").doc(groupId).collection('member').doc();
        memberRef.set({
            userID : userID
        }).then(function(docRef){
            navigation.goBack();
            setGroupName('')
        })
        .catch(function(error){
            setIsLoading(false);
            console.error("Error adding document :", error);
        })
    }
    performCreateGroup = () => {
        const isValidField = validateField()
        if(isValidField){
            createGroupFireBase()
            
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>AddGroupScreen Screeen</Text>
            <CustomTextField
                terms={groupName}
                error={fieldError}
                placeholders={Strings.EnterYourGroupName}
                OnTermsChange={newGroupName => setGroupName(newGroupName)}
                OnValidateTextField={validateField}
            />
            <Button
                title={Strings.CreateGroup}
                onPress={performCreateGroup}
                isLoading={isLoading}
            />

        </View>
    );
}

const styles = StyleSheet.create({
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

export default AddGroupScreen;