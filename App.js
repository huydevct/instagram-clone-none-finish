import React, { Component } from "react";

import firebase from "firebase";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyCBup448q3lV6sBfB4DrQCLgh2bfXuCNkI",
  authDomain: "instagram-dev-7b406.firebaseapp.com",
  projectId: "instagram-dev-7b406",
  storageBucket: "instagram-dev-7b406.appspot.com",
  messagingSenderId: "283156524185",
  appId: "1:283156524185:web:b6d333349b075be3345c08",
  measurementId: "G-ER1JDD765P",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import CommentScreen from "./components/main/Comment";  

const Stack = createStackNavigator();
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
            />
            
            <Stack.Screen
              name="Add"
              component={AddScreen}
              navigation={this.props.navigation}
            />

            <Stack.Screen
              name="Save"
              component={SaveScreen}
              navigation={this.props.navigation}
            />

            <Stack.Screen
              name="Comment"
              component={CommentScreen}
              navigation={this.props.navigation}
            />
            
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
