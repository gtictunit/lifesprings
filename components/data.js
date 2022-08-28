import Song from '../models/Song';
import Genre from '../models/Genre';
import Axios from 'axios'
import { WB_URL } from '../constant/urls';
import React, { useState, useEffect }  from 'react';
import { AsyncStorage } from 'react-native';


function getThursday(){
  const THURSDAY = AsyncStorage.getItem('@thursday');
  const t = JSON.parse(THURSDAY);
  let resp = [];
  t.forEach(item => {   
    if(item.title) 
    var gen = new Song(
      item.id,
      item.genre,
      item.title,
      item.artist,
      item.artwork,
      item.url,
    );
      resp.push(gen);
  });
  console.log('In Thursday Func  '+ JSON.stringify(resp));
  return resp;
}


 function getSunday(){
const SUNDAY =  AsyncStorage.getItem('@sunday');
const s = JSON.parse(SUNDAY);
let resp2 = [];
s.forEach(item => {    
  var gen = new Song(
    item.id,
    item.genre,
    item.title,
    item.artist,
    item.artwork,
    item.url,
  );
    resp2.push(gen);
});
return resp2;
}


 function getConvention(){
const CONVENTIONS =  AsyncStorage.getItem('@convention');
console.log('In Convention Func');
const c = JSON.parse(CONVENTIONS);
let resp3 = [];
c.forEach(item => {    
  var gen = new Song(
    item.id,
    item.genre,
    item.title,
    item.artist,
    item.artwork,
    item.url,
  );
    resp3.push(gen);
});
return resp3;
}

 function getSpecial(){
const SPECIAL =  AsyncStorage.getItem('@special');
const sp = JSON.parse(SPECIAL);
let resp4 = [];
sp.forEach(item => {    
  var gen = new Song(
    item.id,
    item.genre,
    item.title,
    item.artist,
    item.artwork,
    item.url,
  );
    resp4.push(gen);
});
return resp4;
}


export const thursday = getThursday();
export const sunday = getSunday();
export const special = getSpecial();
export const convention = getConvention();
