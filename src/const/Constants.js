import {Dimensions, Platform } from 'react-native';
let headerHeight = Platform.OS === 'ios' ? 90 : 46
let footerHeight = 55

const constants = {
    headerHeight : headerHeight,
    footerHeight : footerHeight,
    viewHeight : Dimensions.get('window').height - headerHeight,
    screenHeight : Dimensions.get('window').height,
    screenWidth : Dimensions.get('window').width
}
export default constants;
