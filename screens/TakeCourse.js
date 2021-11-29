import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, ScrollView, Alert, Image, TextInput } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../AppContext/AppContext';

const { width, height} = Dimensions.get('screen');

const TakeCourse = ({ navigation }) => {
    const video = useRef(null);
    const [status, setStatus] = useState();
    const [videoIndex, setVideoIndex] = useState(0);
    const [phone, setPhone] = useState();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false);

    const { courses, setQuizes, setCourses } = useContext(AppContext);

    useEffect(() => {
    }, []);



    const handlePay = async () => {
        setLoading(true)
        const userId = await AsyncStorage.getItem('userId');
        axios.post(`https://befaapi.herokuapp.com/api/pay?userId=${userId}`, { phone: phone })
        .then((response) => {
            const msg = response.data.description  
            setMessage({
                status: response.data.code,
                message: msg
            });
            setLoading(false);

        }).catch(err => {
            const msg = 'Nta mafaranga ahagije mufite kuri konti yanyu.'  
            setMessage({
                status: 401,
                message: msg
            });
            setLoading(false);
        })
    }

    const checkPayment = async () => {
        setLoading1(true)
        const userId = await AsyncStorage.getItem('userId');
        axios.get(`https://befaapi.herokuapp.com/api/check?userId=${userId}`)
        .then((response) => {
            const msg = response.data.message
              
            setMessage({
                status: response.data.status,
                message: msg
            });

            axios.get(`https://befaapi.herokuapp.com/api/quizes?userId=${userId}`)
                .then(response => {
                    setQuizes(response.data.data);
                }).catch((err) => {
                    console.log('Ishura')
                })

            axios.get(`https://befaapi.herokuapp.com/api/courses?userId=${userId}`)
                .then(response => {
                   setCourses(response.data.data);
                }) 
                .catch(() => {
                    Alert.alert('Befa', 'Havutse ikibazo, suzuma murandasi yawe.')
                });

            setLoading1(false);

        }).catch(err => {
            const msg = 'Ntabwo kwishyura birangiye, rangiza kwishyura'  
            setMessage({
                status: 404,
                message: msg
            });
            setLoading1(false);
        })
    }
    
   
    return (
        <SafeAreaView>
            <View style={{
                width: '100%',
                height: height,
                backgroundColor: '#fff'
            }}>
                <ScrollView>
                <StatusBar barStyle='dark-content' backgroundColor='#fff' />
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                        width: 35,
                        height: 35,
                        borderRadius: 5,
                        borderColor: '#93a2db',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                        marginLeft: 20,
                    }}>
                        <Feather name='chevron-left' color='#93a2db' size={24} />
                    </TouchableOpacity>
                <View style={{
                    width: '100%',
                    marginTop: 80,

                }}>
                    {
                        status === 'finish' && videoIndex === 2 && courses.length < 4? 
                        <View>
                            <Text style={{
                                textAlign: 'justify',
                                alignSelf: 'center',
                                width: '90%',
                                fontSize: 25,
                                fontWeight: 'bold',
                                color: '#93a2db'
                            }}>Ipaki y' ubuntu yarangiye</Text>
                            <Text style={{
                                color: '#7c7c7c',
                                alignSelf: 'center',
                                width: '90%'
                            }}>Ishyura kugirango ukomeze kwiga.</Text>

                            <View style={{
                                flexDirection: 'row',
                                width: '90%',
                                justifyContent: 'space-between',
                                alignSelf: 'center',
                                marginTop: 30,
                            }}>
                                <Image source={require('./images/momo.jpg')} style={{
                                    width: '45%',
                                    height: 90,
                                    borderRadius: 10,
                                }} />
                                <Image source={require('./images/airtel.png')} resizeMode='cover' style={{
                                    width: '45%',
                                    height: 90,
                                    borderRadius: 10
                                }} />
                            </View>
                            <TextInput
                            onChangeText={(val) => setPhone(val)}
                            maxLength={10}
                            placeholder='Telefoni'
                            keyboardType='phone-pad'
                            style={{
                                width: '90%',
                                height: 50,
                                alignSelf: 'center',
                                paddingLeft: 10,
                                backgroundColor: '#f2eef4',
                                borderRadius: 5,
                                marginTop: 20,
                            }}
                            />

                            <Text style={{
                                fontSize: 16,
                                color: message?.status === 200 ? '#35a061' : '#af3a53',
                                marginBottom: 10,
                                width: '90%',
                                alignSelf: 'center'
                            }}>{message?.message}</Text>

                        <TouchableOpacity 
                        onPress={handlePay}
                        style={{
                            width: '90%',
                            height: 50,
                            borderRadius: 5,
                            backgroundColor: '#93a2db',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                            marginBottom: 5
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 16
                            }}>{loading ? 'Loading...' : 'Ishyura'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={checkPayment}
                        style={{
                            width: '90%',
                            height: 50,
                            borderRadius: 5,
                            backgroundColor: '#35a061',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                            marginBottom: 5
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 16
                            }}>{loading1 ? 'Loading...' : 'Nishyuye'}</Text>
                        </TouchableOpacity>
                        </View> :<> 
                        <Video
                            style={{
                                width: '90%',
                                height: 200,
                                borderRadius:5,
                                alignSelf: 'center'
                            }}
                            ref={video}
                            source={{
                                uri: courses[videoIndex]?.video,
                            }}
                            useNativeControls
                            isLooping={false}
                            resizeMode='contain'
                            shouldPlay={true}
                            onPlaybackStatusUpdate={stat => {
                                if(stat.didJustFinish === true){
                                    setStatus('finish');  
                                    console.log(status); 
                                }else if(stat.isPlaying === true) {
                                    setStatus('isPlaying');
                                    console.log(status)
                                }
                            }}
                        
                        />
                        
                        <TouchableOpacity 
                        onPress={() => {
                            const nextVideoIndex = videoIndex + 1;
                            setVideoIndex(nextVideoIndex);
                            setStatus();
                            video.current.playAsync();
                        }}
                        disabled={status === 'finish' ? false : true} 
                        style={{
                            width: '90%',
                            height: 50,
                            alignItems: 'center',
                            backgroundColor: status === 'finish' ? '#43c058' : '#7c7c7c',
                            borderRadius: 5,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 10,
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 16
                        }}>Isomo rikurikira</Text>
                        <FontAwesome5 name="angle-double-right" style={{
                            marginLeft: 10,
                            marginTop: 5
                        }} size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: '#93a2db'
                        }}>{courses[videoIndex]?.title}</Text>
                        <Text style={{
                            fontSize: 15,
                            marginTop: 10,
                            color: '#808080',
                            textAlign: 'justify',
                            lineHeight: 20
                        }}>{courses[videoIndex]?.summary}</Text>
                    </View>
                    
                    <View style={{ marginTop: 30,
                        marginBottom: 0}}>
                        <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('TakeTest')
                        }}
                        disabled={ status ==='finish' && videoIndex === courses.length - 1 && courses > 3 ? false : true}
                        style={{
                            width: '90%',
                            height: 50,
                            borderRadius: 5,
                            backgroundColor: status ==='finish' && videoIndex === courses.length - 1 && courses > 3 ? '#93a2db': '#7c7c7c',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                            marginBottom: 5
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 16
                            }}>Kora isuzuma bumenyi</Text>
                        </TouchableOpacity>
                    </View> 
                    </>
                    }
                    
                    
                </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default TakeCourse
