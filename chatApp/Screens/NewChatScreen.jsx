import { useTheme } from "@react-navigation/native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar, Text, Avatar } from "react-native-elements";
import * as Contacts from "expo-contacts";

const NewChatScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const [contactsList, setContactsList] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContactsList(
            data.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            })
          );
        }
      }
    })();
  }, []);
  const enterChat = (id, chatName) => {
    navigation.navigate("Conversation", {
      id: id,
      chatName: chatName,
    });
  };
  return (
    <View>
      <SearchBar
        placeholder="Search for People"
        showCancel={true}
        round
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
        containerStyle={{ backgroundColor: colors.card, height: 50 }}
        inputContainerStyle={{ backgroundColor: colors.background, height: 25 }}
        inputStyle={{ color: colors.text }}
      />
      <ScrollView style={{ marginBottom: 70 }}>
        {contactsList.length === 0 ? (
          <View style={{ marginTop: 30 }}>
            <ActivityIndicator color={colors.primary} size="small" />
            <Text style={{ color: colors.text, alignSelf: "center" }}>
              Fetching Contacts
            </Text>
          </View>
        ) : (
          contactsList
            .filter(
              searchInput === ""
                ? (items) => items.name
                : (items) => items.name.match(searchInput)
            )
            .map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  backgroundColor: colors.card,
                  marginTop: 20,
                  height: 70,
                  borderRadius: 20,
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => enterChat(item.id, item.name)}
              >
                <Avatar
                  rounded
                  source={{
                    uri: "https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png",
                  }}
                />
                <View style={{ marginLeft: 20, width: "80%" }}>
                  {Platform !== "ios" ? (
                    <Text
                      h4
                      style={{ color: colors.text, width: "100%" }}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  ) : (
                    <Text
                      style={{ color: colors.text, width: "100%" }}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  )}
                  <Text h5 style={{ color: colors.text }}>
                    {item.phoneNumbers &&
                      item.phoneNumbers[0] &&
                      item.phoneNumbers[0].digits}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
        )}
        {contactsList.length === 0 ? (
          <></>
        ) : (
          <Text
            style={{
              color: colors.text,
              alignSelf: "center",
              margin: 30,
              fontSize: 20,
            }}
          >
            {contactsList.length} Contacts found
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default NewChatScreen;

const styles = StyleSheet.create({});
