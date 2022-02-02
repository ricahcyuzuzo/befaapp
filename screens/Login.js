import React, { useContext, useState } from 'react'
import { Dimensions, SafeAreaView, StatusBar, TextInput, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../AppContext/AppContext';

const { width, height} = Dimensions.get('screen');
const Login = ({ navigation }) => {
    
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const {setLoggedIn} = useContext(AppContext);

    const handleLogin = () => {
        if(!phone){
            Alert.alert('Befa App','Andika Numero telefoni yawe');
            return
        }    
        if(!password){
            Alert.alert('Befa App','Andika ijambo banga ryawe');
            return
        }
        setLoading(true)
        const user = {
            phone: phone,
            password: password
        }
        axios.post('https://befaapii.herokuapp.com/api/signin', user)
        .then((response) => {
            setLoading(false);
            setLoggedIn(true);
            AsyncStorage.setItem('userId', `${response.data.userId}`);
            AsyncStorage.setItem('loggedIn', 'yes');
            AsyncStorage.setItem('names', response.data.user.names.split(' ')[0])
        })
        .catch((err) => {
            setLoading(false)
            Alert.alert('Befa', 'Amakuru banga ntabwo ariyo')
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
                    color: '#4282b7',
                    textAlign: 'center',
                    marginTop: 100,
                    marginBottom: 50
                }}>Injira</Text>
                <View>
                    <TextInput 
                        placeholder='Telefoni'
                        onChangeText={(val) => setPhone(val)}
                        style={{
                            backgroundColor: '#f2eef4',
                            width: '90%',
                            height: 50,
                            alignSelf: 'center',
                            paddingLeft: 60,
                            borderRadius: 10,
                            fontSize: 16,
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
                        alignItems: 'center'
                    }}>
                        <Feather name='phone' size={24} color='#93a2db' />
                    </View>
                </View>

                <View style={{
                    marginTop: 20,
                }}>
                    <TextInput 
                        placeholder='Ijambo banga'
                        onChangeText={(val) => setPassword(val)}
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
                    <TouchableOpacity onPress={handleLogin} style={{
                        width: '90%',
                        backgroundColor: '#93a2db',
                        height: 50,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 40,
                        alignSelf: 'center',
                        elevation: 20,
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                        }}>{loading ? 'Loading...' : 'Injira'}</Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        alignSelf: 'center',
                        width: '90%',
                    }}>
                        <Text style={{
                            fontSize: 16,
                        }}>Kwiyandikisha ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{
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

export default Login;
