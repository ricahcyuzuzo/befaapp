import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, TouchableOpacity, Text, Dimensions, Alert,StatusBar, ScrollView} from 'react-native'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height} = Dimensions.get('screen');

const Marks = ({ navigation }) => {
    const [marks, setMarks] = useState();
    const [notFound, setNotFound] = useState(true);
    useEffect(() => {
        getMarks();
    }, []);

    const getMarks = async () => {
        const userId = await AsyncStorage.getItem('userId');
        axios.get(`https://befaapi.herokuapp.com/api/marks?userId=${userId}`)
        .then(response => {
           setMarks(response.data.data);
        }) 
        .catch((err) => {
            if(err.response.data.status === 404){
                setNotFound(false)
            }else{
                Alert.alert('Befa', 'Havutse ikibazo, suzuma murandasi yawe.')
            }
            
        });
    }

    return (
        <SafeAreaView>
            <StatusBar barStyle='dark-content' backgroundColor='#fff' />
            <View style={{
                height: height,
                width: '100%',
                backgroundColor: '#fff'
            }}>
                 <View style={{
                flexDirection: 'row'
            }}>
                <TouchableOpacity onPress = {() => navigation.goBack()} style={{
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
                }}>Amanota yakorewe.</Text>
            </View>
            <ScrollView style={{
                height: height,
            }}>

                {
                    !marks ? <Text style={{
                        fontSize: 18,
                        color: '#93a2db',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20,
                    }}>{notFound ? '': 'Ntamanota mufite, mubanze mukore isuzuma bumenyi nibura rimwe.'}</Text>: 
                    
                    marks.map((item, idx) => {
                        return(
                            <View key={idx} style={{
                                backgroundColor: '#fff',
                                borderLeftWidth: 10,
                                borderColor: '#93a2db',
                                width: '90%',
                                alignSelf: 'center',
                                height: 120,
                                marginTop: 20,
                                elevation: 20,
                                borderRadius: 20,
                                paddingLeft: 10,
                            }}>
                                <Text style={{
                                    color: '#93a2db',
                                    fontSize: 18,
                                    marginTop: 5,
                                    marginLeft: 5,
                                }}>Isuzuma bumenyi rya {idx + 1}</Text>
                                <Text style={{
                                    color: '#7c7c7c',
                                    fontSize: 16,
                                    marginLeft: 5
                                }}>Amanota {item.score} / {item.level}</Text>
                                <Text style={{
                                    color: '#a43740',
                                    fontSize: 16,
                                    marginLeft: 5,
                                }}>Ibibazo bitaribyo: {item.wrongAnswer}</Text>
                                <Text style={{
                                    color: '#38a721',
                                    fontSize: 16,
                                    marginLeft: 5,
                                }}>Ibibazo biribyo: {item.correctAnswer}</Text>
                                <Text style={{
                                    color: item.score / item.level < item.level /item.score ? '#a43740' : '#38a721',
                                    fontSize: 16,
                                    marginLeft: 5
                                }}>
                                    { item.score / item.level < item.level /item.score ? 'Fail':'Pass'}
                                </Text>
                            </View>
                        )
                    })
                    
                }
                <View style={{
                    height: 35,
                }}></View>
                 </ScrollView>           
            </View>
        </SafeAreaView>
    )
}

export default Marks
