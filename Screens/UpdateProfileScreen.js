import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import { auth } from "../firebase";

const UpdateProfileScreen = () => {
  const [userName, setUserName] = useState(null);
  const [phNum, setPhNum] = useState("");
  const [photo, setPhoto] = useState(null);
  const [userNameUpdate, setUserNameUpdate] = useState(false);
  const [phNumUpdate, setPhNumUpdate] = useState(false);
  const [photoUpdate, setPhotoUpdate] = useState(false);
  const userNameHandler = () => {
    auth.currentUser
      .updateProfile({
        displayName: userName,
      })
      .then((credUser) => {
        setUserNameUpdate(!userNameUpdate);
        setUserName("");
        Keyboard.dismiss();
      })
      .catch((err) => alert(err.message));
  };

  const phNumHandler = () => {
    auth.currentUser
      .updateProfile({
        phoneNumber: phNum,
      })
      .then((credUser) => {
        setPhNumUpdate(!phNumUpdate);
        setPhNum("");

        Keyboard.dismiss();
      })
      .catch((err) => alert(err.message));
  };
  const photoHandler = () => {};
  return (
    <View style={styles.container}>
      {userNameUpdate ? (
        <View style={styles.content}>
          <Text style={{ fontSize: 20, color: "lightgreen", marginRight: 30 }}>
            UserName Succesfully
          </Text>
          <Text style={{ fontSize: 16, color: "crimson", marginLeft: 10 }}>
            UPDATED
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <TextInput
            placeholder="USERNAME"
            value={userName}
            onChangeText={(text) => setUserName(text)}
            style={styles.textInput}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={userNameHandler}>
            <Text style={{ color: "rgba(0,0,0,0.3)" }}>Update</Text>
          </TouchableOpacity>
        </View>
      )}

      {phNumUpdate ? (
        <View style={styles.content}>
          <Text style={{ fontSize: 20, color: "lightgreen", marginRight: 30 }}>
            Ph NUM Succesfully
          </Text>
          <Text style={{ fontSize: 16, color: "crimson", marginLeft: 10 }}>
            UPDATED
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <TextInput
            placeholder="PHNUMBER"
            value={phNum}
            onChangeText={(text) => setPhNum(text)}
            style={styles.textInput}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            maxLength={10}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={phNumHandler}>
            <Text style={{ color: "rgba(0,0,0,0.3)" }}>Update</Text>
          </TouchableOpacity>
        </View>
      )}

      {photoUpdate ? (
        <View style={styles.content}>
          <Text style={{ fontSize: 20, color: "lightgreen", marginRight: 30 }}>
            Profile Photo Succesfully
          </Text>
          <Text style={{ fontSize: 16, color: "crimson", marginLeft: 10 }}>
            UPDATED
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <TextInput
            placeholder="PHOTOURL"
            value={photo}
            onChangeText={(text) => setPhoto(text)}
            style={styles.textInput}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={photoHandler}>
            <Text style={{ color: "rgba(0,0,0,0.3)" }}>Update</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 80,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  textInput: {
    width: 240,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    marginRight: 10,
  },
  button: {
    borderColor: "#0acc",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#8fddf7",
    borderRadius: 10,
  },
});
