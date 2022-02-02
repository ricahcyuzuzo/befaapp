import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, ScrollView, Alert, Image, TextInput, Platform } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../AppContext/AppContext';
import {Vimeo} from 'react-native-vimeo-iframe';

const { width, height} = Dimensions.get('screen');

const TakeCourse = ({ navigation }) => {
    const video = useRef(null);
    const [status, setStatus] = useState();
    const [videoIndex, setVideoIndex] = useState(0);
    const [phone, setPhone] = useState();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const { courses, setQuizes, setCourses, setCourseId } = useContext(AppContext);

    const videoLink = courses[videoIndex]?.video.toString().split('/');
    
    useEffect(() => {
        setInterval(() => {
            checkPayment();
            if(courses > 3){
                setVideoIndex(3);
            }
        }, 5000)
    }, [])

    const handlePay = async () => {
        setLoading2(true);
        setLoading(true)
        const userId = await AsyncStorage.getItem('userId');
        axios.post(`https://befaapii.herokuapp.com/api/pay?userId=${userId}`, { phone: phone })
        .then((response) => {
            const msg = 'Mwasabye kwishyura, rangiza kwishyura ukanda *182*7*1#' 
            setMessage({
                status: response.data.code,
                message: msg
            });
            setLoading(false);

        }).catch(err => {
            const msg = 'Nta mafaranga ahagije mufite kuri konti yanyu, mushyireho amafaranga kuri konti, kanda *182*7*1#'  
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
        axios.get(`https://befaapii.herokuapp.com/api/check?userId=${userId}`)
        .then((response) => {
            const msg = response.data.message
              
            setMessage({
                status: response.data.status,
                message: msg
            });

            axios.get(`https://befaapii.herokuapp.com/api/quizes?userId=${userId}`)
                .then(response => {
                    setQuizes(response.data.data);
                }).catch((err) => {
                });

            axios.get(`https://befaapii.herokuapp.com/api/courses?userId=${userId}`)
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
                <ScrollView
                    keyboardShouldPersistTaps='always'
                >
                <StatusBar barStyle='dark-content' backgroundColor='#fff' />
                <View style={{
                    width: '100%',
                    marginTop: 0,
                }}>
                    {
                        status === 'finish' && videoIndex === 1 && courses.length < 3? 
                        <View>
                            <Text style={{
                                textAlign: 'justify',
                                alignSelf: 'center',
                                width: '90%',
                                fontSize: 25,
                                fontWeight: 'bold',
                                color: '#93a2db',
                                marginTop: 20
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
                        </View> :<> 
                        <Vimeo
                            style={{
                                width: '98%',
                                height: 200,
                                position: 'relative',
                                marginLeft: 0.4 
                            }}
                            videoId={videoLink[3]}
                            onReady={() => console.log('Video is ready')}
                            onPlay={() => setStatus('isPlaying')}
                            onPlayProgress={(data) => console.log('Video progress data:', data)}
                            onFinish={() => setStatus('finish')}
                            loop={false}
                            autoPlay={true}
                            controls={true}
                            speed={false}
                            time={'0m0s'}
                        />
                        {/* <Video
                            style={{
                                width: width,
                                height: 200,
                                position: 'relative'
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
                        
                        /> */}
                        
                        <View style={{
                            width: '98%',
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row-reverse'
                        }}>
                            { courses.length === videoIndex + 1 ? <TouchableOpacity 
                        onPress={() => {
                            setStatus('finish');
                        }}
                        style={{
                            width: '45%',
                            height: 50,
                            alignItems: 'center',
                            backgroundColor: '#43c058',
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
                    </TouchableOpacity> : 
                            
                        <TouchableOpacity 
                        onPress={() => {
                            const nextVideoIndex = videoIndex + 1;
                            setVideoIndex(nextVideoIndex);
                            setStatus();
                            // video.current.playAsync();
                        }}
                        disabled={courses.length === videoIndex + 1 ? true : false} 
                        style={{
                            width: '45%',
                            height: 50,
                            alignItems: 'center',
                            backgroundColor: '#43c058',
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
                    </TouchableOpacity>}
                    { videoIndex === 0 ? null : <TouchableOpacity 
                        onPress={() => {
                            const nextVideoIndex = videoIndex - 1;
                            setVideoIndex(nextVideoIndex);
                            setStatus('finish');
                            // video.current.playAsync();
                        }}
                        disabled={videoIndex === 0 ? true : false} 
                        style={{
                            width: '45%',
                            height: 50,
                            alignItems: 'center',
                            backgroundColor: videoIndex === 0 ? '#7c7c7c': '#93a2db',
                            borderRadius: 5,
                            flexDirection: 'row-reverse',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 10,
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 16
                        }}>Isomo riheruka</Text>
                        <FontAwesome5 name="angle-double-left" style={{
                            marginRight: 10,
                            marginTop: 2
                        }} size={24} color="#fff" />
                    </TouchableOpacity>    }
                    
                        </View>
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
                            setCourseId(courses[videoIndex]?.GUID)
                            navigation.navigate('TakeTest')
                        }}
                        // disabled={ status ==='finish' && videoIndex === courses.length - 1 && courses > 3 ? false : true}
                        style={{
                            width: '95%',
                            height: 50,
                            borderRadius: 10,
                            backgroundColor: '#93a2db',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                            marginBottom: 5,
                            elevation: 20,

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
