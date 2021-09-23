import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from "react-native";
import { Avatar, Input, Button, Text } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Contacts from "expo-contacts";
import * as Location from "expo-location";

const LoginProfileDetailsScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
  });

  const { colors } = useTheme();
  const [name, setName] = useState("");
  const SubmitUser = () => {
    navigation.replace("App");
  };

  const gotoSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else if (Platform.OS === "android") {
      Linking.openSettings();
    }
  };

  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const permission = await Contacts.getPermissionsAsync();
      if (permission.granted === false) {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Contacts Permission Requried",
            "Sorry, we need contacts permissions to find and send messages to people!",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Go to Settings",
                onPress: () => gotoSettings(),
              },
            ]
          );
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Requried",
          "Sorry, we need Location permissions to send your location in case of emergency messages to your contact!",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Go to Settings",
              onPress: () => gotoSettings(),
            },
          ]
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <Text
        h4
        style={{
          color: colors.text,
          marginTop: 10,
          marginBottom: 10,
          alignSelf: "flex-start",
        }}
      >
        Select Profile Image:
      </Text>
      <TouchableOpacity onPress={() => pickImage()}>
        <Avatar
          rounded
          size="xlarge"
          source={{
            uri:
              image ||
              "https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png",
          }}
        />
      </TouchableOpacity>
      <Text
        h4
        style={{
          color: colors.text,
          marginTop: 10,
          marginBottom: 10,
          alignSelf: "flex-start",
        }}
      >
        Enter Profile Name:
      </Text>
      <Input
        placeholder="Enter Your Name"
        inputStyle={{ color: colors.text }}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button
        disabled={name === ""}
        title="Submit"
        onPress={SubmitUser}
        buttonStyle={{
          backgroundColor: colors.primary,
          height: 50,
          width: 200,
          borderRadius: 30,
        }}
      />
    </View>
  );
};

export default LoginProfileDetailsScreen;
