import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Text } from "react-native-elements";

const WelcomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text h4 style={{ color: colors.text }}>
          Welcome to chatApp
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          buttonStyle={{
            backgroundColor: colors.primary,
            height: 50,
            width: 200,
            borderRadius: 30,
          }}
          onPress={() => navigation.navigate("Login")}
          title="Continue"
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textContainer: {
    marginTop: 30,
  },
  footer: {
    marginBottom: 30,
  },
});
