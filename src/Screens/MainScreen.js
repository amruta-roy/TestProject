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
import axios from 'axios';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


const DisplayConnections = (props) => {
    return(
        <View 
            key={props.item.index} 
            // style={ styles.connView }
        >
            <TouchableOpacity
                style={ styles.connView }
                onPress={()=> {
                    // Alert.alert("Clicked on it !!!")
                    console.log("Navigation object: "+ JSON.stringify(props.navigation))
                    props.navigation.navigate("Profile", { data : props.item });
                }}
            >
                <Image 
                    style={ styles.mainScreenImageView } 
                    source={{uri: props.item.picture}}/>
                    {/* source={{uri: "https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-2-1200.jpg"}}/> */}
                <View style={{ flexDirection: 'column' , alignItems:'flex-start' , marginLeft: wp(6) }}>
                    <Text style={ styles.txtName }>
                        {props.item.firstname} {props.item.surname}
                    </Text>
                    <Text style={{ ...styles.txtSmall , paddingTop: hp(0.5) }}>
                        {props.item.age} {props.item.gender}
                    </Text>
                    <Text style={ styles.txtSmall } >........</Text>
                </View>
            </TouchableOpacity>
        </View>
        
    );
}

const MainScreen = ({ navigation }) => {

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);  
    const [loader, setLoader] = React.useState(true);

    useEffect( ()=> {
        getConnections();
    }, []);

    const getConnections = async () => {
        // console.log("Inside callAPI() ->>");
        
        await axios
        .get(
            "https://run.mocky.io/v3/e6daf7f7-9ec2-42cf-b221-ef64f1c0c6a5"
        )
        .then( (res) => {
            console.log("REsponse from API - "+ res.data.length );
            setMasterDataSource(res.data);
            setFilteredDataSource(res.data);
            setLoader(false);
        })
        .catch((err) => {
            console.log("Error in fetching data.......")
            setLoader(false);
        });
    };

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = masterDataSource.filter(function (item) {
            const itemFirstName = item.firstname
              ? item.firstname.toUpperCase()
              : ''.toUpperCase();
            const itemSurname = item.surname ? item.surname.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
    
            if (itemFirstName.indexOf(textData) > -1) {
              return true;
            } else if (itemSurname.indexOf(textData) > -1) {
              return true;
            }
          });
    
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
    };
    

    const renderConnections = () => {
        const items = [];

        if (filteredDataSource.length > 0) {
            for (let item of filteredDataSource) {
            items.push(
                <DisplayConnections key={item.index} item={item} navigation={navigation}/>
            );
            }
        }
        return items;
    };
    

    return(
        <View style={styles.MainView}>

            { loader ? (
                <View style={styles.loader}>
                    <Text>Loading data.......</Text>
                </View>
            ) : (
                <View style={{ height: hp(100) }}>
                    <View>
                        <TextInput
                            placeholder={"Search"}
                            placeholderTextColor='#36454F'
                            style={styles.searchTxtInp}
                            maxLength={30}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={search}
                            clearButtonMode="always"
                            onChangeText={text => searchFilterFunction(text)}
                            // onClear={text => searchFilterFunction('')}
                        />
                    </View>
                    <ScrollView style={{ height: hp(75) }}>
                        {renderConnections()}
                        <View style={{ height: hp(4)}}/>
                    </ScrollView>
                </View>
                )
            }            
        </View>
    );
}

export default MainScreen;