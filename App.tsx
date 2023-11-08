const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AndroidLarge1 from "./screens/Landing";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { RootNavigator } from "./Navigation/Stack";



  const App = () => {
    return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );
  };
  
export default App;
