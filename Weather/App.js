import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    KeyboardAvoidingView,
    ImageBackground,
    ActivityIndicator,
    StatusBar
} from 'react-native';

import { fetchLocationId , fetchWeather } from './utils/api'
import getImageForWeather from './utils/getImageForWeather'
import SearchInput from './components/SearchInput';

export default class App extends React.Component {

    state = {
        loading : false,
        error : false,
        location: '',
        temperature: 0,
        weather: '',
    };

    constructor(props) {
        super(props);
    }

    render() {

        const { loading, error, location, weather, temperature } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle="light-content" />
                <ImageBackground
                    source={getImageForWeather(weather)}
                    style={styles.imageContainer}
                    imageStyle={styles.image}>
                    <View style={styles.detailsContainer}>
                        <ActivityIndicator animating={loading} color="white" size="large" />
                        {!loading && (
                            <View>
                                {error && (
                                    <Text style={[styles.smallText,styles.textStyle]}>
                                        Could not load weather, please try a different city.
                                    </Text>
                                )}

                                {!error && (
                                    <View>
                                        <Text style={[styles.largeText,styles.textStyle]}>{location}</Text>
                                        <Text style={[styles.smallText,styles.textStyle]}>{weather}</Text>
                                        <Text style={[styles.largeText,styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
                                    </View>
                                )}
                            </View>
                        )}

                        <SearchInput
                            placeholder="Search any city"
                            onSubmit={this.handleUpdateLocation}
                        />
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }

    handleUpdateLocation = async city => {
        if (!city) return;

        this.setState({loading : true}, async() => {
           try {
               const locationId = await fetchLocationId(city);
               const {location, weather, temperature } = await fetchWeather(locationId);

               this.setState({
                  loading : false,
                   error : false,
                   location,
                   weather,
                   temperature,
               });
           } catch (e) {
               this.setState({
                  loading: false,
                   error : true,
               });
           }
        });
        console.log('receive callback' + " : " + city);
        this.setState({
           location : city,
        });
    };

}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 20,
    },
    textStyle: {
        textAlign: 'center',
        color:'#fff',
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    },
    largeText: {
        fontSize: 44,
    },
    smallText: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput : {
        backgroundColor: '#666',
        color:'white',
        height:40,
        width:300,
        marginTop:20,
        marginHorizontal:20,
        paddingHorizontal:10,
        alignSelf:'center',
    }
});
