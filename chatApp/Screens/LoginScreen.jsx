import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import axios from "axios";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Input, Button } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [OTP, setOTP] = useState("");
  const [showOTP, setshowOTP] = useState(false);
  const countries = ["India", "United States"];
  const onLogin = () => {
    Keyboard.dismiss();
    switch (country) {
      case "India": {
        var code = "+91";
        break;
      }
      case "United States": {
        var code = "+1";
        break;
      }
      default: {
        var code = null;
      }
    }
    var finalNumber = code + phoneNumber;
    Alert.alert(
      "Confirm Phone Number",
      `The Number you entered is ${finalNumber}.Are you sure You want to continue.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Continue", onPress: () => sendOtp() },
      ]
    );
  };
  const sendOtp = () => {
    setshowOTP(true);
    var phone_number = phoneNumber;
    const res = axios.post(`http://localhost:5000/api/users/register`, {
      phone_number,
    });
  };
  const verifyOtp = () => {
    var phone_number = phoneNumber;
    var otp = OTP;
    const res = axios.post(`http://localhost:5000/api/users/verify/signin`, {
      otp,
      phone_number,
    });
    console.log(res);
    navigation.navigate("Profile Details");
  };
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Text
            h3
            style={{ color: colors.text, marginTop: 10, marginBottom: 10 }}
          >
            Enter Your Details:
          </Text>
          <Text h4 style={{ color: colors.text, marginTop: 10 }}>
            Select your Country:
          </Text>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem) => {
              setCountry(selectedItem);
            }}
            defaultButtonText="Select Your Country"
            buttonStyle={{
              backgroundColor: colors.primary,
              width: "90%",
              marginBottom: 10,
              marginTop: 5,
              borderRadius: 10,
              alignSelf: "center",
            }}
            buttonTextStyle={{ color: colors.text }}
            renderDropdownIcon={() => (
              <>
                <AntDesign name="down" size={24} color={colors.text} />
              </>
            )}
            rowStyle={{ backgroundColor: colors.card }}
            rowTextStyle={{ color: colors.text }}
            dropdownStyle={{ borderRadius: 5 }}
          />
          <Text h4 style={{ color: colors.text, marginTop: 10 }}>
            Enter Your Phone Number:
          </Text>
          <Input
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            inputStyle={{ color: colors.text, marginTop: 5, marginBottom: 10 }}
            keyboardType="number-pad"
          />
          {showOTP === true ? (
            <View>
              <Text h4 style={{ color: colors.text, marginTop: 10 }}>
                Enter One Time Password:
              </Text>
              <OTPInputView
                style={{ width: "90%", height: 100, alignSelf: "center" }}
                pinCount={6}
                codeInputFieldStyle={{
                  width: 50,
                  height: 35,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  alignSelf: "center",
                  borderColor: colors.text,
                  fontSize: 30,
                }}
                codeInputHighlightStyle={{ borderColor: colors.primary }}
                onCodeFilled={(code) => {
                  setOTP(code);
                }}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.footer}>
        {showOTP === false ? (
          <Button
            disabled={country != "" && phoneNumber.length === 10 ? false : true}
            buttonStyle={{
              backgroundColor: colors.primary,
              height: 50,
              width: 200,
              borderRadius: 30,
            }}
            title="Login"
            onPress={onLogin}
            disabledStyle={styles.buttonDisabled}
            disabledTitleStyle={{ color: colors.text }}
          />
        ) : (
          <View>
            <Button
              disabled={OTP != "" && OTP.length === 6 ? false : true}
              buttonStyle={{
                backgroundColor: colors.primary,
                height: 50,
                width: 200,
                borderRadius: 30,
              }}
              title="Verify"
              onPress={verifyOtp}
              disabledStyle={styles.buttonDisabled}
              disabledTitleStyle={{ color: colors.text }}
            />
            <Button
              buttonStyle={{
                height: 50,
                width: 200,
                borderRadius: 30,
              }}
              title="Retry"
              onPress={sendOtp}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonDisabled: {},
  footer: {
    alignItems: "center",
  },
});
