import React from "react";
import { StyleSheet, View } from "react-native";
import CustomListItem from "../Components/CustomListItem";

const SettingsScreen = ({ navigation }) => {
  const settingsList = [
    {
      id: "1",
      name: "Account",
      icon: "person-circle",
      type: "ionicon",
    },
    {
      id: "2",
      name: "Chats",
      icon: "chatbox",
      type: "ionicon",
    },
    {
      id: "3",
      name: "Notifications",
      icon: "notifications",
      type: "ionicon",
    },
    {
      id: "4",
      name: "Privacy",
      icon: "security",
      type: "material-icons",
    },
    {
      id: "5",
      name: "Logout",
      icon: "exit",
      type: "ionicon",
    },
  ];
  const enterSettings = (id, settingsName) => {
    navigation.navigate("More Settings", {
      id: id,
      settingsName: settingsName,
    });
  };
  return (
    <View style={styles.container}>
      {settingsList.map((item) => (
        <View key={item.id} style={styles.settingsContainer}>
          <CustomListItem
            name={item.name}
            icon={item.icon}
            type={item.type}
            enterSettings={enterSettings}
          />
        </View>
      ))}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  settingsContainer: {
    marginTop: 20,
    width: "95%",
  },
});
