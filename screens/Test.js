import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import AppContext from '../AppContext/AppContext';

const { width, height } = Dimensions.get('screen'); 
const Test = ({ navigation }) => {
    const [choosenId, setChoosenId] = useState();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [option, setOption] = useState();
    const [optionSelected, setOptionSelected] = useState(false);
    const {answers, options, questions, setQuestions, quizId} = useContext(AppContext);

    useEffect(() => {
        getAllQuestions();
    }, []);

    const getAllQuestions = () => {
        axios.get(`https://befaapii.herokuapp.com/api/questions?quizId=${quizId}`)
            .then((response) => {
                setQuestions(response.data.data);
                console.log(response.data.data)
            })
            .catch(() => {
                Alert.alert('Befa', 'Habonetse ikibazo, suzuma murandasi yawe');
            })
    }
    const opt = options?.filter(option => option.question === questions[questionIndex]?.id);

    return (
        <SafeAreaView>
            <StatusBar barStyle='dark-content' backgroundColor='#fff' />
            <View style={{
                width: '100%',
                height: height ,
                backgroundColor: '#fff'
            }}>
            <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 10,
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{
                        width: 35,
                        height: 35,
                        borderRadius: 5,
                        borderColor: '#7c7c7c',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Feather name='chevron-left' color='#7c7c7c' size={24} />
                    </TouchableOpacity>
                    <Text style={{
                        color: '#7c7c7c',
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginTop: 2,
                        marginLeft: 70                        
                    }}>Ikizamini</Text>
                </View>
                <View style={{
                    width: '90%',
                    alignSelf: 'center'
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#c1a644',
                        marginTop: 30,
                    }}>Ikibazo {questions.length}</Text>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginTop: 20, 
                        textAlign: 'justify',
                        color: '#7c7c7c'
                    }}>{questions[questionIndex]?.question}</Text>
                </View>
                <View style={{
                    width: '90%',
                    alignSelf: 'center',
                }}>
                   {
                       opt.map((item, idx) => {
                           return (
                            <TouchableOpacity 
                            onPress={() => {
                                setChoosenId(item.id);
                                setOption(item);
                                setOptionSelected(true);
                            }}
                            key={idx} 
                            style={{
                                backgroundColor: '#93a2db',
                                width: '100%',
                                height: 90,
                                marginTop: 20,
                                justifyContent: 'center',
                                borderRadius: 17,
                                elevation: 20,
                            }}>
                                <View style={{
                                flexDirection: 'row'
                                }}>
                                <View style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 50,
                                    borderWidth: 3,
                                    borderColor: '#fff',
                                    marginLeft: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        width: 15,
                                        height: 15,
                                        borderRadius: 50,
                                        backgroundColor: choosenId === item.id ? '#fff' : '#93a2db'
                                    }}></View>
                                </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: '#fff',
                                    marginLeft: 10,
                                }}>{item.description}</Text>
                                </View>
                            </TouchableOpacity>
                           )
                       })
                   }
                    
                    {
                        questions?.length === answers?.length && answers.length !== 0 ? <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('Answers')
                        }}
                        style={{
                            backgroundColor: '#fff',
                            width: '100%',
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 3,
                            alignSelf: 'center',
                            marginTop: 50,
                            borderColor: '#93a2db',
                            borderWidth: 2,
                            marginBottom: 40,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#93a2db'
                            }}>Reba uko wakoze isuzuma bumenyi</Text>
                        </TouchableOpacity> : <TouchableOpacity 
                    onPress={() => {
                        const nextQuestionIndex = questionIndex + 1;
                        setQuestionIndex(nextQuestionIndex);
                        answers?.push({
                            correct: questions[questionIndex].answer === option.id ? true : false,
                            questionName: questions[questionIndex].question,
                            incorrectAnswer: questions[questionIndex].answer === option.id ? 'None' : option?.description,
                            correctAnswer: opt.find(opts => opts.id === questions[questionIndex].answer).description, 
                        });
                        setOptionSelected(false);
                    }}
                    disabled={!optionSelected ? true : false}
                    style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        elevation: 5,
                        alignSelf: 'center',
                        marginTop: 50,
                        borderColor: '#93a2db',
                        borderWidth: 2,
                        marginBottom: 50,

                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#93a2db'
                        }}>Ikibazo Gikurikira</Text>
                    </TouchableOpacity> 
                    }
                </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Test
