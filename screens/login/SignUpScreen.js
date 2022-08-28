import React, { useEffect, useState } from 'react';
import { Alert, AsyncStorage, AppRegistry, StyleSheet, SafeAreaView, Dimensions, View, TextInput, Text } from 'react-native';
import {
  isAndroid,
  isIPhoneNotchFamily, getStatusBarHeight
} from "@freakycoder/react-native-helpers";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen(props) {
  console.log("IN signup");


  const renderHeaderTextContainer = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.titleTextStyle]}>
        {"Sign Up"}
      </Text>
      <View style={{ marginTop: 16 }}>
        <Text style={[styles.descriptionTextStyle]}>
        {"Glory Tabernacle Mobile Streaming App"}
        </Text>
      </View>
    </View>
  );

  const renderTextInputContainer = () => (
    <View style={styles.textInputContainer}>
      <TextInput        
        placeholder={"First Name"}
        placeholderTextColor="#6C6D72"
        style={[styles.textInputStyle]}
        onChangeText={props.fullNameOnChange}
      />
      <TextInput        
        placeholder={"Last Name"}
        placeholderTextColor="#6C6D72"
        style={[styles.textInputStyle]}
        onChangeText={props.lastNameOnChange}
      />
      <TextInput        
        placeholder={"Email"}
        placeholderTextColor="#6C6D72"
        style={[styles.textInputStyle]}
        onChangeText={props.emailOnChange}
      />
      <TextInput        
        placeholder={"Phone"}
        placeholderTextColor="#6C6D72"
        style={[styles.textInputStyle]}
        onChangeText={props.phoneOnChange}
      />
      <TextInput        
        placeholder={"Username"}
        placeholderTextColor="#6C6D72"
        style={[styles.textInputStyle]}
        onChangeText={props.usernameOnChange}
      />
      <TextInput
        placeholder={"Password"}
        placeholderTextColor="#6C6D72"
        style={[styles.textInputStyle]}
        secureTextEntry
        onChangeText={props.signUpPasswordChangeText}
      />
    </View>
  );

  const renderSignUpButton = () => (
    <View style={styles.signUpButtonContainer}>
      <TouchableOpacity
        style={[styles.signUpButtonStyle]}
        onPress={props.handleSignUpButton}
      >
        <Text style={[styles.signUpButtonTextStyle]}>
          {"Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSignInTextContainer = () => (
    <View style={styles.signInButtonContainer}>
      <Text style={[styles.signInQuestionTextStyle]}>
        {"Do You have An Account?"}
      </Text>
      <TouchableOpacity
        style={styles.signInButtonStyle}
        onPress={props.handleSignIn}
      >
        <Text style={[styles.signInButtonTextStyle]}>
          {"Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );




  return (<ScrollView>
    <SafeAreaView style={styles.mainContainer}>
      {renderHeaderTextContainer()}
      {renderTextInputContainer()}
    </SafeAreaView>
    {/* <View
      style={{
        // position: "absolute",
        bottom: isIPhoneNotchFamily() ? getStatusBarHeight() : 8,
      }}
    > */}
      {renderSignUpButton()}
      {renderSignInTextContainer()}
    {/* </View> */}
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginTop: 24,
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
    color: "#696A6F",
  },
  textInputContainer: {
    marginTop: 32,
    width: width * 0.85,
  },
  textInputStyle: {
    height: isIPhoneNotchFamily() ? 60 : 55,
    marginBottom: 8,
    fontSize: 16,
    paddingLeft: 32,
    backgroundColor: "#262A34",
    color: "#fff",
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
  },
  signUpButtonContainer: {
    marginTop: isIPhoneNotchFamily()
      ? height * 0.12
      : isAndroid
        ? height * 0.10
        : height * 0.09,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  signUpButtonStyle: {
    backgroundColor: "#63A3F4",
    width: width * 0.85,
    height: isIPhoneNotchFamily() ? 60 : 55,
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButtonTextStyle: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 70,
    height: 100,
    alignItems: "center",
    justifyContent: "space-around",
  },
  signInQuestionTextStyle: {
    fontSize: 14,
    color: "#fff",
  },
  signInButtonStyle: {
    height: 40,
    justifyContent: "center",
    marginLeft: 8,
  },
  signInButtonTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#519bf4",
  },
  signInButtonContainer: {
    marginTop: 8,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
