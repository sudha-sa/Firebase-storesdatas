
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

const Database = () => {
    const [inputText, SetInputText] = useState(null)
    const [addData, SetAddData] = useState([])
    const [updateData, SetUpdateData] = useState(false)
    const [selectedCard, SetSelectedCard] = useState(null)

    useEffect(() => {
        GetDatabaseData()
    }, [])

    const GetDatabaseData = async () => {
        try {

            await firestore().collection('todo').onSnapshot((snap) => {
                const tempArray = []
                snap.forEach((item) => {
                    tempArray.push({
                        ...item.data(),
                        id: item.id
                })
                })
                SetAddData(tempArray)

            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const HandleAddData = async () => {
        try {
            if (inputText.length > 0) {
                await firestore().collection('todo').add({
                    text: inputText
                })
            }
        } catch (error) {
            console.log(error)
        }
        SetInputText('')
    }

    const HandleUpdatData = async () => {
        try {
            if (inputText.length > 0) {
                await firestore().collection('todo').doc(selectedCard).update({
                    text: inputText
                })
            
                    SetInputText('')
                    SetUpdateData(false)
                  }else{
                   alert('Please Enter Work then try again');
            }
        } catch (error) {
            console.log(error)
        }
    }
    const HandleCart = (CartIndex, Cardvalue) => {
        try {
              SetSelectedCard(CartIndex)
              SetUpdateData(true)
              SetInputText(Cardvalue)
              // console.log(CartIndex)
        }
        catch (error) {
            console.log(error)

        }
    }
    const HandleLOngPressCart = (CartIndex, Cardvalue) => {
        try {
                  Alert.alert("Alert",`Are you sure to delete ${Cardvalue} ?`, [
                    {
                      text: 'cancel',
                      onPress: ()=>{
                        console.log("Cancel is pressed")
                      }
                    },
                    {
                      text: 'ok',
                      onPress: async()=>{
                        try {
           await firestore().collection('todo').doc(Cardid).delete()
                        
                        } catch (error) {
                          console.log(error)
                        }
                      }
                    }

                  ])
            // SetSelectedCard(CartIndex)
            // SetUpdateData(true)
            // SetInputText(Cardvalue)
            // console.log(CartIndex)
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <View >
            <StatusBar hidden={true} />
            <View style={styles.container}>
                <Text style={styles.text}>TODO APP</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter your Work'
                    value={inputText}
                    onChangeText={(text) => SetInputText(text)} />

                {
                    updateData ?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => HandleUpdatData()}>
                            <Text>Update</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => HandleAddData()}>
                            <Text>Add</Text>
                        </TouchableOpacity>
                }

            </View>

            <View>
                <Text style={styles.text}>TODO LIST :</Text>

                <FlatList
                    data={addData}
                    renderItem={item => {
                        // console.log(item)
                        const CardIndex = item.index;
                        if (item.item !== null) {
                            return (
                                <TouchableOpacity
                                    style={styles.card}
                                    onPress={() => HandleCart(item.item.id, item.item.text)}
                                    onLongPress={() => HandleLOngPressCart(item.item.id, item.item.text)}
                                >
                                    <Text>{item.item.text}</Text>
                                </TouchableOpacity>
                            )
                        }

                    }}
                />

            </View>
        </View>
    )
}

export default Database;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    input: {
        borderRadius: 10,
        padding: 5,
        backgroundColor: 'gray',
        width: '50%',
        margin: 20,

    },
    button: {
        backgroundColor: "blue",
        alignItems: 'center',
        padding: 8,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20
    },
    card: {
        backgroundColor: 'gray',
        padding: 10,
        marginLeft: 30,
        width: '80%',
        borderRadius: 10,
        margin: 5,

    }
})

