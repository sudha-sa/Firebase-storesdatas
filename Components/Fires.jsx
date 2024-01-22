import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore, { firebase } from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

const Fires = () => {
  const [firestoreData, setFirestoreData] = useState(null);
  const [databaseData, setDatabaseData] = useState(null);

    useEffect(() => {
  
        GetFirestoreData();
        GetDatabaseData();
       
      }, [])
      
       const GetFirestoreData = async()=>{
        try {
          const data = await firestore().collection('testing').doc('2pE3YucBRf3kvKOwuSpc').get();
        setFirestoreData(data._data)
        console.log(data)
        } catch (error) {
          console.log(error)
        }
      }

        const GetDatabaseData = async()=>{
        try {
          const data = await database().ref('user/1').once('value');
         setDatabaseData(data.val())
          console.log(data)

        } catch (error) {
          console.log(error)
        }
       }
      

       return (
        <View>
          <Text>Firestore Name: {firestoreData ? firestoreData.Name : '...'}</Text>
          <Text>Firestore Age: {firestoreData ? firestoreData.Age : '...'}</Text>
          <Text>Database Name: {databaseData ? databaseData.name : '...'}</Text>
          <Text>Database Age: {databaseData ? databaseData.age : '...'}</Text>
        </View>
      );
}
export default Fires;


const styles = StyleSheet.create({});
