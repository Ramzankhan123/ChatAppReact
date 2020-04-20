import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import ButtonWithBackGround from '../components/ButtonWithBackGround';
import images from '../const/Images';
import { Header } from 'react-native/Libraries/NewAppScreen';
import MyHeader from '../components/Header';
import  GroupItems  from '../components/GroupItems';
import firebase, { firestore } from '../firebase/Firebase';

function GroupScreen({ navigation }) {
    // useLayoutEffect(()=>{
    //    // console.log("rkkk",navigation);
    //     navigation.setOptions({
    //         headerRight : () =>{
    //             <ButtonWithBackGround  onPress ={()=>{
    //                navigation.navigate('')
    //             }}
    //              image = {images.add_icon}
    //              style ={styles.buttonstyle}
    //             />
    //         },
    //         headerLeft : () =>{
    //             <ButtonWithBackGround  onPress ={()=>{

    //             }}
    //              image = {images.logout}
    //             />
    //         }
    //     })
    // })

    const [groups, setGroups] = useState([]);
    useEffect(() => {
        getChats();
    }, []);
    function getChats() {
        const db = firestore
        var groupArray = []

        db.collection("groups")
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type == "added") {
                        console.log("New Group", change.doc.data())
                        groupArray.push(change.doc.data())
                    }
                    if (change.type === 'modified') {
                        console.log("Modified Group : ", change.doc.data())
                    }
                    if (change.type === "removed") {
                        console.log("Removed Group ", change.doc.data())
                    }
                    setGroups(groupArray)
                })
            })
    }

    return (
        <View style={styles.container}>
            <MyHeader title='Group Page' imageLeft={images.logout}
                imageRight={images.add_icon} onPressRight={() => { navigation.navigate('AddGroupPage') }}
            />
            <FlatList
                data={groups}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('ChatPage',{
                                item
                            })
                        }}>
                            <GroupItems item={item} />
                        </TouchableOpacity>
                    )
                }}
            >

            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    buttonstyle: {
        backgroundColor: 'red'
    }
})

export default GroupScreen;