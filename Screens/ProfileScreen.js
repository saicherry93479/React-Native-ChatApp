import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { auth } from "../firebase";
import { Fontisto } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const updateHandler = () => {
    navigation.navigate("updateprofile");
  };
  return (
    <View>
      <View style={styles.container}>
        {auth.currentUser.photoURL ? (
          <Image
            source={{ uri: auth.currentUser.photoURL }}
            style={{ width: 80, height: 80, borderRadius: 80 }}
          ></Image>
        ) : (
          <Fontisto name="user-secret" size={24} color="black" />
        )}
        <Text
          style={{
            marginTop: 10,
            fontSize: 20,
            textAlign: "center",
            fontWeight: "800",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          {auth.currentUser.displayName}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "800",
              minWidth: 130,
            }}
          >
            Email
          </Text>
          <Text style={{ marginRight: 20 }}>:</Text>
          <Text>{auth.currentUser.email}</Text>
        </View>
        <View style={styles.content}>
          <Text style={{ fontSize: 16, fontWeight: "800", minWidth: 130 }}>
            Followers
          </Text>
          <Text style={{ marginRight: 20 }}>:</Text>
          <Text>234</Text>
        </View>
        <View style={styles.content}>
          <Text style={{ fontSize: 16, fontWeight: "800", minWidth: 130 }}>
            Following
          </Text>
          <Text style={{ marginRight: 20 }}>:</Text>
          <Text>300</Text>
        </View>
        <View style={styles.content}>
          <Text style={{ fontSize: 16, fontWeight: "800", minWidth: 130 }}>
            Phone Number
          </Text>
          <Text style={{ marginRight: 20 }}>:</Text>
          <Text>
            {auth.currentUser.phoneNumber
              ? auth.currentUser.phoneNumber
              : "Not Available"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 200,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
        }}
      >
        <Button title="Update Profile" onPress={updateHandler}></Button>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  content: {
    flexDirection: "row",
    height: 60,
    // backgroundColor: "white",
    // elevation: 6,
    marginBottom: 2,
    alignItems: "center",
    paddingLeft: 10,
  },
  contentContainer: {
    // backgroundColor: "red",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
  },
});
