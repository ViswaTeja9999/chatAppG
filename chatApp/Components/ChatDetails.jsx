import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Avatar, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const ChatDetails = ({}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const enterChat = (id, chatName) => {
    navigation.navigate("Conversation", {
      id: id,
      chatName: chatName,
    });
  };
  return (
    <TouchableOpacity
      style={{ width: "95%" }}
      onPress={() => enterChat("0", "Ram")}
    >
      <View
        style={{
          backgroundColor: colors.card,
          marginTop: 20,
          height: 80,
          borderRadius: 20,
          padding: 10,
          flexDirection: "row",
        }}
      >
        <Avatar
          rounded
          size="medium"
          source={{
            uri: "https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png",
          }}
        />
        <View style={styles.textContainer}>
          <Text h4 style={{ color: colors.text, fontWeight: "500" }}>
            Ram
          </Text>
          <Text h5 style={{ color: colors.text, fontWeight: "500" }}>
            11:30PM
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    padding: 10,
  },
});
