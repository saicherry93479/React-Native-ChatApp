import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import {  } from "react/cjs/react.development";
import { db } from "../firebase";
import { FontAwesome5 } from "@expo/vector-icons";

const ChatListItem = ({ id, chatName, enterChat }) => {
  const [photourl, setPhotoURL] = useState("");
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.id === id) {
          const data = doc.data();
          setPhotoURL(data.photourl);
        }
      });
    });

    return unsubscribe;
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => enterChat(id, chatName, photourl)}
    >
      {/* <Image
        source={{
          uri: "https://i.insider.com/5f047a78aee6a81d686eb7a7?width=1000&format=jpeg&auto=webp",
        }}
        style={{ width: 40, height: 40, borderRadius: 50 }}
      ></Image> */}
      {photourl ? (
        <Image
          source={{
            uri: photourl,
          }}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        ></Image>
      ) : (
        <FontAwesome5 name="user-circle" size={40} color="rgba(0,0,0,0.5)" />
      )}
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "800" }}>{chatName}</Text>
        <Text style={{ opacity: 0.5 }}>This is the last Message</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 0.8,
  },
});
