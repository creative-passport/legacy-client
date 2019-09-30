import React from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Text,
    TouchableHighlight,
    AsyncStorage,
    ActivityIndicator,
    Linking
} from 'react-native';

import QRCode from 'react-native-qrcode';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            message: '',
            fullName: '',
            email: '',
            error: '',
            text: 'mycelia:id:address',
        }
    }

    static navigationOptions = { // A
        title: 'Home',
    };

    _retrieveName = async () => {
        console.log('_retrieveName Called');
        try {
            const fullName = await AsyncStorage.getItem('name');
            if (fullName !== null) {
                // We have data!!
                console.log('FULL NAME: ' + fullName);
                this.setState({
                    isLoading: false,
                    fullName: fullName,
                });
                //return fullName;
            } else {
                console.log('FULL NAME: BLANK');
                this.setState({
                    isLoading: false,
                });
            }
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
            this.setState({
                error: error,
            });
        }
    }

    componentDidMount() { // B
        this._retrieveName();
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
        }
    }

    componentWillUnmount() { // C
        Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL = (event) => { // D
        this.navigate(event.url);
    }
    navigate = (url) => { // E
        const {
            navigate
        } = this.props.navigation;
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];
        console.log("Route Name: " + routeName);
        if (routeName === 'confirm') {
            navigate('ConfirmedEmail', {
                id
            })
        };
    }

    _startSignUp() {
        const {
            navigate
        } = this.props.navigation;
        navigate('Signup', {})
    }

    _scanPassport() {
        const {
            navigate
        } = this.props.navigation;
        navigate('QRScan', {})
    }

    _removeUser() {
        // Remove the user details from this device

    }

    _bigQR() {
        // Make the QRCode bigger
    }
    
    render() {
        //this._retrieveName();
        const { fullName } = this.state;

        console.log(fullName);
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Creative Passport</Text>
                { fullName == ''
                ? <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress = { () => this._startSignUp() } >
                    <Text style={styles.signUpText}>Sign up</Text> 
                </TouchableHighlight>
                : <React.Fragment>
                    <Text style={styles.description}>{fullName}</Text>
                    <TouchableHighlight style={styles.qrcodesmall} onPress={ () => this._bigQR() }>
                    <QRCode
                        value = {
                            this.state.text
                        }
                        size = {
                            200
                        }
                        bgColor = 'purple'
                        fgColor = 'white' />
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress = { () => this._scanPassport() }>
                        <Text style={styles.signUpText}>Scan A Passport</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.buttonContainer, styles.removeuserButton]} onPress = { () => this._removeUser() }>
                        <Text style={styles.removeuserText}>Remove This User</Text>
                    </TouchableHighlight>
                </React.Fragment>
                } 
            </View>
        )
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#201f1b',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "#e6c301",
    },
    removeuserButton: {
        backgroundColor: 'red',
    },
    removeuserText: {
        color: 'black',
    },
    signUpText: {
        color: 'black',
    },
    description: {
        marginBottom: 20,
        fontSize: 26,
        textAlign: 'center',
        color: '#e6c301'
    },
    qrcodesmall: {
        padding: 10,
    }
});