import React from 'react'
import { View, StatusBar, Dimensions, Text, TouchableOpacity, ImageBackground, Image, SafeAreaView } from 'react-native';

const { width, height} = Dimensions.get('screen');
const OnBoard = ({ navigation }) => {
    return (
        <SafeAreaView>
        <View style={{
            width: '100%',
            height: height,
            backgroundColor: '#ccd1ee'
        }}>
            <StatusBar barStyle='' backgroundColor='#ccd1ee' />
            <Image source={require('./images/onboardImage.png')} style={{ 
                position: 'absolute', 
                width: '100%',
            }} />
                <View style={{
                    height: 230,
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    elevation: 20,
                    marginTop: height - 290
                }}>
                    <Text style={{
                        color: '#4282b7',
                        fontSize: 35,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 10,
                    }}>Befa Languages</Text>
                    <Text style={{
                        fontSize: 20,
                        marginTop: 10,
                        textAlign: 'center'
                    }}>Iga amategeko y' umuhanda byoroshye.</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        alignSelf: 'center'
                    }}>

                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        width: '45%',
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
                        }}>Injira</Text>
                    </TouchableOpacity>    
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Register')}
                    style={{
                        width: '45%',
                        backgroundColor: '#93a2db',
                        height: 50,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 40,
                        elevation: 20,
                        alignSelf: 'center',
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                        }}>Iyandikishe</Text>
                    </TouchableOpacity>
                    </View>
                </View>
        </View>
        </SafeAreaView>
    )
}

export default OnBoard;
