import React, { useContext, useEffect } from 'react'
import { Dimensions, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import AppContext from '../AppContext/AppContext';
import { AntDesign, Feather } from '@expo/vector-icons';

const {width, height} = Dimensions.get('screen');

const Answers = ({ navigation }) => {
    const {answers, setAnswers} = useContext(AppContext);

    useEffect(() => {
        console.log(answers);
    }, [])
    return (
        <SafeAreaView>
            <StatusBar barStyle='dark-content' backgroundColor='#fff' />
            <View style={{
                width: '100%',
                height: height,
                backgroundColor: '#fff'
            }}> 
            <View style={{
                flexDirection: 'row'
            }}>
                <TouchableOpacity onPress = {val => navigation.goBack()} style={{
                    justifyContent: 'center',
                    borderRadius: 10,
                    borderColor: '#93a2db',
                    borderWidth: 1,
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    marginLeft: 20,
                    marginTop: 10,
                }}>
                    <Feather name='chevron-left' color='#93a2db' size={24} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#93a2db',
                    marginTop: 15,
                    marginLeft: 20
                }}>Uko wakoze</Text>
            </View>
            <View style={{
                marginTop: 5,
                height: height - 100
            }}>
                <ScrollView style={{
                    height: height - 200
                }}>
                    {
                        answers.map((item, idx) => {
                            return (
                                <View key={idx} style={{
                                    alignSelf: 'center',
                                    width: '90%',
                                }}> 
                                    <Text style={{
                                        fontSize: 20,
                                        marginTop: 30,
                                        marginBottom: 10,
                                    }}>Ikibazo: {item.questionName}</Text>
                                    {item.correct ? 
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 0
                                    }}>
                                        <AntDesign name="checkcircle" size={24} color="#38a721" />
                                        <Text style={{
                                            fontSize: 16,
                                            marginLeft: 10,
                                            marginTop: 2
                                        }}>Ikibazo wagikoze</Text>
                                    </View> : 
                                    <View style={{
                                        flexDirection: 'row'

                                    }}>
                                        <AntDesign name="closecircle" size={24} color="#ed1b24" />
                                        <Text style={{
                                            fontSize: 16,
                                            marginLeft: 10,
                                            marginTop: 2
                                        }}>Ikibazo wakishe</Text>
                                    </View>}
                                    <Text>{item.correct ? 
                                    <View>
                                        <Text style={{
                                            color: '#38a721',
                                            fontSize: 16,
                                        }}>Ikiricyo: {item.correctAnswer}</Text>
                                    </View> : 
                                    <View style={{
                                        marginTop: 10,
                                    }}>
                                        <Text style={{
                                            color: '#ed1b24',
                                            fontSize: 16,
                                        }}>Ikitaricyo: {item.incorrectAnswer}</Text>
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#38a721'
                                        }}>Ikiricyo: {item.correctAnswer}</Text>

                                    </View>}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <TouchableOpacity 
                    onPress={() => {
                        setAnswers([]);
                        navigation.navigate('Home');
                    }}
                    style={{
                        backgroundColor: '#93a2db',
                        width: '90%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 3,
                        alignSelf: 'center',
                        // marginTop: height - 400
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#fff'
                        }}>Subira ahabanza</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Answers