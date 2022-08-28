import React, {useEffect, useState} from 'react';
import {View, Dimensions, AsyncStorage} from 'react-native';
import {SearchBar} from 'react-native-elements';

import SongItem from '../components/SongItem';
import Colors from '../components/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import Song from '../models/Song';
import Genre from '../models/Genre';

const {width, height} = Dimensions.get('window');


function SearchScreen(props) {
  const [genres, updateGenres] = useState([]);
  const [thursday, updateThursday] = useState([]);
  const [sunday, updateSunday] = useState([]);
  const [special, updateSpecial] = useState([]);
  const [convention, updateConvention] = useState([]);

  useEffect(() => {
    (async () => {
      const GENRES = await AsyncStorage.getItem('@genres');
      const THURSDAY = await AsyncStorage.getItem('@thursday');
      const SUNDAY = await AsyncStorage.getItem('@sunday');
      const CONVENTIONS = await AsyncStorage.getItem('@convention');
      const SPECIAL = await AsyncStorage.getItem('@special');

      // console.log("Thursday data ==> "+THURSDAY);      

      let resp = [];

      const g = JSON.parse(GENRES);
      g.forEach(item => {    
        var gen = new Genre(item.id,item.title,item.url);
          resp.push(gen);
      });
      updateGenres(resp);

      const t = JSON.parse(THURSDAY);
      resp = [];
      t.forEach(item => {   
        if(item.title) 
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
      updateThursday(resp);

      const s = JSON.parse(SUNDAY);
      resp = [];
      s.forEach(item => {    
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
      updateSunday(resp);


      const c = JSON.parse(CONVENTIONS);
      resp = [];
      c.forEach(item => {    
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
      updateConvention(resp);

      const sp = JSON.parse(SPECIAL);
      resp = [];
      sp.forEach(item => {    
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
      updateSpecial(resp);      
    })();
  }, []);

  // console.log("Thursday data ==> "+JSON.stringify(thursday));
  // console.log("Sunday data ==> "+JSON.stringify(sunday));
  // console.log("Convention data ==> "+JSON.stringify(convention));
  // console.log("Special data ==> "+JSON.stringify(special));
  
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const arrayHolder = [
    ...thursday,
    ...sunday,
    ...convention,
    ...special,];
  // console.log('Array Holder Before ===>  '+JSON.stringify(arrayHolder));
  const searchFilterFunction = (text) => {
    // console.log('Array Holder After ===>  '+JSON.stringify(arrayHolder));
    const newData = arrayHolder.filter((item) => {
      // console.log('Current Item ===>  '+JSON.stringify(item));
      const title = ""+item.title
      const serviceDate = ""+item.service_date
      if(title.includes(text) || serviceDate.includes(text)){
        return item;
      }      
    });
    // console.log('Current Data ===>  '+JSON.stringify(newData));
    setSearch(text);
    setData(newData);
  };

  return (
    <View style={{flex: 1, padding: height / 37, backgroundColor: 'black'}}>
      <SearchBar
        round={true}
        containerStyle={{backgroundColor: 'black'}}
        inputContainerStyle={{backgroundColor: '#282828', padding: 5}}
        inputStyle={{color: 'white'}}
        placeholderTextColor="gray"
        placeholder="Type Here..."
        value={search}
        underlineColorAndroid={Colors.primary}
        onChangeText={(text) => {
          searchFilterFunction(text);
        }}
        onClear={() => searchFilterFunction('')}
        searchIcon={{color: Colors.primary}}
      />

      <ScrollView style={{marginTop: height/37}}>
        <View>
          {data.map((item) => (
            <SongItem
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
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default SearchScreen;
