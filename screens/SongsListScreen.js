import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, AsyncStorage } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { toggleFavourite } from '../store/actions/songsActions';

import SongItem from '../components/SongItem';
import Colors from '../components/Colors';

const { width, height } = Dimensions.get('window');


const SongsListScreen = (props) => {
  const GENRES = props.navigation.getParam('genres');
  const THURSDAY = props.navigation.getParam('thursday');
  const SUNDAY = props.navigation.getParam('sunday');
  const CONVENTIONS = props.navigation.getParam('convention');
  const SPECIAL = props.navigation.getParam('special');
  const gid = props.navigation.getParam('gid');//getting the genre passed as param

  console.log("GENRES SongList==>>  " + JSON.stringify(GENRES));
  console.log("THURSDAY ==>>  " + JSON.stringify(THURSDAY));
  console.log("gid ==>>  " + gid);

  const displayedGenre = GENRES.find((genre) => genre.id === gid); //finding the genre by the id whose songs are going to be displayed

  let arr = [{}];
  if (gid === '1') {
    arr = THURSDAY;
  } else if (gid === '2') {
    arr = SUNDAY;
  }
  else if (gid === '3') {
    arr = CONVENTIONS;
  } else if (gid === '4') {
    arr = SPECIAL;
  }

  const displayedSongs = arr.filter((song) => song.genre.indexOf(gid) >= 0); //filter out the songs of the same genre,
  // not needed though coz arr also contains the songs of the required genre

  const renderSongItem = ({ item, index }) => {
    return (
      <SongItem
        artwork={item.artwork}
        title={item.title}
        artist={item.artist}
        serviceDate={item.service_date}
        onSelect={() =>
          props.navigation.navigate('SongsPlay', {
            sid: item.id,
            gid: item.genre, genres: GENRES, thursday: THURSDAY, sunday: SUNDAY, convention: CONVENTIONS, special: SPECIAL,
          })
        }
        onLike={() => { }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <Ionicons
        name="arrow-back"
        color={Colors.primary}
        size={height / 30}
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.genreContainer}>
          <View style={styles.genreImage}>
            <Image
              source={{ uri: displayedGenre.imageUrl }}
              style={{ height: height / 2.8, width: height / 2.8 }}
            />
          </View>
          <Text style={styles.genreTitle}>{displayedGenre.title}</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList data={displayedSongs} renderItem={renderSongItem} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: height / 75,
    backgroundColor: 'black',
  },
  genreContainer: {
    paddingHorizontal: height / 10.7,
    paddingTop: height / 20,
    paddingBottom: height / 18.7,
  },
  genreImage: {
    borderRadius: height / 5,
    overflow: 'hidden',
  },

  genreTitle: {
    paddingTop: height / 75,
    fontSize: height / 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  listContainer: {
    padding: height / 75,
  },
});

export default SongsListScreen;
