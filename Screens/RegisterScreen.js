import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const signUp = () => {
    auth.createUserWithEmailAndPassword(email, password).then(
      (userCred) => {
        userCred.user.updateProfile({
          displayName: name,
          photoURL: photoURL,
        });
        navigation.goBack();
      },
      (err) => alert(err.message)
    );

    Keyboard.dismiss();
  };
  useLayoutEffect(() => {
    const unsubscribe = navigation.setOptions({
      headerTitle: () => <Text style={{ fontSize: 20 }}>Register</Text>,
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: "row", marginLeft: 20 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>Login</Text>
        </TouchableOpacity>
      ),

      headerStyle: {
        backgroundColor: "#0acc",
      },
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSSjhHfMLK7P8EgweQPSamQXneI5XTjPemIQ&usqp=CAU",
          }}
          style={styles.logo}
        ></Image>
        <TextInput
          placeholder="USERNAME"
          style={styles.textInput}
          value={name}
          onChangeText={(text) => setName(text)}
        ></TextInput>
        <TextInput
          placeholder="EMAIL ADDRESS"
          style={styles.textInput}
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          placeholder="PASSWORD"
          style={styles.textInput}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        <TextInput
          placeholder="PROFILE PHOTO URL(optinal)"
          style={styles.textInput}
          value={photoURL}
          onChangeText={(text) => setPhotoURL(text)}
          onSubmitEditing={signUp}
        ></TextInput>
        <View style={{ height: 40 }}></View>
        <Button title="   Register  " onPress={signUp}></Button>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

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
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    // backgroundColor: "red",
    marginTop: 30,
  },
});
