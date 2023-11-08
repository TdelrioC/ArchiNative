import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from "../screens/Landing"

import SignUpScreen from "../screens/SingUpScreen"

import HomeScreen from '../screens/HomePage';

import NavigationScreen from '../screens/NavigationScreen';
// Define the types for your navigator's screens
export type RootStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  HomeScreen: undefined;
  NavigationScreen: undefined;
  // ...other screen params
};

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Set up the navigator with screens
export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignInScreen" component={SignInScreen}
        options={{ headerShown: false }}
        />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen}
        options={{ headerShown: false }}
        />
      <Stack.Screen name="HomeScreen" component={HomeScreen}
        options={{ headerShown: false }}
        />
      <Stack.Screen name="NavigationScreen" component={NavigationScreen}
        options={{ headerShown: false }}
        />
      {/* ...other screens */}
    </Stack.Navigator>
  );
};
