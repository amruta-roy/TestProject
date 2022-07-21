import {StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default StyleSheet.create({
  MainView: {
    height:hp(100),
    width:wp(100),
    backgroundColor:'#FFF'
  },
  loader: {
    flex: 1, 
    marginTop: hp(40), 
    alignItems:"center", 
    backgroundColor: '#FFF'
  },
  connView:{
    flexDirection: 'row', 
    justifyContent:'flex-start' , 
    alignItems:'center', 
    height: hp(12) , 
    width: wp(100) , 
    borderBottomWidth: 1 , 
    borderBottomColor: 'lightgrey' 
  },
  mainScreenImageView: {
    height: hp(8), 
    width: wp(16), 
    marginLeft: wp(6), 
    backgroundColor:'lightblue', 
    borderRadius: 50
  },
  profileScreenImageView: {
    height: 150, 
    width: 150, 
    // marginLeft: wp(6), 
    marginTop: hp(-8),
    backgroundColor:'grey', 
    borderRadius: 75,
    borderWidth: 10,
    borderColor: 'lightgrey'
  },
  txtName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#36454F',
  },
  txtSmall: {
    fontSize: 14,
    color: '#63666A',
  },  
  txtExtraLarge: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  txtFieldName: {
    fontSize: 18,
    color: '#63666A',
    fontWeight: 'bold', 
    paddingRight: wp(2) 
  },
  txtFieldValue: {
    fontSize: 18,
    color: '#63666A',
  },
  searchTxtInp: {
    width: wp(100),
    height: hp(7),
    alignSelf: "center",
    paddingHorizontal: wp(8),
    color: '#36454F',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor:'lightgrey'
  },
});