import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FAB, Icon, Text } from "react-native-elements";
import ChatDetails from "../Components/ChatDetails";
import { useTheme } from "@react-navigation/native";

const ChatsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const newChat = () => {
    navigation.navigate("New Chat");
  };
  const EmergencyAlert = () => {
    Alert.alert(
      "Emergency",
      "Clicking Send Emergency Message will send a SOS message to your Emergency Contacts with your Location if turned on.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Send Emergency Message",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => EmergencyAlert()}>
          <Text style={{ color: "red", fontWeight: "600", fontSize: 17 }}>
            Emergency
          </Text>
        </TouchableOpacity>
      ),
    });
  });
  return (
    <View>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.container}>
          <ChatDetails />
        </View>
      </ScrollView>
      <FAB
        title={
          <Icon
            name="add-comment"
            type="material"
            color={colors.text}
            size={24}
          />
        }
        size="large"
        placement="right"
        color={colors.primary}
        onPress={() => newChat()}
      />
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: "center",
    marginBottom: 20,
  },
});
