import React, { useState, useLayoutEffect } from "react";
import { Button, Keyboard, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { db } from "../firebase";

const CreateRoomScreen = ({ navigation }) => {
  const [roomName, setRoomName] = useState("");
  const [photourl, setPhotoURL] = useState("");
  const roomHandler = async () => {
    roomName.length > 3
      ? await db
          .collection("chats")
          .add({
            chatRoomName: roomName,
            photourl: photourl,
          })
          .then((snap) => navigation.navigate("home"))
          .catch((err) => alert(err.message))
      : alert("room name atleast 3 characters");
    Keyboard.dismiss();
  };

  useLayoutEffect(() => {
    const unsubsribe = navigation.setOptions({
      headerStyle: {
        backgroundColor: "#0acc",
      },
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontWeight: "800", color: "white" }}>
          CHAT ROOM
        </Text>
      ),
      headerTitleAlign: "center",
    });
    return unsubsribe;
  }, [navigation]);
  return (
    <View>
      <Text style={styles.heading}>create a room</Text>
      <View style={styles.container}>
        <TextInput
          placeholder="ENTER ROOM NAME"
          style={styles.textInput}
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
        ></TextInput>
        <TextInput
          placeholder="PROFILE PIC(optional)"
          style={styles.textInput}
          value={photourl}
          onChangeText={(text) => setPhotoURL(text)}
        ></TextInput>
        <Button title="create" onPress={roomHandler}></Button>
      </View>
    </View>
  );
};

export default CreateRoomScreen;

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  heading: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
    color: "#0acc",
  },
  textInput: {
    marginBottom: 20,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 0.6,
    fontSize: 15,
    paddingLeft: 30,
    padding: 15,
  },
});
