import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import Color from '../utils/Colors'

const ButtonWithBackGround = (props) => {
    const { style = {}, onPress, image } = props

    return (
        <View style={[styles.button, style]}>
            <TouchableOpacity onPress={onPress} >
                   <Image
                     source={image}
                     style={styles.Image1style}
                    />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: 30,
        width : 30,
        borderRadius: 15,
        justifyContent: 'center', 
        alignItems: 'center',
        margin: 10,
    },
    Image1style :{
        padding : 10,
        margin : 5,
        height : 25,
        width : 25,
        resizeMode : 'stretch'
    }
})

export default ButtonWithBackGround;