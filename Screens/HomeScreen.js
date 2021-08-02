import React, { useLayoutEffect, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { SimpleLineIcons } from "@expo/vector-icons";
import ChatListItem from "./ChatListItem";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [visible, setVisible] = useState(false);

  const enterChat = (id, chatName, photourl) => {
    navigation.navigate("chatscreen", {
      id: id,
      chatName: chatName,
      photourl: photourl,
    });
  };
  const profileHandler = () => {
    navigation.navigate("profile");
  };
  const profileHandlerOne = () => {
    navigation.navigate("profile");
    setVisible(!visible);
  };

  const signOut = async () => {
    setVisible(!visible);
    await auth.signOut().then(() => {
      navigation.replace("login");
    });
  };

  const chatRoomHandler = () => {
    navigation.navigate("chatroomcreator");
  };
  const profileMenuHandler = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text>
          {auth.currentUser ? auth.currentUser.displayName : "Chat-APP"}
        </Text>
      ),
    });
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChatRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);
  useLayoutEffect(() => {
    const unsubscribe = navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 30 }} onPress={profileHandler}>
          {auth.currentUser ? (
            auth.currentUser.photoURL ? (
              <Image
                source={{ uri: auth.currentUser.photoURL }}
                style={{ width: 30, height: 30, borderRadius: 50 }}
              ></Image>
            ) : (
              <FontAwesome5
                name="user-circle"
                size={30}
                color="rgba(0,0,0,0.5)"
              />
            )
          ) : null}
          {/* style={{ width: 30, height: 30, borderRadius: 50 }}
          ></Image> */}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={chatRoomHandler}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={profileMenuHandler}
          >
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ backgroundColor: "white" }}>
      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={profileMenuHandler}>
          <View style={styles.menuContainer}>
            <View style={styles.menu}>
              <TouchableOpacity onPress={profileHandlerOne}>
                <View style={styles.menuOption}>
                  <MaterialCommunityIcons
                    name="face-profile"
                    size={24}
                    color="black"
                  />
                  <Text style={{ marginLeft: 10, color: "rgba(0,0,0,0.6)" }}>
                    Profile
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.menuOption}>
                  <Ionicons name="help" size={24} color="black" />
                  <Text style={{ marginLeft: 10, color: "rgba(0,0,0,0.6)" }}>
                    Help
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.menuOption}>
                  <AntDesign name="setting" size={24} color="black" />
                  <Text style={{ marginLeft: 10, color: "rgba(0,0,0,0.6)" }}>
                    Settings
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={signOut}>
                <View style={styles.menuOption}>
                  <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color="black"
                  />
                  <Text style={{ marginLeft: 10, color: "rgba(0,0,0,0.6)" }}>
                    LOGOUT
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView>
        {chatRooms.map(({ id, data }) => (
          <ChatListItem
            key={id}
            id={id}
            chatName={data.chatRoomName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  menuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  menu: {
    height: 160,
    width: 140,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    right: 0,
    display: "none",
  },
  menuOption: {
    height: 40,
    // backgroundColor: "rgba(0,0,0,1)",
    backgroundColor: "#0acc",
    borderBottomColor: "rgba(0,0,0,0.4)",
    borderBottomWidth: 1,
    // justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 20,
    flexDirection: "row",
  },
});
