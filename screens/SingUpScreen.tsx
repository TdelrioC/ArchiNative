import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  
} from 'react-native';
import { Color, FontFamily, Border, FontSize } from '../styles/GlobalStyles';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/Stack';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
import style from '../styles/styles';




const SignUpScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setphoneNumber] = React.useState('');



  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    // Corrected function name here
    setAllFieldsFilled(password !== '' && email !== '' && name !== '' && lastName !== '');
  }, [password, email, name, lastName]);

   // Function to handle the sign-up process
   const handleSignUp = async () => {

  // Detailed logs to see exactly what's in each variable
  console.log('Password:', `"${password}"`);
  console.log('Email:', `"${email}"`);
  console.log('Name:', `"${name}"`);
  console.log('Last Name:', `"${lastName}"`);
  
  // Check each field individually

  if (!password.trim()) {
    return Alert.alert("Error", "Password is empty.");
  }
  if (!email.trim()) {
    return Alert.alert("Error", "Email is empty.");
  }
  if (!name.trim()) {
    return Alert.alert("Error", "Name is empty.");
  }
  if (!lastName.trim()) {
    return Alert.alert("Error", "Last name is empty.");
  }

    if ( password && email && name && lastName) {
      try {
        // Replace 'http://yourapiendpoint.com/signup' with your actual FastAPI endpoint
        const response = await fetch('http://10.0.2.2:8000/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: password,
            email: email,
            name: name,
            last_name: lastName,
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Handle the response data e.g. navigate to a new screen or show a success message
          Alert.alert("Success", "You have been registered successfully!");
        } else {
          // Handle any errors returned from your API
          Alert.alert("Error", data.detail || "An error occurred during sign up.");
        }
      } catch (error) {
        // Handle network errors or unexpected issues
        Alert.alert("Error", "Could not connect to the server.");
        console.log(error)
      }
    } else {
      // Alert if not all fields are filled
      Alert.alert("Error", "Please fill in all fields.");
    }
  };
  
  return (
    
    <ScrollView contentContainerStyle={style.contentContainer} style={style.mainContainer}>
      <Image
        style={styles.logo}
        resizeMode="cover"
        source={require("../assets/images/png/logo.png")}
      />
      <Text style={styles.header}>Registrarse</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor={Color.colorDarkslategray}
          onChangeText={setName}
          value={name}
  
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor={Color.colorDarkslategray}
          onChangeText={setLastName}
          value={lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor={Color.colorDarkslategray}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Numero de telefono"
          placeholderTextColor={Color.colorDarkslategray}
          onChangeText={setphoneNumber}
          value={phoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={Color.colorDarkslategray}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('HomeScreen')}>        
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({

  logo: {
    alignSelf: 'center', // aligns the logo to the center of its container
    marginVertical: 20,
    width: 172,
    height: 172,
    borderRadius: 86, // Makes it a perfect circle
  },
  header: {
    fontSize: 30,
    color: "#153047",
    fontFamily: FontFamily.interBold,
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: Color.colorLightslategray,
    borderRadius: Border.br_mini,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_sm,
    marginBottom: 20,
    width: '100%', // Set a relative width instead of a fixed one
    textAlign: 'left',
    
    
  },
  button: {
    backgroundColor: Color.colorLightslategray,
    borderRadius: Border.br_mini,
    paddingVertical: 10, // Use paddingVertical for padding the top and bottom
    paddingHorizontal: 20, // Use paddingHorizontal to define padding on the sides
    alignItems: 'center', // Centers the text horizontally
    justifyContent: 'center', // Centers the text vertically
    height: 45,
    marginBottom: 20,
    marginTop: 60,
    width: '70%', // Set a relative width instead of a fixed one
    alignSelf: 'center',
     // Center the button in its parent container
  },
  buttonText: {
    color: '#fff',
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.size_md,
  },
  // Assuming you want to apply flexbox to a disabled button as well, although it's not being used above
  buttonDisabled: {
    // ...same styles as 'button' with different backgroundColor...
    backgroundColor: Color.colorDarkslategray,
  },

});

export default SignUpScreen;
