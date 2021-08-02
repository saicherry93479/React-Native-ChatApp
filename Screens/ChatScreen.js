import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth, db } from "../firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react/cjs/react.development";
import firebase from "firebase/app";
import "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = () => {
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      email: auth.currentUser.email,
      message: message,
      photoURL: auth.currentUser.photoURL,
      displayName: auth.currentUser.displayName,
    });
    setMessage("");
    Keyboard.dismiss();
  };
  useLayoutEffect(() => {
    const unsubscribe = navigation.setOptions({
      headerTitle: () =>
        auth.currentUser ? (
          <View style={{ flexDirection: "row" }}>
            {route.params.photourl ? (
              <Image
                source={{ uri: route.params.photourl }}
                style={{ width: 30, height: 30, borderRadius: 30 }}
              ></Image>
            ) : (
              <FontAwesome5
                name="user-circle"
                size={30}
                color="rgba(0,0,0,0.5)"
              />
            )}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: "white",
                marginLeft: 15,
              }}
            >
              {route.params.chatName}
            </Text>
          </View>
        ) : (
          "chatRoom"
        ),
     
      headerStyle: {
        backgroundColor: "#0acc",
      },
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        setMessages(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    return unsubscribe;
  }, [route]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback>
        <ScrollView style={{ padding: 10 }}>
          {messages.map(({ id, data }) =>
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.sender}>
                <Text>{data.message}</Text>
              </View>
            ) : (
              <View key={id} style={styles.received}>
                <Text>{data.message}</Text>
                {data.photoURL ? (
                  <Image
                    source={{ uri: data.photoURL }}
                    style={{
                      position: "absolute",
                      bottom: -15,
                      left: -0,
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                    }}
                  ></Image>
                ) : (
                  <View style={{ position: "absolute", bottom: -15, left: 0 }}>
                    <FontAwesome5
                      name="user-circle"
                      size={20}
                      color="rgba(0,0,0,0.5)"
                    />
                  </View>
                )}
                <Text
                  style={{
                    fontSize: 12,
                    position: "absolute",
                    bottom: -10,
                    left: 25,
                    color: "#0acc",
                  }}
                >
                  {data.displayName}
                </Text>
              </View>
            )
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
      <View style={styles.bottom}>
        <View style={styles.textSender}>
          <TextInput
            placeholder="ENTER MESSAGE"
            style={styles.textInput}
            multiline={true}
            value={message}
            onChangeText={(text) => setMessage(text)}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={sendMessage}>
          <MaterialIcons
            name="send"
            size={35}
            color="#0acc"
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    flexDirection: "row",
    width: "100%",
    // justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    position: "relative",
    bottom: 0,
  },
  textSender: {
    width: "90%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  textInput: {
    padding: 10,
    paddingRight: 30,
    paddingLeft: 20,
    width: "100%",
    color: "rgba(0,0,0,0.9)",
  },
  sender: {
    backgroundColor: "white",
    maxWidth: "90%",
    alignItems: "flex-end",
    marginLeft: "auto",
    minHeight: 40,
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    minWidth: 70,
    alignItems: "center",
  },
  received: {
    backgroundColor: "#dce0dd",
    maxWidth: "90%",
    alignItems: "flex-start",
    marginRight: "auto",
    minHeight: 40,
    marginBottom: 30,
    padding: 10,
    borderRadius: 20,
    minWidth: 70,
    alignItems: "center",
  },
});
