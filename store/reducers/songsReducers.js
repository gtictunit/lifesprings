
import { AsyncStorage } from 'react-native';
import {TOGGLE_FAVOURITE} from '../actions/songsActions';
import Song from '../../models/Song';

// import { thursday, sunday, convention, special } from '../../components/data';

const GENRES = AsyncStorage.getItem('@genres');

// const arrayHolder = [thursday,sunday,convention,special,];

const initialState = {
  songs: [],
  favSongs: [],
};

const songsReducer = (state = initialState, action) => {
  console.log("Songs: "+JSON.stringify(initialState))
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingFav = state.favSongs.findIndex(
        (song) => song.id === action.songId,
      );
      if (existingFav >= 0) {
        const updatedFavSongs = [...state.favSongs];//since we don't want to make any changes in the original array favSongs
        updatedFavSongs.splice(existingFav, 1);//only remove the song which was already in the favSongs
        return {...state, favSongs: updatedFavSongs};
      } else {
        if (action.genreId === '1') {
          const song = state.songs[0].find((s) => s.id === action.songId);
          return {...state, favSongs: state.favSongs.concat(song)};
        } else if (action.genreId === '2') {
          const song = state.songs[1].find((s) => s.id === action.songId);
          return {...state, favSongs: state.favSongs.concat(song)};
        } else if (action.genreId === '3') {
          const song = state.songs[2].find((s) => s.id === action.songId);
          return {...state, favSongs: state.favSongs.concat(song)};
        } else if (action.genreId === '4') {
          const song = state.songs[3].find((s) => s.id === action.songId);
          return {...state, favSongs: state.favSongs.concat(song)};
        }
      }

    default:
      return state;
  }
};

export default songsReducer;
