import React, { useState } from 'react';
import { Text, StyleSheet, Image, View, TextInput, TouchableOpacity } from 'react-native';
import { Color, FontFamily, Border, FontSize } from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';

// Import assets
import UserIcon from '../assets/images/svg/Phuserlight'; // assuming the file is without the `.tsx` extension in the import
import eyeIcon from '../assets/images/png/pheye.png';
import PasswordIcon from '../assets/images/svg/Mdipasswordoutline';
import linkedInIcon from '../assets/images/png/logoslinkedinicon.png';
import twitterIcon from '../assets/images/png/pajamastwitter.png';
import facebookIcon from '../assets/images/png/logosfacebook.png';
import GoogleIcon from '../assets/images/svg/Devicong';
import maskGroup from '../assets/images/png/logo.png';

import { RootStackParamList } from '../Navigation/Stack'; // adjust the import path

import { StackNavigationProp } from '@react-navigation/stack';
import style from '../styles/styles';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpScreen'>;

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const navigation = useNavigation<SignInScreenNavigationProp>();

  return (
    
    <View style={style.contentContainer}>
      <Image
        style={styles.logo}
        resizeMode="cover"
        source={maskGroup}
      />
      <Text style={styles.signInHeader}>Ingresar</Text>

      {/* Username/Email input */}
      <View style={styles.inputContainer}>
      <UserIcon style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Correo Electronico"
          placeholderTextColor={Color.colorGray}
        />
      </View>


      {/* Password input */}
      <View style={styles.inputContainer}>
      <PasswordIcon style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={username}
          placeholder="Contraseña"
          placeholderTextColor={Color.colorGray}
        />
        <TouchableOpacity>
          <Image style={styles.eyeIcon} resizeMode="cover" source={eyeIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Ingresar</Text>
      </TouchableOpacity>
  

      <TouchableOpacity>
        <Text style={styles.forgetPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Social Links */}
{/*       <View style={styles.socialLinksContainer}>
      <TouchableOpacity>
        <Image style={styles.socialIcon} resizeMode="cover" source={linkedInIcon} /> 
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={styles.socialIcon} resizeMode="cover" source={twitterIcon} />
      </TouchableOpacity>
      <TouchableOpacity>

        <Image style={styles.socialIcon} resizeMode="cover" source={facebookIcon} />
      </TouchableOpacity>

      <TouchableOpacity>
      <GoogleIcon style={styles.inputIcon} />
      </TouchableOpacity>
      </View> */}

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>No tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signUpButtonText}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 172,
    height: 172,
    borderRadius: 86,
    marginBottom: 20,
  },
  signInHeader: {
    fontSize: 30,
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.interBold,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFF',
    width: '90%', // Make the width relative to the parent's width
    marginBottom: 20,
    borderRadius: Border.br_mini,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10, // Add margin to separate the icon from the input
  },
  eyeIcon: {
    marginLeft: 'auto', // Pushes the icon to the end of the flex container
  },
  input: {
    flex: 1, // Takes up all available space
    paddingVertical: 10,
  },
  signInButton: {
    backgroundColor: Color.colorLightslategray,
    padding: 10,
    borderRadius: Border.br_mini,
    marginBottom: 20,
    width: '90%', // Make the width relative to the parent's width
    alignSelf: 'center', // Align button to the center horizontally
  },
  signInButtonText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.size_mini,
    textAlign: 'center',
  },
  forgetPasswordText: {
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.interBold,
    marginBottom: 20,
    alignSelf: 'center', // Align text to the center horizontally
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the icons horizontally
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10, // Add horizontal space between icons
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the sign-up prompt and button
    marginBottom: 20,
  },
  signUpText: {
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.interRegular,
  },
  signUpButtonText: {
    color: Color.colorRoyalblue,
    fontFamily: FontFamily.interBold,
  },
  // ... other styles if necessary ...
});

export default SignInScreen;
