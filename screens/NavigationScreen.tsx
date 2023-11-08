import React from 'react';
import {
  View,
  Text,
  Alert,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import haversine from 'haversine';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/Stack';
import RNLocation, { Location } from 'react-native-location';

import { Color, Border } from '../styles/GlobalStyles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface State {
  location: {
    latitude: number;
    longitude: number;
    speed: number;
    heading: number;
    altitude: number;
    accuracy: number;
    altitudeAccuracy: number;
    timestamp: number;
  } | null;
  coordinates: { latitude: number; longitude: number }[];
  distanceTravelled: number;
}

export default class NavigationScreen extends React.Component<Props, State> {
  locationSubscription: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      location: null,
      coordinates: [],
      distanceTravelled: 0,
    };
  }

  componentDidMount() {

    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "fine",
        rationale: {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }
      }
    }).then(granted => {
      if (granted) {
            
        RNLocation.configure({
          distanceFilter: 1, // Meters
          desiredAccuracy: {
            ios: "best",
            android: "highAccuracy"
          },
          // Android only
          androidProvider: "auto",
          interval: 5000, // Milliseconds
          fastestInterval: 10000, // Milliseconds
          maxWaitTime: 5000, // Milliseconds
          // iOS Only
          activityType: "other",
          allowsBackgroundLocationUpdates: false,
          headingFilter: 1, // Degrees
          headingOrientation: "portrait",
          pausesLocationUpdatesAutomatically: false,
          showsBackgroundLocationIndicator: false,
          // ... other configuration options
        });


        this._startUpdatingLocation();
      }
    });


  }



  _startUpdatingLocation = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
      const location: Location & { heading?: number } = locations[0];
      console.log('Location:', this.state.location);

      if (location) {
        this.setState(prevState => {
          const newLocation = {
            latitude: location.latitude,
            longitude: location.longitude,
            speed: location.speed,
            heading: location.heading || 0, // Default value if undefined
            altitude: location.altitude,
            accuracy: location.accuracy,
            altitudeAccuracy: location.altitudeAccuracy,
            timestamp: location.timestamp,
          };
          return { location: newLocation };
        });
      }
    });
  };


  componentWillUnmount() {
    this.locationSubscription && this.locationSubscription();
    this.setState({ location: null });
  }

    

  handlePress = () => {
    // Define what happens when the icon is pressed
    console.log('Icon pressed!');
    this.props.navigation.navigate('NavigationScreen');
  }; 





  render() {
    const { location } = this.state;

    // Make sure you have defined `customStyle` somewhere in your component or have imported it.
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            // customMapStyle={customStyle} // Uncomment if `customStyle` is defined
            mapType="satellite" // This enables satellite view
            style={{ flex: 1 }}
            region={{
              latitude: this.state.location?.latitude || 0,
              longitude: this.state.location?.longitude || 0,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}>
            <Marker
              coordinate={{
                latitude: this.state.location?.latitude || 0,
                longitude: this.state.location?.longitude || 0,
              }}
            />
            <Polyline
              coordinates={this.state.coordinates}
              strokeColor="#bf8221"
              strokeColors={['#bf8221', '#ffe066', '#ffe066', '#ffe066', '#ffe066']}
              strokeWidth={3}
            />
          </MapView>
          <View style={styles.floatingButtonContainer}>
            <TouchableOpacity onPress={this.handlePress} style={styles.floatingButton}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.data}>
            <Text style={styles.dataText}>Distancia Total: {this.state.distanceTravelled.toFixed(2)} Metros</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}






const styles = StyleSheet.create({
  mapPosition: {
    width: 370,
    backgroundColor: Color.colorWhite,
    left: 22,
    position: "absolute",
    overflow: "hidden",
    justifyContent: "center",  
    cornerRadius: 50,  
  },
  data: {
    height: 95,
    backgroundColor: Color.celesteFondo,
    width: 250,
    justifyContent: "center",
    alignSelf: "center",
    position: 'absolute', // Position absolutely
    bottom: 20, // 20 pixels from the bottom
    left: '50%', // 50% from the left
    transform: [{ translateX: -125 }], // Center the element by shifting it left by half its width
    borderRadius: Border.br_mini,
  },
  dataText: {
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },

  fullScreen: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // This style helps the map to fill the entire space
  },
  floatingButtonContainer: {
    position: 'absolute', // The container is still absolutely positioned
    flex: 1, // Enables flexbox properties within the container
  },
  floatingButton: {
    backgroundColor: 'black',
    width: 56, // Width and height define the size of the button
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 15,
    marginTop: 15,
    
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    // ... other text styles ...
  },

});


const customStyle = [
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6195a0',
        },
      ],
    },
    {
      featureType: 'administrative.province',
      elementType: 'geometry.stroke',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          lightness: '0',
        },
        {
          saturation: '0',
        },
        {
          color: '#f5f5f2',
        },
        {
          gamma: '1',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'all',
      stylers: [
        {
          lightness: '-3',
        },
        {
          gamma: '1.00',
        },
      ],
    },
    {
      featureType: 'landscape.natural.terrain',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#bae5ce',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#fac9a9',
        },
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text',
      stylers: [
        {
          color: '#4e4e4e',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#787878',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'transit.station.airport',
      elementType: 'labels.icon',
      stylers: [
        {
          hue: '#0a00ff',
        },
        {
          saturation: '-77',
        },
        {
          gamma: '0.57',
        },
        {
          lightness: '0',
        },
      ],
    },
    {
      featureType: 'transit.station.rail',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#43321e',
        },
      ],
    },
    {
      featureType: 'transit.station.rail',
      elementType: 'labels.icon',
      stylers: [
        {
          hue: '#ff6c00',
        },
        {
          lightness: '4',
        },
        {
          gamma: '0.75',
        },
        {
          saturation: '-68',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#eaf6f8',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#c7eced',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          lightness: '-49',
        },
        {
          saturation: '-53',
        },
        {
          gamma: '0.79',
        },
      ],
    },
  ];
  
  
