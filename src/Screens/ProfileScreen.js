import React , { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
}
from 'react-native';
import styles from "./styles";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


// 'DisplayFields' component is to display individual fields of the record.
//  It takes fieldName and fieldValue as props
//  -   'fieldName' contains the name of the field to be displayed e.g. 'Age','Gender' etc..
//  -   'fieldValue' contains the value to be displayed for the particular field e.g. '27' for 'Age' , "male" for 'gender' etc..
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


//  'ProfileScreen' component is for displaying all details of a record
//  -   The record whose details are to be displayed is passed as a "route param" - 'data'
const ProfileScreen = ({ navigation , route }) => {

    let data = route.params.data ? route.params.data : null;

    return(
        <View style={{ flex: 1 , backgroundColor: 'lightgrey' , alignItems: 'center' , justifyContent: 'center' }}>
            <View style={{ height: hp(50) , width: wp(85), flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FFF' , borderRadius: 5 , elevation: 5}}>
                {/*  Display the Profile Picture of the record */}
                <Image 
                    style={ styles.profileScreenImageView } 
                    source={{uri: data ? data.picture : ''}}
                    // source={{uri: "https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-2-1200.jpg"}}
                />

                {/*  Display the 'firstname' and 'surname' of the record */}
                <Text style={{ ...styles.txtExtraLarge, marginTop: hp(2.5) }}>
                    {data? data.firstname : ''} {data ? data.surname : ''}
                </Text>
                
                {/*  Display "Age" , "Gender", "Company" , "Email Id" and "Phone" of the record */}
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