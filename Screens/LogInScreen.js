import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { auth } from "../firebase";

const LogInScreen = ({ navigation }) => {
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {})
      .catch((err) => alert(err.message));
    Keyboard.dismiss();
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((snapshot) => {
      if (snapshot) {
        navigation.replace("home");
      }
    });
    return unsubscribe;
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar style="white"></StatusBar>

        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSSjhHfMLK7P8EgweQPSamQXneI5XTjPemIQ&usqp=CAU",
          }}
          style={styles.logo}
        ></Image>
        <TextInput
          placeholder="EMAIL Address"
          textContentType="emailAddress"
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          placeholder="PASSWORD"
          textContentType="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.textInput, styles.textInputTwo]}
        ></TextInput>
        <TouchableOpacity style={styles.button}>
          <Button title="Login" onPress={signIn}></Button>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOne}
          onPress={() => navigation.navigate("register")}
        >
          <Text> Register</Text>
        </TouchableOpacity>
        <View style={{ height: 100 }}></View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  textInput: {
    padding: 15,
    paddingLeft: 40,
    width: 300,
    borderColor: "black",
    borderWidth: 1,
    // backgroundColor: "red",
    marginTop: 30,
  },
  button: {
    marginTop: 20,
    width: 200,
  },
  buttonOne: {
    marginTop: 20,
    width: 200,
    alignItems: "center",
    borderColor: "#007AFF",
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
  },
});
