import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "./ChatsScreen";
import SettingsScreen from "./SettingsScreen";
import { Ionicons, MaterialIcons } from "react-native-vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConversationScreen from "./ConversationScreen";
import MoreSettingsScreen from "./MoreSettingsScreen";
import NewChatScreen from "./NewChatScreen";
import ChatProfilePage from "./ChatProfilePage";

const ChatStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

const ChatNavigator = () => {
  return (
    <ChatStack.Navigator initialRouteName="Chats">
      <ChatStack.Screen name="Chats" component={ChatsScreen} />
      <ChatStack.Screen name="Conversation" component={ConversationScreen} />
      <ChatStack.Screen name="New Chat" component={NewChatScreen} />
      <ChatStack.Screen name="Profile" component={ChatProfilePage} />
    </ChatStack.Navigator>
  );
};

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen
        name="More Settings"
        component={MoreSettingsScreen}
      />
    </SettingsStack.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Chat">
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Chats",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-sharp" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingsNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
