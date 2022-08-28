import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  AsyncStorage
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WEB_URL } from '../constant/urls';

import TrackPlayer, { Capability } from 'react-native-track-player';

import Controller from '../components/Controller';
import MySlider from '../components/MySlider';
import Colors from '../components/Colors';
import Genre from '../models/Genre';
import Song from '../models/Song';


const { width, height } = Dimensions.get('window');

function SongsPlayScreen(props) {
  const [favSongs, updateFavSongs] = useState([]);
  const [currentSongIsFav, updateCurrentSongIsFav] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const FAVS = await AsyncStorage.getItem('@favs');
  //     let resp = [];
  //     const t = JSON.parse(FAVS);
  //     t.forEach(item => {
  //       if (item.title)
  //         var gen = new Song(
  //           item.id,
  //           item.genre,
  //           item.title,
  //           item.artist,
  //           item.artwork,
  //           item.url,
  //           item.service_date,
  //         );
  //       resp.push(gen);
  //     });
  //     updateFavSongs(resp);
  //     resp.forEach(item => {
  //       const song_id = item.id;
  //       const genre_id = item.genre;
  //       console.log('Fav Item loop ===> '+JSON.stringify(item));
  //       if (genre_id === gId && song_id === sId) {
  //         console.log('Is FAV');
  //         updateCurrentSongIsFav(true);
  //       }
  //     }); 
  //   });
  // }, []);

  useEffect(() => {
    (async () => {
  });
  }, []);

  const THURSDAY = props.navigation.getParam('thursday');
  const SUNDAY = props.navigation.getParam('sunday');
  const CONVENTIONS = props.navigation.getParam('convention');
  const SPECIAL = props.navigation.getParam('special');
  const sId = props.navigation.getParam('sid');
  const gId = props.navigation.getParam('gid');
  let arr = [{}];
  if (gId === '1') {
    arr = THURSDAY;
  } else if (gId === '2') {
    arr = SUNDAY;
  } else if (gId === '3') {
    arr = CONVENTIONS;
  } else if (gId === '4') {
    arr = SPECIAL;
  }
  console.log("Genre Index  ==>>  " + gId);
  console.log("Song Index  ==>>  " + sId);
  // console.log("Current Array  ==>>  "+JSON.stringify(arr));
  const displayedSongs = arr.filter((song) => song.genre.indexOf(gId) >= 0);
  // console.log("Displayed Song  ==>>  "+JSON.stringify(displayedSongs));

  const scrollX = useRef(new Animated.Value(0)).current; //useRef to survive from re rendering,
  //mutable but will not be re-created evry time the component re-renders
  //and if changes will not force re render of the component
  //Animated.value will allow React to make changes in the JSX without re-rendering
  const [songIndex, setSongIndex] = useState(0);
  const slider = useRef(null); // to not re-initialize it
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width); //get the index of the song
      setSongIndex(index); //set the next song in queue
      console.log(index);
    });

    TrackPlayer.setupPlayer().then(async () => {
      console.log('Player ready');
      await TrackPlayer.add(displayedSongs);
      TrackPlayer.skip(sId); //to start from the selected song
      setIsPlayerReady(true);

      const FAVS = await AsyncStorage.getItem('@favs');
      let resp = [];
      const t = JSON.parse(FAVS);
      t.forEach(item => {
        if (item.title)
          var gen = new Song(
            item.id,
            item.genre,
            item.title,
            item.artist,
            item.artwork,
            item.url,
            item.service_date,
          );
        resp.push(gen);
      });
      updateFavSongs(resp);
      resp.forEach(item => {
        const song_id = item.id;
        const genre_id = item.genre;
        console.log('Fav Item loop ===> '+JSON.stringify(item));
        if (genre_id === gId && song_id === sId) {
          console.log('Is FAV');
          updateCurrentSongIsFav(true);
        }
      }); 

      TrackPlayer.play();
    });
    TrackPlayer.updateOptions({
      stopWithApp: true,
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });
    return () => {
      scrollX.removeAllListeners();
    }; //clean up function
  }, []); //because we want to attach the listener only once,
  //and set the trackPlayer only once not again and again

  useEffect(() => {
    if (isPlayerReady) {
      TrackPlayer.skip(displayedSongs[songIndex].id);
    }
  }, [songIndex]); //whenever scroll value changes hence songIndex changes then the songTrack
  // will also skip to that id

  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    }); //Flatlist will scroll to the next item in the queue, default parameter animated is always true
  };

  const goPrevious = () => {
    slider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    }); //Flatlist will scroll to the previous item in the queue
  };

  // const dispatch = useDispatch();

  // const toggleFavouriteHandler = useCallback(() => {
  //   //useCallback to prevent recreation of this function
  //   //after every rerender but not needed here
  //   //earlier I thought I'll add this fav icon in the header, for that I had to pass it to the header using params
  //   //with help of useEffect and the dependency would be the same funcion, so to prevent infinite number of loops
  //   console.log('liked');
  //   dispatch(toggleFavourite(displayedSongs[songIndex].id, uId, gId));
  // }, [dispatch, displayedSongs[songIndex].id, uId, gId]);

  const addFavorite = (songId, genreId) => {
    (async () => {
      const user_id = await AsyncStorage.getItem('@userid');
      let _data = {
        song_id: songId,
        user_id: user_id,
        genre_id: genreId
      }
      console.log("FAV DATA  ==== " + JSON.stringify(_data));
      let res = await fetch(
        WEB_URL + "/favorites/save_new_fav", {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      let response = await res.json();
      let r = response;
      console.log("Favs RESPONSE  ==== " + JSON.stringify(r));
      updateCurrentSongIsFav(true);
    })();
  }

  const renderSongItem = ({ item, index }) => {
    return (
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: item.artwork }}
          style={{ height: height / 2.3, width: height / 2.3 }}
        />
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <SafeAreaView>
        <View style={styles.icon}>
          <Ionicons
            name="arrow-back"
            size={height / 30}
            color={Colors.primary}
            onPress={() => props.navigation.goBack()}
          />
          <Ionicons
            name={currentSongIsFav ? 'heart' : 'heart-outline'}
            size={height / 30}
            color={Colors.primary}
            onPress={() => addFavorite(sId, gId)}
          />
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={displayedSongs}
          renderItem={renderSongItem}
          keyExtractor={(item) => item.id}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          initialScrollIndex={parseInt(sId)} //to start from a specific song in the specific genre
          ref={slider} //coz we want to make changes in the Flatlist with respect to the slider
          scrollEventThrottle={16} //to make the animation faster and smoother
          onScroll={Animated.event(
            //event triggered for scrolling in x direction
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false, //to improve performance of animations. if false, animations done on js thread
            },
          )}
        />
      </SafeAreaView>
      <View style={styles.songinfoCont}>
        <Text style={styles.title} numberOfLines={1}>
          {displayedSongs[songIndex].title}
        </Text>
        <Text style={styles.artist}>{displayedSongs[songIndex].artist}</Text>
      </View>
      <MySlider />
      <Controller sId={sId} goNext={goNext} goPrev={goPrevious} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: height / 37.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgContainer: {
    width: width,
    alignItems: 'center',
  },
  songinfoCont: {
    padding: height / 37.5,
    alignItems: 'center',
    marginBottom: height / 150,
  },
  title: {
    fontSize: height / 34,
    color: 'white',
    paddingBottom: height / 150,
  },
  artist: {
    fontSize: height / 41.6,
    color: 'gray',
  },
});

export default SongsPlayScreen;
