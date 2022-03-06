import React, { useState } from 'react'
import { Dimensions, SafeAreaView, StatusBar,Alert, TextInput, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

const {width, height} = Dimensions.get('screen');
const Register = ({ navigation }) => {

    const [names, setNames] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {

        if(!names || !phone || !password || !confirmPassword){
            Alert.alert('Befa','Injizamo amakuru yose asabwa.')
            return
        }

        if(password !== confirmPassword){
            Alert.alert('Befa', 'Amajambo banga agomba gusa.');
            return 
        }

        const user = { 
            phone: phone,
            password: password,
            names: names,
        }
        setLoading(true)
        axios.post('https://befaapi.herokuapp.com/api/signup', user)
            .then(() => {
                setLoading(false)
                navigation.navigate('Login')
            })
            .catch((error) => {
                setLoading(false)
                Alert('Befa', 'Hari ikibazo kibonetse, suzuma ko ufite murandasi')
            });
    }
        return (
            <SafeAreaView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView 
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}
                >
                <View style={{
                    width: '100%',
                    height: height,
                    backgroundColor: '#fff'
                }}> 
                    <StatusBar barStyle='dark-content' backgroundColor='#fff' />
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#93a2db',
                        textAlign: 'center',
                        marginTop: 100,
                        marginBottom: 50
                    }}>Iyandikishe</Text>

                    <View>
                        <TextInput 
                            onChangeText={(val) => setNames(val)}
                            placeholder='Amazina'
                            style={{
                                backgroundColor: '#f2eef4',
                                width: '90%',
                                height: 50,
                                alignSelf: 'center',
                                paddingLeft: 60,
                                borderRadius: 10,
                                fontSize: 16
                            }}
                        />
                        <View style={{
                            position: 'absolute',
                            marginLeft: 20,
                            height: 50,
                            width: 50,
                            borderRadius: 10,
                            borderColor: '#93a2db',
                            borderRightWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Feather name='user' size={24} color='#93a2db' />
                        </View>
                    </View>

                    <View style={{
                        marginTop: 20,
                    }}>
                        <TextInput 
                            onChangeText={(val) => setPhone(val)}
                            placeholder='Telefoni'
                            style={{
                                backgroundColor: '#f2eef4',
                                width: '90%',
                                height: 50,
                                alignSelf: 'center',
                                paddingLeft: 60,
                                borderRadius: 10,
                                fontSize: 16
                            }}
                            keyboardType='phone-pad'
                            maxLength={10}
                        />
                        <View style={{
                            position: 'absolute',
                            marginLeft: 20,
                            height: 50,
                            width: 50,
                            borderRadius: 10,
                            borderColor: '#93a2db',
                            borderRightWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                        }}>
                            <Feather name='phone' size={24} color='#93a2db' />
                        </View>
                    </View>
    
                    <View style={{
                        marginTop: 20,
                    }}>
                        <TextInput 
                            onChangeText={(val) => setPassword(val)}
                            placeholder='Ijambo banga'
                            style={{
                                backgroundColor: '#f2eef4',
                                width: '90%',
                                height: 50,
                                alignSelf: 'center',
                                paddingLeft: 60,
                                borderRadius: 10,
                                fontSize: 16
                            }}
                            secureTextEntry={true}
                        />
                        <View style={{
                            position: 'absolute',
                            marginLeft: 20,
                            height: 50,
                            width: 50,
                            borderRadius: 10,
                            borderColor: '#93a2db',
                            borderRightWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Feather name='lock' size={24} color='#93a2db' />
                        </View>
                    </View>

                    <View style={{
                        marginTop: 20,
                    }}>
                        <TextInput 
                            onChangeText={(val) => setConfirmPassword(val)}
                            placeholder='Subiramo Ijambo banga'
                            style={{
                                backgroundColor: '#f2eef4',
                                width: '90%',
                                height: 50,
                                alignSelf: 'center',
                                paddingLeft: 60,
                                borderRadius: 10,
                                fontSize: 16
                            }}
                            secureTextEntry={true}
                        />
                        <View style={{
                            position: 'absolute',
                            marginLeft: 20,
                            height: 50,
                            width: 50,
                            borderRadius: 10,
                            borderColor: '#93a2db',
                            borderRightWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Feather name='lock' size={24} color='#93a2db' />
                        </View>
                    </View>
    
    
                    <View>
                        <TouchableOpacity onPress={handleRegister} style={{
                            width: '90%',
                            backgroundColor: '#93a2db',
                            height: 50,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 40,
                            alignSelf: 'center',
                            elevation: 20
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 18,
                            }}>{loading ? 'Loading...' : 'Emeza'}</Text>
                        </TouchableOpacity>
    
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 30,
                            alignSelf: 'center',
                            width: '90%',
                        }}>
                            <Text style={{
                                fontSize: 16,
                            }}>Kwinjira ?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{
                                fontSize: 16,
                                color: '#93a2db',
                                marginLeft: 10,
                            }}>Kanda hano</Text></TouchableOpacity>
                        </View>
                    </View>
    
    
                </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
}

export default Register
