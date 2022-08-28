import React, {useState, useEffect} from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, Linking, AsyncStorage } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const logo = require('./login/logo.png');

function ProfileScreen (props) {
  const [name, updateName] = useState('')
  const [email, updateEmail] = useState('')
  const [phone, updatePhone] = useState('')


  useEffect(() => {
    (async () => {
      const namer = await AsyncStorage.getItem('@username');
      const emailr = await AsyncStorage.getItem('@useremail');
      const phoner = await AsyncStorage.getItem('@userphone');
      updateName(namer);
      updateEmail(emailr);
      updatePhone(phoner);
    })();
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.avatar}
            source={logo} />

          <Text style={styles.name}>{name}</Text>
          <Text style={styles.userInfo}>{email}</Text>
          <Text style={styles.userInfo}>{phone}</Text>
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.iconContent}>
          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/70/000000/gear.png' }} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.info}>Settings</Text>
        </View>
      </View>

      <View style={styles.item}>
          <View style={styles.iconContent}>
            <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/70/000000/email.png' }} />
          </View>
          <View style={styles.infoContent}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('mailto:support@glorytabernacleibadan.org?subject=Feedback')
            }}>
            <Text style={styles.info}>Talk to Us</Text>
          </TouchableOpacity>
          </View>
      </View>

      <View style={styles.item}>
          <View style={styles.iconContent}>
            <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/70/000000/sign-out.png' }} />
          </View>
          <View style={styles.infoContent}>
          <TouchableOpacity
            onPress={() => {
              TrackPlayer.stop()
              AsyncStorage.setItem('@isLoggedIn', '99')
              props.navigation.navigate('Login');//added just for test purpose
            }}>
            <Text style={styles.info}>Logout</Text>
          </TouchableOpacity>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#DCDCDC",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#778899",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#000",
  },
  login: {
    color: '#000',
  }
});

export default ProfileScreen;