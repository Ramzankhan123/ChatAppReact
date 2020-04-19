import React from 'react';
import { View , Text, StyleSheet} from 'react-native';

function AddGroupScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>AddGroupScreen Screeen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
   container : {
       flex : 1,
       justifyContent : 'center',
       alignItems : 'center',
   },
   text : {
       fontSize : 24,
       fontWeight : 'bold'
   }
})

export default AddGroupScreen;