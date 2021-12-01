import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OnBoard from './screens/OnBoard';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import TakeCourse from './screens/TakeCourse';
import TakeExam from './screens/TakeExam';
import Test from './screens/Test';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from './AppContext/AppContext';
import Answers from './screens/Answers';
import Marks from './screens/Marks';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [quizId, setQuizId] = useState();
  const [answers, setAnswers] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [optAnswers, setOptAnswers] = useState([]);
  const [courseId, setCourseId ] = useState();
  const [quizz, setQuizz] = useState();

  useEffect(() => {
    checkLoggedIn();
  }, [])

  const checkLoggedIn = async () => {
    if(await AsyncStorage.getItem('loggedIn') === 'yes'){
      setLoggedIn(true);
    }
  }
  return (
    <AppContext.Provider value={{ quizId, setQuizId, answers, setAnswers, quizes, setQuizes, courses, setCourses, questions, setQuestions, options, setOptions,optAnswers, setOptAnswers, setLoggedIn, courseId, setCourseId, setQuizz, quizz}}>
    <NavigationContainer>
      <Stack.Navigator>
        {
          loggedIn ? 
          <>
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='TakeCourse' component={TakeCourse} options={{ headerShown: false }} />
            <Stack.Screen name='TakeTest' component={TakeExam} options={{ headerShown: false }} />
            <Stack.Screen name='Test' component={Test} options={{ headerShown: false }} />
            <Stack.Screen name='Answers' component={Answers} options={{ headerShown: false }} />
            <Stack.Screen name='Marks' component={Marks} options={{ headerShown: false }} />

          </>: 
          <>
            <Stack.Screen name='Onboard' component={OnBoard} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
    </AppContext.Provider>
  );
}
