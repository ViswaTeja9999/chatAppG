import React, { useLayoutEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Text, Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const ConversationScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const sendMessage = () => {
    Keyboard.dismiss();
    setInput("");
  };
  const accountInfo = (id) => {
    navigation.navigate("Profile", {
      id: id,
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "60%",
          }}
        >
          <Avatar
            source={{
              uri: "https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png",
            }}
            rounded
          />
          <Text
            style={{
              color: colors.text,
              fontWeight: "600",
              fontSize: 20,
              marginLeft: 20,
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity onPress={() => accountInfo(route.params.id)}>
            <Icon
              name="information-circle-outline"
              type="ionicon"
              color={colors.primary}
              size={26}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <ScrollView>
          <View
            style={{
              padding: 15,
              backgroundColor: colors.primary,
              alignSelf: "flex-end",
              position: "relative",
              maxWidth: "80%",
              marginBottom: 15,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: colors.text }}>Hi</Text>
          </View>
          <View
            style={{
              padding: 15,
              backgroundColor: colors.card,
              alignSelf: "flex-start",
              position: "relative",
              maxWidth: "80%",
              marginBottom: 15,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: colors.text }}>
              hkjhfjksdhfsjdfhhuhdiuhdiuhdiwhdiwhfiewhfihfwuhfiuwhfiuwhwhhfuhfwhiwfhiwe
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            padding: 5,
            backgroundColor: colors.card,
          }}
        >
          <TextInput
            placeholder="Enter Message"
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{
              bottom: 0,
              height: 40,
              flex: 1,
              marginRight: 15,
              backgroundColor: colors.background,
              borderRadius: 30,
              padding: 10,
              color: colors.text,
            }}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#2B68E6" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConversationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  sender: {
    padding: 15,
    backgroundColor: "#383838",
    alignSelf: "flex-start",
    position: "relative",
    maxWidth: "80%",
    marginBottom: 15,
    borderRadius: 15,
  },
  reciver: {},
  senderText: {
    color: "#000",
  },
  reciverText: {
    color: "#000",
  },
});
