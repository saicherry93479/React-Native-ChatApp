import React, { useLayoutEffect, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogInScreen from "./Screens/LogInScreen";
import { StatusBar } from "expo-status-bar";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import { auth } from "./firebase";
import CreateRoomScreen from "./Screens/CreateRoomScreen";
import ChatScreen from "./Screens/ChatScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import UpdateProfileScreen from "./Screens/UpdateProfileScreen";

const stack = createStackNavigator();

const App = () => {
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((snapshot) => {
  //     if (snapshot) {
  //       navigation.replace("home");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);
  return (
    <NavigationContainer>
      <StatusBar></StatusBar>
      <stack.Navigator initialRouteName="login">
        <stack.Screen
          name="login"
          component={LogInScreen}
          options={{
            headerTitleAlign: "center",
            headerTitle: () => <Text style={styles.header}>LOGIN</Text>,
            headerStyle: {
              backgroundColor: "#0acc",
            },
          }}
        ></stack.Screen>
        <stack.Screen
          name="register"
          component={RegisterScreen}
          options={{}}
        ></stack.Screen>
        <stack.Screen name="home" component={HomeScreen}></stack.Screen>
        <stack.Screen
          name="chatroomcreator"
          component={CreateRoomScreen}
        ></stack.Screen>
        <stack.Screen name="chatscreen" component={ChatScreen}></stack.Screen>
        <stack.Screen name="profile" component={ProfileScreen}></stack.Screen>
        <stack.Screen
          name="updateprofile"
          component={UpdateProfileScreen}
        ></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "800",
  },
});
