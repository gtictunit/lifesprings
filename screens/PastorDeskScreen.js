import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, AsyncStorage } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

import HTMLView from 'react-native-htmlview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Zoom } from 'react-native-reanimated-zoom';

function PastorDeskScreen(props) {
    const title = props.navigation.getParam('title');
    const date = props.navigation.getParam('date');
    const content = props.navigation.getParam('content');

    // console.log("Content :::>  "+content)

    return (
        <View style={{ backgroundColor: 'white', padding: 10}}>
            <View style={styles.icon}>
                <Ionicons
                    name="arrow-back"
                    size={height / 30}
                    color='black'
                    onPress={() => props.navigation.goBack()}
                />
            </View> 
            <Zoom>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.header}>{title}</Text>
                    <Text style={styles.title}>{date}</Text>
                    <HTMLView value={"<div>"+content+"</div>"} stylesheet={styles}/>
                </View>
            </ScrollView>
            </Zoom>
        </View>
    );
}

const styles = StyleSheet.create({
    welcome: {
        padding: height / 37,
    },
    icon: {
        padding: height / 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        color: 'grey',
        fontSize: height / 35,
        paddingBottom: height / 75,
        paddingTop: height / 50,
        paddingLeft: width /90,
        fontWeight: 'bold',
    },
    title: {
        color: 'grey',
        paddingLeft: width /90,
        paddingBottom: height / 25,
        fontSize: height / 65,
        fontWeight: 'bold'
      },
    content: {
          color: 'black',
          paddingLeft: width /90,
          paddingBottom: height / 25,
          fontSize: height / 50,
          fontWeight: 'bold'
        },
});

export default PastorDeskScreen;