import React, { useEffect, useState } from 'react';
import {
  isAndroid,
  isIPhoneNotchFamily, getStatusBarHeight
} from "@freakycoder/react-native-helpers";
import { Alert, AsyncStorage, AppRegistry, StyleSheet, Dimensions, KeyboardAvoidingView, SafeAreaView, View, Text, Image } from 'react-native';
import {TextInput} from 'react-native-paper'
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const logo = require('../login/lifespring-nobg.png');

export default function SignInScreen(props) {
  // console.log("IN SIGN IN");
  const [passwordVisible,setPasswordVisible] = useState(true)


  const renderHeaderTextContainer = () => (
    <View style={styles.headerContainer}>
      <Image style={styles.logoImageStyle} source={logo}/>
    </View>
  );

  const renderInputContainer = () => (
    <View style={styles.textInputContainer}>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#6C6D72"
        style={[styles.textInputStyle]}
        onChangeText={props.usernameChangeText}
        value={props.username}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#6C6D72"
        style={[styles.textInputStyle]}
        secureTextEntry={passwordVisible}
        onChangeText={props.passwordChangeText}
        value={props.password}
        right={<TextInput.Icon name={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
      />
      <TouchableOpacity
        style={styles.forgotButtonStyle}
        onPress={props.handleForgotPassword}
      >
        <Text
          style={[styles.forgotPasswordTextStyle]}
        >
          {"Forgot Password"}

        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.signInButtonStyle]}
        onPress={props.handleSignInButton}
      >
        <Text style={[styles.signInButtonTextStyle]}>
          {"Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSignUpButtonContainer = () => (
    <View style={styles.signUpButtonContainer}>
      <Text style={[styles.signUpTextStyle]}>
        {"Don't Have An Account ?"}
      </Text>
      <TouchableOpacity
        style={styles.signUpButtonStyle}
        onPress={props.handleSignUp}
      >
        <Text style={[styles.signUpButtonTextStyle]}>
          {'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <ScrollView>
      <KeyboardAvoidingView
        enabled
        behavior="position"
        style={styles.keyboardAvoidingViewStyle}
      >
        <SafeAreaView
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {renderHeaderTextContainer()}
          {renderInputContainer()}
        </SafeAreaView>
        <View
          style={{
            // position: "absolute",
            bottom: isIPhoneNotchFamily() ? getStatusBarHeight() : 8,
          }}
        >
          {renderSignUpButtonContainer()}
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: "#181A1F",
    alignItems: "center",
    flex: 1,
  },
  headerContainer: {
    // marginBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  titleTextStyle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
  },
  descriptionTextStyle: {
    fontSize: 15,
    color: "#63A3F4",
  },
  textInputContainer: {
    // marginTop: 5,
    justifyContent: "center",
    width: width * 0.85,
  },
  textInputStyle: {
    height: isIPhoneNotchFamily() ? 60 : 55,
    marginBottom: 8,
    fontSize: 16,
    paddingLeft: 32,
    backgroundColor: "#F5F5F5",
    color: "#000",
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
  },
  forgotPasswordTextStyle: {
    color: "#000",
  },
  forgotButtonStyle: {
    height: 30,
    justifyContent: "center",
    marginLeft: "auto",
  },
  signInButtonStyle: {
    marginTop: 10,
    backgroundColor: "#63A3F4",
    width: width * 0.85,
    height: isIPhoneNotchFamily() ? 60 : 55,
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonTextStyle: {
    color: "#000",
    fontWeight: "600",
  },
  logoImageStyle: {
    width: 250,
    height: 250,
    // marginBottom: 10,
  },
  googleButtonStyle: {
    backgroundColor: "#FFFFFF",
    width: width * 0.85,
    height: isIPhoneNotchFamily() ? 60 : 55,
    marginTop: 8,
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  googleButtonTextStyle: {
    color: "#181A1F",
    fontWeight: "600",
  },
  facebookButtonStyle: {
    backgroundColor: "#3A579B",
    width: width * 0.85,
    height: isIPhoneNotchFamily() ? 60 : 55,
    marginTop: 8,
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  facebookButtonTextStyle: {
    color: "#FFF",
    fontWeight: "600",
  },
  signUpButtonContainer: {
    marginTop: 8,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  signUpButtonStyle: {
    height: 40,
    justifyContent: "center",
    marginLeft: 8,
  },
  signUpTextStyle: {
    fontSize: 14,
    color: "#000",
  },
  signUpButtonTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  appleButtonStyle: {
    backgroundColor: "#FFFFFF",
    width: width * 0.85,
    height: isIPhoneNotchFamily() ? 60 : 55,
    marginTop: 8,
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  appleButtonTextStyle: {
    color: "#181A1F",
    fontWeight: "600",
  },
  newAccountContainer: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 5,
  },
});
