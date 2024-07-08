import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import AuthButton from "../../../components/AuthButton";
import { theme } from "../../../infrastructure/theme";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  lowercaseRegex,
  numberRegex,
  symbolRegex,
  uppercaseRegex,
} from "../../../components/InputAuthentications";
import PhoneInput from "react-native-phone-input";
import { signupStyles } from "./Styles/signupScreen.styles.js";
import { UserContext } from "../../../services/user/UserContext";
import axios from "axios";
import Loader from "../../../components/Loader";
import SignUpSuccessModal from "../../../components/Modals/SignUpSuccessModal";
import SignUpFailedModal from "../../../components/Modals/SignUpFailedModal";

const googleIconJsx = () => {
  return (
    <Text
      style={{
        color: theme.colors.text.primary,
        fontFamily: theme.fonts.bold,
        fontSize: hp(2),
        fontWeight: "600",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require("../../../assets/devicon_google.png")} />
      Sign up with Google
    </Text>
  );
};
const AuthInput = styled(View)`
  position: relative;
  width: 95%;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const SignUpStyle = styled(View)`
  flex: 1;
  padding: 20px;
  align-items: start;
`;
const passwordInputStyle = {
  marginLeft: hp(1),
  fontSize: hp(1.6),
  color: theme.colors.text.secondary,
  fontFamily: theme.fonts.heading,
};
const inputErrorStyles = {
  textAlign: "left",
  width: wp(90),
  color: theme.colors.text.error,
  fontFamily: theme.fonts.heading,
  paddingTop: hp(1),
  fontSize: hp(1.4),
};

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [conditionsMet, setConditionsMet] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cPasswordError, setCpasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const hasUpper = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasSymbol = symbolRegex.test(password);

  const lengthValid = password.length < 8;
  const emailIsValid = email.includes("@");

  const [showPassword, setShowPassword] = useState(true);
  const [showCpassword, setShowCpassword] = useState(true);

  const [signUpSuccessModalVisible, setSignUpSuccessModalVisible] =
    useState(false);
  const [signUpFailedModalVisible, setSignUpFailedModalVisible] =
    useState(false);

  const { userDetails, setDetails } = useContext(UserContext);

  const handleSignup = () => {
    navigation.navigate("SignUpSuccess");
    console.log("sign up");
  };
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    const updatedUserDetails = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      phone_no: phoneNo,
    };
    setDetails(updatedUserDetails);
  }, [password, email, firstName, lastName, phoneNo]);

  const firstNameHandler = (fname) => {
    setFirstName(fname);
  };
  const lastNameHandler = (lname) => {
    setLastName(lname);
  };
  const emailChangeHandler = (mail) => {
    setEmail(mail);
  };
  const passwordChangeHandler = (pass) => {
    setPassword(pass);
  };
  const phoneNoChangeHandler = (phone) => {
    setPhoneNo(phone);
  };

  useEffect(() => {
    // Check email validity
    if (email.length === 0) {
      setEmailError("");
    } else if (!emailIsValid) {
      setEmailError("email must include '@' symbol");
    } else {
      setEmailError("");
    }

    // Check password validity
    if (password.length === 0) {
      setPasswordError("");
    } else if (lengthValid) {
      setPasswordError("password must be at least 8 characters long");
    } else if (!hasUpper) {
      setPasswordError("password must include at least one uppercase letter");
    } else if (!hasLowercase) {
      setPasswordError("password must include at least one lowercase letter");
    } else if (!hasNumber) {
      setPasswordError("password must contain at least one number");
    } else if (!hasSymbol) {
      setPasswordError("password must contain at least one symbol");
    } else {
      setPasswordError("");
    }

    if (cpassword.length === 0) {
      setCpasswordError("");
    } else if (cpassword !== password) {
      setCpasswordError("passwords do not match");
    } else {
      setCpasswordError("");
    }

    // Update conditionsMet based on errors
    setConditionsMet(
      emailIsValid &&
        !lengthValid &&
        hasUpper &&
        hasLowercase &&
        hasNumber &&
        hasSymbol
    );
  }, [password, email, cpassword]);

  const handleOtp = async () => {
    !conditionsMet && Alert.alert("Please fill in your details");
    setIsLoading(true);

    const url =
      "http://possible-gar-partially.ngrok-free.app/api/auth/register/";
    try {
      const response = await axios.post(
        url,
        { ...userDetails },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data sent successfully! Response:", response);
      response.data.user && setSignUpSuccessModalVisible(true);

      setTimeout(() => {
        setSignUpSuccessModalVisible(false);
      }, 2000);
      response.data.user.created
        ? navigation.navigate("SignUpSuccess")
        : console.log("Sign Up Failed");
    } catch (error) {
      setSignUpFailedModalVisible(true);
      setTimeout(() => {
        setSignUpFailedModalVisible(false);
      }, 2000);
      console.error("Error sending data:", error);
    } finally {
      setIsLoading(false);
    }

    // conditionsMet && navigation.navigate("otp");
    // setName("")
    // setEmail("")
    // setPhoneNo("")
    // setPassword("")
    // setCpassword("")
    //send otp
  };
  const handleCloseSuccessModal = () => {
    setSignUpSuccessModalVisible(false);
  };

  const handleCloseFailedModal = () => {
    setSignUpFailedModalVisible(false);
  };
  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loader />
    </View>
  ) : (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={signupStyles.container}
    >
      <ScrollView>
        <SignUpStyle>
          <SignUpSuccessModal
            isVisible={signUpSuccessModalVisible}
            onClose={handleCloseSuccessModal}
          />
          <SignUpFailedModal
            isVisible={signUpFailedModalVisible}
            onClose={handleCloseFailedModal}
          />
          <View style={signupStyles.intro}>
            <Text style={signupStyles.welcome}>Create an account</Text>
            <Text style={signupStyles.subWelcome}>Let’s get you started</Text>
          </View>
          <View style={signupStyles.form}>
            {/* first name */}
            <AuthInput>
              <View>
                <Text style={signupStyles.authTextLabel}>First Name</Text>
                <TextInput
                  style={signupStyles.authTextInput}
                  onChangeText={firstNameHandler}
                  value={firstName}
                />
              </View>
              <Text style={inputErrorStyles}></Text>
            </AuthInput>
            {/* last name */}
            <AuthInput>
              <View>
                <Text style={signupStyles.authTextLabel}>Last Name</Text>
                <TextInput
                  style={signupStyles.authTextInput}
                  onChangeText={lastNameHandler}
                  value={lastName}
                />
              </View>
              <Text style={inputErrorStyles}></Text>
            </AuthInput>
            {/* email */}
            <AuthInput>
              <View>
                <Text style={signupStyles.authTextLabel}>Email</Text>
                <TextInput
                  keyboardType="email-address"
                  style={signupStyles.authTextInput}
                  onChangeText={emailChangeHandler}
                  value={email}
                />
              </View>
              <Text style={inputErrorStyles}>{emailError}</Text>
            </AuthInput>
            {/* phone number */}
            <AuthInput>
              <View>
                <Text style={signupStyles.authTextLabel}>Phone Number</Text>
                <PhoneInput
                  // value={phoneNo}
                  autoFormat={true}
                  initialCountry={"us"}
                  initialValue="234"
                  textProps={{
                    placeholder: "Enter a phone number...",
                  }}
                  style={{
                    width: wp(90),
                    height: hp(3.5),
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.text.foundation,
                  }}
                  textStyle={{
                    fontSize: hp(2),
                    fontFamily: theme.fonts.medium,
                    height: hp(3.5),
                    padding: 0,
                    margin: 0,
                  }}
                  flagStyle={{
                    display: "none",
                  }}
                  onChangePhoneNumber={phoneNoChangeHandler}
                />
              </View>
              <Text style={inputErrorStyles}></Text>
            </AuthInput>
            {/* password */}
            <AuthInput style={{ marginTop: hp(1) }}>
              <View>
                <Text style={signupStyles.authTextLabel}>Password</Text>
                <View style={signupStyles.authPassword}>
                  <TextInput
                    secureTextEntry={showPassword}
                    style={signupStyles.authTextInputP}
                    onChangeText={passwordChangeHandler}
                    value={password}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={passwordInputStyle}>Show</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={inputErrorStyles}>{passwordError}</Text>
            </AuthInput>
            {/* confirm password */}
            <AuthInput style={{ marginTop: hp(1), marginBottom: 20 }}>
              <View>
                <Text style={signupStyles.authTextLabel}>Confirm Password</Text>
                <View style={signupStyles.authPassword}>
                  <TextInput
                    secureTextEntry={showCpassword}
                    style={signupStyles.authTextInputP}
                    onChangeText={(newcPassword) => setCpassword(newcPassword)}
                    value={cpassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowCpassword(!showCpassword)}
                  >
                    <Text style={passwordInputStyle}>Show</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={inputErrorStyles}>{cPasswordError}</Text>
            </AuthInput>
          </View>
          {/* Sign Up  Handler */}
          <View style={signupStyles.mt}>
            <AuthButton
              handleAction={handleOtp}
              title="Sign Up"
              backgroundColor={theme.colors.bg.primary}
              color={theme.colors.text.white}
            />
          </View>
          <View style={signupStyles.or}>
            <Image
              style={signupStyles.dashLine}
              source={require("../../../assets/dashedLine.png")}
            />
            <Text style={signupStyles.ortext}>OR</Text>
            <Image
              style={signupStyles.dashLine}
              source={require("../../../assets/dashedLine.png")}
            />
          </View>
          {/* Sign Up with google handler */}
          <View style={signupStyles.mt}>
            <AuthButton
              handleAction={handleSignup}
              title={googleIconJsx}
              backgroundColor={theme.colors.bg.white}
              color={theme.colors.text.primary}
              borderWidth={2}
              borderColor={theme.colors.bg.secondary}
            />
          </View>
          <View style={signupStyles.forgotPassword}>
            <Text style={signupStyles.signup}>
              Already have an account?
              <Text onPress={handleLogin} style={signupStyles.signupLink}>
                LOG IN
              </Text>
            </Text>
          </View>
        </SignUpStyle>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
