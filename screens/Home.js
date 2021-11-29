import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StatusBar, SafeAreaView, Dimensions, TouchableOpacity, Image, Alert, StyleSheet, Modal } from 'react-native'
import AppContext from '../AppContext/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';

const { width, height} = Dimensions.get('screen');
const Home = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const {
        setQuizes,
        setOptions,
        setCourses,
        setOptAnswers,
        optAnswers,
        setLoggedIn

    } = useContext(AppContext);

    useEffect(() => {
        getAllOptions();
        getAllAnswers();
        getAllQuizes();
        getAllCourses();
    }, []); 

    const getAllCourses = async () => {
        const userId = await AsyncStorage.getItem('userId');
        axios.get(`https://befaapi.herokuapp.com/api/courses?userId=${userId}`)
        .then(response => {
           setCourses(response.data.data);
        }) 
        .catch(() => {
            Alert.alert('Befa', 'Havutse ikibazo, suzuma murandasi yawe.')
        });
    }

    const getAllOptions = () => {
        axios.get('https://befaapi.herokuapp.com/api/options')
        .then((response) => {
            setOptions(response.data.data);
        }).catch((error) => {
            Alert.alert('Befa', 'Habonetse ikibazo, suzuma murandasi yawe');
        })
    }

    const getAllAnswers = () => {
        axios.get('https://befaapi.herokuapp.com/api/answers')
            .then((response) => {
                setOptAnswers(response.data.data);
                console.log(optAnswers);
            })
            .catch((error) => {
                Alert.alert('Befa','Habonetse ikibazo, suzuma murandasi yawe');
            })
    }

    const getAllQuizes = async () => {
        const userId = await AsyncStorage.getItem('userId');
        axios.get(`https://befaapi.herokuapp.com/api/quizes?userId=${userId}`)
            .then(response => {
                setQuizes(response.data.data);
            }).catch((err) => {
                console.log('Ishura')
            })
    };

    return (
        <SafeAreaView>
            <StatusBar barStyle='dark-content' backgroundColor='#fff' />
            <View style={{
                width: '100%',
                height: height,
                backgroundColor: '#fff'
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    paddingRight: 20, 

                }}>
                    <View></View>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Image source={require('./images/hamburger.png')} style={{
                            width: 30,
                            height: 30,
                        }} />
                    </TouchableOpacity>
                </View>

                <View style={{
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 20,
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#7c7c7c'
                    }}>Wiriwe Richard!</Text>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#93a2db',

                    }}>Urakaza neza</Text>
                </View>

                <View style={{
                    width: '90%',
                    borderRadius: 5,
                    height: height - 570,
                    backgroundColor: '#f2eef4',
                    alignSelf: 'center',
                    marginTop: 30,
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#202124',
                        marginLeft: 10,
                        marginTop: 10,
                        position: 'absolute',
                    }}>Amategeko y' umuhanda</Text>

                    <Text style={{
                        fontSize: 18,
                        color: '#7c7c7c',
                        position: 'absolute',
                        marginLeft: 10,
                        marginTop: 40,
                        width: '70%',
                        textAlign: 'justify'
                    }}>Amasomo ajyanye n'ibibazo bibazwa mu kizamini cy'amategeko y' umuhanda</Text>

                    <View>
                        <View style={{
                            
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View></View>
                                <Image source={require('./images/traffic-lights.png')} style={{
                                    width: 70,
                                    height: 70,
                                    marginTop: 20,
                                }} />
                            </View>
                        </View>
                    </View>

                </View>
                <View style={{
                    backgroundColor: '#d7f2f1',
                    width: '90%',
                    height: 100,
                    alignSelf: 'center',
                    borderRadius: 5,
                    marginTop: 30,
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#202124',
                        marginLeft: 10,
                        marginTop: 10,
                    }}>Isuzuma bumenyi</Text>

                    <Text style={{
                        fontSize: 18,
                        color: '#7c7c7c',
                        marginLeft: 10,
                    }}>Ibibazo ibibazo bijyanye n'ibibazo by' ikizamini cy'amategeko y' umuhanda</Text>
                </View>
                <View>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('TakeCourse')}
                    style={{
                        backgroundColor: '#93a2db',
                        width: '90%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 3,
                        alignSelf: 'center',
                        marginTop: 50,
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#fff'
                        }}>Tangira Kwiga</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{
                        alignSelf: 'flex-end',
                        marginRight: 20,
                        marginTop: 20
                    }}>
                        <Entypo name='cross' color='#fff' size={30} />
                    </TouchableOpacity>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => setLoggedIn(false)} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#af3a53',
                        borderRadius: 10,
                        width: '75%',
                        height: 50,
                        marginTop: -10
                    }}>
                        <Text style={{
                            color:'#fff',
                            fontSize: 16,
                        }}>Sohoka</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Home


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      marginTop: 0,
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: height - 180,
      padding: 35,
      width: '100%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  