import React from 'react';
import { View , Text, StyleSheet} from 'react-native';

function SigninScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>SignIn Screeen</Text>
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

export default SigninScreen;