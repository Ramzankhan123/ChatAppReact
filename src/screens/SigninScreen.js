import React from 'react';
import { View , Text, StyleSheet} from 'react-native';
import Button from '../components/Button';
import MyText from '../components/MyText';
import Strings from '../const/Strings';

function SigninScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>SignIn Screeen</Text>
            <MyText />
            <Button title ={Strings.Join} />
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