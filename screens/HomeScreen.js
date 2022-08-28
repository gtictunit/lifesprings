import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, AsyncStorage} from 'react-native';
// import { AsyncStorage } from 'react-native-community';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Genre from '../models/Genre';
import Song from '../models/Song';
import { WEB_URL } from '../constant/urls';
import GenreGrid from '../components/GenreGrid';
import PostGrid from '../components/PostGrid';
import Recomm from '../components/Recomm';

import TrackPlayer from 'react-native-track-player';
import Post from '../models/Post';

const {width, height} = Dimensions.get('window');

const logo = require('./login/p.png');

function HomeScreen (props) {
  const [username, updateUsername] = useState('')
  const [genres, updateGenres] = useState([]);
  const [thursday, updateThursday] = useState([]);
  const [sunday, updateSunday] = useState([]);
  const [special, updateSpecial] = useState([]);
  const [convention, updateConvention] = useState([]);
  const [recent, updateRecent] = useState([]);
  const [lastpost, updateLastPost] = useState([]);
  const [user, updateUser] = useState([]);
  const [uId, updateUId] = useState('');

  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem('@username');
      const usr = await AsyncStorage.getItem('@user');
      const user_id = await AsyncStorage.getItem('@userid');
      const code = await AsyncStorage.getItem('@isLoggedin');
      let r = JSON.parse(usr);

      let res = await fetch(
        WEB_URL+"/favorites/get_user_favs_by_id?user_id="+user_id //example and simple data
       );
       let response = await res.json();
       let rr = response.data;
       let resp = [];
       rr.forEach(item => {    
         var gen = new Song(
           item.message_id,
           item.service,
           item.title,
           item.preacher,
           item.img_url,
           item.media_file_url,
           item.service_date,
         );
           resp.push(gen);
       });
      //  console.log("FAVS Home Screen ===> "+JSON.stringify(resp))
       AsyncStorage.setItem('@favs',JSON.stringify(resp)); 
      updateUsername(name);
      updateUser(r)
      updateUId(user_id)
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      let res = await fetch(
        WEB_URL+"/service/get_services" //example and simple data
      );
      let response = await res.json();
      let r = response.data;
      let resp = [];
      r.forEach(item => {    
        var gen = new Genre(item.id,item.name,item.img);
          resp.push(gen);
      });
      updateGenres(resp);
      AsyncStorage.setItem('@genres',JSON.stringify(resp)); 
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await fetch(
       WEB_URL+"/message/get_messages_by_service?id=1" //example and simple data
      );
      let response = await res.json();
      let r = response.data;
      let resp = [];
      r.forEach(item => {    
        var gen = new Song(
          item.message_id,
          item.service,
          item.title,
          item.preacher,
          item.img_url,
          item.media_file_url,
          item.service_date,
        );
          resp.push(gen);
      });
      updateThursday(resp);
      AsyncStorage.setItem('@thursday',JSON.stringify(resp)); 
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await fetch(
       WEB_URL+"/message/get_messages_by_service?id=2" //example and simple data
      );
      let response = await res.json();
      let r = response.data;
      let resp = [];
      r.forEach(item => {    
        var gen = new Song(
          item.message_id,
          item.service,
          item.title,
          item.preacher,
          item.img_url,
          item.media_file_url,
          item.service_date,
        );
          resp.push(gen);
      });
      AsyncStorage.setItem('@sunday',JSON.stringify(resp)); 
      updateSunday(resp);
    })();
  }, []);
  
    useEffect(() => {
    (async () => {
      let res = await fetch(
       WEB_URL+"/message/get_messages_by_service?id=3" //example and simple data
      );
      let response = await res.json();
      let r = response.data;
      let resp = [];
      r.forEach(item => {    
        var gen = new Song(
          item.message_id,
          item.service,
          item.title,
          item.preacher,
          item.img_url,
          item.media_file_url,
          item.service_date,
        );
          resp.push(gen);
      });
      AsyncStorage.setItem('@convention',JSON.stringify(resp)); 
      updateConvention(resp);
    })();
  }, []);
  
    useEffect(() => {
    (async () => {
      let res = await fetch(
       WEB_URL+"/message/get_messages_by_service?id=4" //example and simple data
      );
      let response = await res.json();
      let r = response.data;
      let resp = [];
      r.forEach(item => {    
        var gen = new Song(
          item.message_id,
          item.service,
          item.title,
          item.preacher,
          item.img_url,
          item.media_file_url,
          item.service_date,
        );
          resp.push(gen)
      });
      AsyncStorage.setItem('@special',JSON.stringify(resp)); 
      updateSpecial(resp);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await fetch(
       WEB_URL+"/message/get_messages_recent" //example and simple data
      );
      let response = await res.json();
      let r = response.data;
      let resp = [];
      r.forEach(item => {    
        var gen = new Song(
          item.message_id,
          item.service,
          item.title,
          item.preacher,
          item.img_url,
          item.media_file_url,
          item.service_date,
        );
          resp.push(gen)
      });
      updateRecent(resp);
    })();
  }, []);


  useEffect(() => {
    (async () => {
      let res = await fetch(
       WEB_URL+"/posts/get_last_post" //example and simple data
      );
      console.log('Posts:: ---->>>  ')
      let response = await res.json();
      let r = response.data;  
        var gen = new Post(
          r.post_id,
          r.title,
          r.posttext,
          r.upload_date,
        );
        let resp = [];
        resp.push(gen)
      console.log('Posts:: ---->>>  '+JSON.stringify(resp))
      updateLastPost(resp);
      AsyncStorage.setItem('@posts',JSON.stringify(resp)); 
    })();
  }, []);


  const renderGenreItem = ({item, index}) => {
    //  console.log("ITEM ===>  "+JSON.stringify(item));
    return (
      <GenreGrid
        imageUrl={item.imageUrl}
        title={""}
        onSelect={() => 
          props.navigation.navigate('SongsList', {
            gid: item.id, 
            genres: genres, 
            thursday:thursday, 
            sunday:sunday, 
            convention:convention, 
            special:special
          })
        }
      />
    );
  };

  const renderSongItem = ({item, index}) => {
    return (
      <Recomm
        artwork={item.artwork}
        title={item.title}
        artist={item.artist}
        serviceDate={item.service_date}
        onSelect={() =>
          props.navigation.navigate('SongsPlay', {
            sid: item.id,
            gid: item.genre,
            genres: genres, 
            thursday:thursday, 
            sunday:sunday, 
            convention:convention, 
            special:special
          })
        }
      />
    );
  };

  const renderPostItem = ({item, index}) => {
    return (
      <PostGrid
        imageUrl={logo}
        title={item.title}
        onSelect={() => 
          props.navigation.navigate('PastorDesk', {
            title: item.title, 
            content: item.content, 
            date:item.upload_date
          })
        }
      />
    );
  };

  return (
    <View style={{backgroundColor: 'black', padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.header}>Shalom!,  {username} </Text>
          
          <TouchableOpacity
            onPress={() => {
              TrackPlayer.stop()
              AsyncStorage.setItem('@isLoggedIn', '99')
              props.navigation.navigate('Login');//added just for test purpose
            }}>
            <Text style={styles.login}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeader}>Services</Text>

        <View style={styles.listOfGenres}>
          <FlatList
            keyExtractor={(item, index) => item.id}
            key={genres} //new thing, Changing numColumns on the fly is not supported. Change the key prop on FlatList when changing the number of columns to force a fresh render of the component.
            data={genres}
            renderItem={renderGenreItem}
            numColumns={2}
          />
        </View>
        <View style={styles.recomm}>
          <Text style={styles.recommText}>Recent Uploads</Text>
          <FlatList
            horizontal
            data={recent}
            renderItem={renderSongItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* <Text style={styles.pText}>Feature</Text> */}
        <View style={styles.desk}>        
          <FlatList
            keyExtractor={(item, index) => item.id}
            key={lastpost} 
            data={lastpost}
            renderItem={renderPostItem}
            showsHorizontalScrollIndicator={false}
            numColumns={1}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    padding: height / 37,
  },
  header: {
    color: 'white',
    fontSize: height / 35,
    paddingBottom: height / 37,
    paddingTop: height / 50,
    paddingLeft: width / 25,
    fontWeight: 'bold',
  },
  login: {
    color: 'white',
    fontSize: height / 45,
    paddingBottom: height / 37,
    paddingTop: height / 40,
    paddingLeft: width / 80,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: height / 30,
    color: 'white',
    paddingBottom: height / 75,
    paddingLeft: width / 25,
    fontWeight: 'bold',
  },
  listOfGenres: {
    flex: 1,
    marginBottom: height / 37,
  },

  recomm: {
    padding: height / 75,
    height: height / 2.7,
  },
  recommText: {
    color: 'gray',
    fontSize: height / 41,
    marginBottom: height / 50,
    fontWeight: 'bold',
  },
  desk: {
    flex: 2,
    marginBottom: height / 37,
  },
  pText: {
    color: 'white',
    fontSize: height / 30,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
