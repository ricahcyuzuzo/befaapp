import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, StatusBar, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../AppContext/AppContext';

const { width, height} = Dimensions.get('screen');

const TakeExam = ({ navigation }) => {
    const {setQuizId, quizes} = useContext(AppContext);
    
    useEffect(() => {
    }, []);


    const renderItem = ({ item }) => (
        <TouchableOpacity 
        
        onPress={() => {
            setQuizId(item.id);
            navigation.navigate('Test')
        }} style={{
            backgroundColor: '#fff',
            borderLeftWidth: 10,
            borderColor: '#93a2db',
            width: '90%',
            alignSelf: 'center',
            height: 90,
            marginTop: 20,
            justifyContent: 'center',
            elevation: 20
        }}>
            <View style={{
            flexDirection: 'row'
            }}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#93a2db',
                marginLeft: 20,
            }}>{item.title}</Text>
            </View>
            <Text style={{
                color: '#7c7c7c',
                marginLeft: 20,
                fontSize: 14,
            }}>Ibibazo {item.totalQuestions}</Text>
        </TouchableOpacity>)


    return (
        <SafeAreaView>
            <StatusBar barStyle='light-content' backgroundColor='#93a2db' />
            <View style={{
                width: '100%',
                height: height,
                backgroundColor: '#fff',
            }}>
                <View style={{
                    width: '100%',
                    height: height - 550,
                    backgroundColor: '#93a2db'
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{
                        width: 35,
                        height: 35,
                        borderRadius: 5,
                        borderColor: '#fff',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 20,
                        marginTop: 5,
                    }}>
                        <Feather name='chevron-left' color='#fff' size={24} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 30,
                        color: '#fff',
                        fontWeight: 'bold',
                        marginLeft: 20,
                        marginTop: 10,
                    }}>Kora Ikizami</Text>
                    <Text style={{
                            fontSize: 15,
                            marginTop: 10,
                            color: '#f2f2f2',
                            textAlign: 'justify',
                            lineHeight: 20,
                            width: '90%',
                            marginLeft: 20
                        }}>Itabire iki kizamini cyo gusuzuma ubumenyi bwawe ku mategeko y'umuhanda bigufasha kwitegura ikizamini cy' uruhushya rw' agateganyo rwo gutwara ibinyabiziga (Provisoire).</Text>

                </View>
                <View style={{
                    marginTop: 0,
                }}>
                    <FlatList
                        data={quizes}
                        horizontal={false}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TakeExam
