

import { AsyncStorage } from 'react-native';

export async function saveToken(token) {
  try {
    await AsyncStorage.setItem('@rntodo:token', token);
  } catch (error) {
    console.log('Error setting item for AsyncStorage');
    console.log(error);
  }
}

export async function getToken() {
 try {
    const value = await AsyncStorage.getItem('@rntodo:token');
    if (value !== null){
      return value;
    } else {
      return '';
    }
  } catch (error) {
    console.log(error);
    return '';
  } 
}