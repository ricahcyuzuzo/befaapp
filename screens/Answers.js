import React, { useContext, useEffect } from 'react'
import { Alert, Dimensions, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import AppContext from '../AppContext/AppContext';
import { AntDesign, Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen');

const Answers = ({ navigation }) => {
    const {answers, setAnswers, quizz} = useContext(AppContext);

    useEffect(() => {
        recordMarks();
    }, [])

    const wrongAnswer = answers.filter(answer => answer.correct === false ).length;
    const rightAnswer = answers.length - wrongAnswer; 
    const score = quizz.correctAnswerMarks * rightAnswer;

    const recordMarks = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const post = {
            student: userId,
            quizId: quizz.id,
            score: score,
            level: answers.length,
            correctAnswer: rightAnswer,
            wrongAnswer: wrongAnswer,
        }
        axios.post('https://befaapii.herokuapp.com/api/marks', post)
            .then(() => {
                Alert.alert('Befa', `Wagize amanota ${score}/${answers.length * quizz.correctAnswerMarks}.`)
            }).catch(() => {
                Alert.alert('Befa', 'Habonetse ikibazo, Suzuma murandasi yawe.');
            })
    } 
    
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
                        borderRadius: 10,
                        alignSelf: 'center',
                        marginTop: 20,
                        elevation: 20
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
