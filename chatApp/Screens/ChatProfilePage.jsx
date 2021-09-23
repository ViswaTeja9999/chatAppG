import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as Contacts from "expo-contacts";
import { useState } from "react";
import { Avatar, Text, Divider, Switch } from "react-native-elements";

const ChatProfilePage = ({ route }) => {
  const { colors } = useTheme();
  const [userDetails, setUserDetails] = useState("");
  const [seceretChat, setSeceretChat] = useState(false);
  useEffect(() => {
    (async () => {
      const contact = await Contacts.getContactByIdAsync(route.params.id);
      if (contact) {
        setUserDetails(contact);
      }
    })();
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Avatar
          size="xlarge"
          rounded
          source={{
            uri: "https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png",
          }}
        />
        <Text style={{ color: colors.text, alignSelf: "flex-start" }}>
          Details
        </Text>
        <View
          style={{
            backgroundColor: colors.card,
            width: "100%",
            marginTop: 10,
            marginBottom: 10,
            minHeight: 90,
            maxHeight: "100%",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: colors.text, padding: 5 }}>Contact Name</Text>
          <Text h4 style={{ color: colors.text, padding: 5 }}>
            {userDetails.name}
          </Text>
          <Divider />
          <Text style={{ color: colors.text, padding: 5 }}>Phone Number</Text>
          <Text h4 style={{ color: colors.text, padding: 5 }}>
            {userDetails &&
              userDetails.phoneNumbers &&
              userDetails.phoneNumbers[0].digits}
          </Text>
          {userDetails &&
          userDetails.addresses &&
          userDetails.addresses[0].country ? (
            <View>
              <Divider />
              <Text style={{ color: colors.text, padding: 5 }}>Country</Text>
              <Text h4 style={{ color: colors.text, padding: 5 }}>
                {userDetails &&
                  userDetails.addresses &&
                  userDetails.addresses[0].country}
              </Text>
            </View>
          ) : (
            <></>
          )}

          {userDetails && userDetails.birthday ? (
            <View>
              <Divider />
              <Text style={{ color: colors.text, padding: 5 }}>
                Date of Birth
              </Text>
              <Text h4 style={{ color: colors.text, padding: 5 }}>
                {userDetails.birthday.day}-{userDetails.birthday.month}-
                {userDetails.birthday.year}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
        <Text style={{ color: colors.text, alignSelf: "flex-start" }}>
          Settings
        </Text>
      </View>
      <View
        style={{
          backgroundColor: colors.card,
          height: 70,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text h4 style={{ color: colors.text }}>
          Enable Seceret Chat
        </Text>
        <Switch
          value={seceretChat}
          onValueChange={() => setSeceretChat(!seceretChat)}
          color={colors.primary}
        />
      </View>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: colors.card,
            height: 70,
            borderRadius: 20,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <Text h4 style={{ color: "red" }}>
            Clear Chat
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: colors.card,
            height: 70,
            borderRadius: 20,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <Text h4 style={{ color: "red" }}>
            Block Contact
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChatProfilePage;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
  },
  notificationContainer: {
    margin: 10,
  },
});
