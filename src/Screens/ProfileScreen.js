import React , { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
}
from 'react-native';
import styles from "./styles";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const DisplayFields = (props) => {
    return(
        <View style={{ flexDirection:'row' , justifyContent:'center', width: wp(65) }}>
            <Text style={{ ...styles.txtFieldName }}>
                {props.fieldName}:
            </Text>
            <Text style={{ ...styles.txtFieldValue }}>
                {props.fieldValue}
            </Text>
        </View>
    )
}

const ProfileScreen = ({ navigation , route }) => {
    let data = route.params.data ? route.params.data : null;

    console.log("route params - ", route.params)

    return(
        <View style={{ flex: 1 , backgroundColor: 'lightgrey' , alignItems: 'center' , justifyContent: 'center' }}>
            <View style={{ height: hp(50) , width: wp(85), flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FFF' , borderRadius: 5 , elevation: 5}}>
                <Image 
                    style={ styles.profileScreenImageView } 
                    source={{uri: data ? data.picture : ''}}
                />
                <Text style={{ ...styles.txtExtraLarge, marginBottom: hp(3) }}>
                    {data? data.firstname : ''} {data ? data.surname : ''}
                </Text>
                
                <View style={{ width: wp(70), height: hp(20), flexDirection: 'column' , alignItems:'center', justifyContent:'flex-start', marginTop: hp(4), borderWidth:0 }}>
                    <DisplayFields fieldName={"Age"} fieldValue={ data ? data.age : ''}/>
                    <DisplayFields fieldName={"Gender"} fieldValue={ data ? data.gender : ''}/>
                    <DisplayFields fieldName={"Company"} fieldValue={ data ? data.company : ''}/>
                    <DisplayFields fieldName={"Email Id"} fieldValue={ data ? data.email : ''}/>
                    <DisplayFields fieldName={"Phone"} fieldValue={ data ? data.phone : ''}/>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen;