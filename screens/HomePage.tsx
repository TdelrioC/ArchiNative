import * as React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Color, Border, FontFamily } from "../styles/GlobalStyles";
import DogWalkingIcon from "../assets/images/svg/DogWalkingIcon";

import { useNavigation } from "@react-navigation/native";

import style from "../styles/styles";

import { RootStackParamList } from "../Navigation/Stack"; // adjust the import path
import { StackNavigationProp } from "@react-navigation/stack";
type NavigationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NavigationScreen'>;

const HomeScreen = () => {

  const navigation = useNavigation<NavigationScreenNavigationProp>(); // Hook to get the navigation prop

  const handlePress = () => {

    // Define what happens when the icon is pressed
    console.log('DogWalkingIcon pressed!');
    navigation.navigate('NavigationScreen');

    // You can navigate to a different screen or trigger any action here
  };


  return (
    
<View style={[styles.homescreen, style.mainContainer]}>
  <View style={[styles.sideBar, styles.sideBarLayout]}>
    {/* Other sidebar content can go here */}
    <View style={styles.iconBox}>
      <TouchableOpacity onPress={handlePress}>
        <DogWalkingIcon
          style={styles.homescreenChild}
          resizeMode="cover"
          source={DogWalkingIcon}
        />
      </TouchableOpacity>
    </View>
  </View>
  <Text style={styles.welcomeText}>{`BIENVENIDO {USERNAME}`}</Text>
  {/* ... rest of your layout ... */}
</View>
  );

};

const styles = StyleSheet.create({

  dataLayout: {
    height: 117,
    width: 300,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_8xs,
    left: 50,
    position: "absolute",
    overflow: "hidden",
  },
  sideBar: {
    flex: 1,
  },
  sideBarLayout: {
    top: 0,
    left: 0,
    borderTopRightRadius: Border.br_3xs,
    borderBottomRightRadius: Border.br_3xs,
    backgroundColor: "#2a4b9e",
    width: 55,
    position: "absolute",
    overflow: "hidden",
    height: "100%",
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically (optional)
  },

  iconBox: {
    // Style for the box that contains the icon
    width: 45, // Set width and height for the box
    height: 45,
    backgroundColor: "#ffffff", // Background color for the box
    borderRadius: 10, // If you want rounded corners for the box
    justifyContent: 'center', // Center the icon vertically within the box
    alignItems: 'center', // Center the icon horizontally within the box
    // Add shadow or any other styling as needed
    position: 'absolute',
    flex: 1,
    zIndex: 1,
  },
  homescreenChildLayout: {
    height: 35,
    width: 35,
    left: 9,
    borderRadius: Border.br_3xs,
    position: "absolute",
    overflow: "hidden",
  },
  sideBarHidden: {
    top: 0,
    left: 0,
    borderTopRightRadius: Border.br_3xs,
    borderBottomRightRadius: Border.br_3xs,
    backgroundColor: "#2a4b9e",
    width: 55,
    position: "absolute",
    overflow: "hidden",
    height: "100%"
  },
  welcomeText: {
    marginLeft: -89,
    top: 37,
    left: "50%",
    fontSize: 20,
    fontFamily: FontFamily.interRegular,
    color: "#210ab2",
    textAlign: "center",
    width: 177,
    height: 81,
    position: "absolute",
  },
  mypets: {
    top: 88,
  },
  data: {
    top: 288,
  },
  articles: {
    top: 488,
  },
  main: {
    top: 96,
    left: 55,
    width: 305,
    height: 704,
    position: "absolute",
    overflow: "hidden",
  },
  homescreenChild: {
    height: 35,
    width: 35,
    borderRadius: Border.br_3xs,
    zIndex: 2,
    // Remove position-related styles if they are not necessary anymore
  },
  homescreenItem: {
    top: 265,
  },
  homescreenInner: {
    top: 433,
  },
  frameIcon: {
    top: 517,
  },
  homescreenChild1: {
    top: 352,
  },
  homescreen: {
    backgroundColor: "#d1dee4",
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
});

export default HomeScreen;
