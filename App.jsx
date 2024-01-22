import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Fires from './Components/Fires'
import Database from './Components/Database'
import FireStore from './Components/FireStore'

const App = () => {
  return (
    <View>
      {/* <Fires/>
      <Database/> */}
      <FireStore/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})