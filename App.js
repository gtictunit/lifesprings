import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import songsReducer from './store/reducers/songsReducers';
import LoginNavigator from './navigation/LoginNavigator';

const rootReducer = combineReducers({
  songs: songsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  useEffect(() => {
    SplashScreen.hide()
  },[])
  return (
    <Provider store={store}>
      <LoginNavigator />
    </Provider>
  );
}
