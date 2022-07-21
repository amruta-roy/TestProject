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

//  'DisplayConnections' component is used to display some of the details for each of the connection record.
//  -   The record details are passed as props
//  -   'navigation' object too is passed as props

const DisplayConnections = (props) => {
    return(
        <View 
            key={props.item.index} 
        >
            {/* Create a clickable record. 
                -   On click the user will be navigated to the "ProfileScreen" which 
                    displays all the details for this connection 
                -   "data" is the record which is passed as a Route Param to the 'ProfileScreen' */}
            <TouchableOpacity
                style={ styles.connView }
                onPress={()=> {
                    props.navigation.navigate("Profile", { data : props.item });
                }}
            >
                {/* Display the profile picture */}
                <Image 
                    style={ styles.mainScreenImageView } 
                    source={{uri: props.item.picture}}
                    //source={{uri: "https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-2-1200.jpg"}}
                />
                {/* This View displays the FirstName, Surname, Age and Gender */}
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

    // Search Text entered by user in the 'Search box'
    const [search, setSearch] = useState('');

    // masterDataSource to store the originally fetched data
    const [masterDataSource, setMasterDataSource] = useState([]);  
    // filteredDataSource to store the data filtered according to the search Text
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    
    const [loader, setLoader] = useState(true);
    const [isError, setIsError] = useState(false);

    // Fetch the data when the component renders for the first time
    useEffect( ()=> {
        getConnections();
    }, []);

    // Function to fetch data from API
    const getConnections = async () => {
        
        await axios
        .get(
            "https://run.mocky.io/v3/e6daf7f7-9ec2-42cf-b221-ef64f1c0c6a5"
        )
        .then( (res) => {
            // set both the data sets to the fetched data.
            setMasterDataSource(res.data);
            setFilteredDataSource(res.data);

            // Set Loader to false once data is fetched and set in state
            setLoader(false);
        })
        .catch((err) => {
            // Set error flag to true and disable the loader
            setIsError(true);
            setLoader(false);
        });
    };


    // Function to search through the list of connections for 'firstname' and 'lastname'.
    const searchFilterFunction = (text) => {
        
        // Check whether search string is empty
        if (text) {
            // traverse through the original data
            const newData = masterDataSource.filter(function (item) {

                // convert the current records data to Uppercase
                const itemFirstName =   item.firstname ? item.firstname.toUpperCase() : ''.toUpperCase();
                const itemSurname = item.surname ? item.surname.toUpperCase() : ''.toUpperCase();

                // convert search text to Uppercase
                const textData = text.toUpperCase();
        
                // Check if current record matches with the user entered Search string
                //   if yes - return the record and save it to 'newData'
                if (itemFirstName.indexOf(textData) > -1) {
                    return true;
                } else if (itemSurname.indexOf(textData) > -1) {
                    return true;
                }
          });
    
          // The records which matched the search string are being set to "filteredDataSource" 
          // which in turn will be rendered on the screen.
          setFilteredDataSource(newData);
          setSearch(text);
        } 
        else {   // search text is empty, display all the original records
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
    };
    
    // Function to render each of the Connections which is in 'filteredDataSource' array
    const renderConnections = () => {
        const items = [];

        // check whether 'filteredDataSource' has data
        if (filteredDataSource.length > 0) {
            for (let item of filteredDataSource) {
                // push the items to be rendered into 'items' array
                // 'DisplayConnections' component is used to render each of the record
                items.push(
                    <DisplayConnections key={item.index} item={item} navigation={navigation}/>
                );
            }
        }
        // return the 'items' array
        return items;
    };

    return(
        <View style={styles.MainView}>

            {/* If data is not ready display the loader */}
            { loader ? (
                <View style={styles.loader}>
                    <Text style={ styles.txtName }>Loading data.......</Text>
                </View>
            ) : isError ?  (    // if error in fetching data, display error message
                <View style={styles.loader}>
                    <Text style={ styles.txtName }>Couldn't fetch data.</Text>
                    <Text style={{ ...styles.txtName , marginTop: hp(1)}}>Please try again later</Text>
                </View>
            )
            :(  // Display the data from 'filteredDataSource' (if search string is blank, all the data will be displayed)
                <View style={{ height: hp(100) }}>
                    <View>
                        {/* Display the Search Box */}
                        <TextInput
                            placeholder={"Search"}
                            placeholderTextColor='#36454F'
                            style={styles.searchTxtInp}
                            maxLength={30}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={search}
                            clearButtonMode="always"
                            // when user enters text, call the "searchFilterFunction" to search the master data
                            onChangeText={text => searchFilterFunction(text)}
                        />
                    </View>

                    {/* renderConnections function will render the data records to be displayed */}
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