/**
 * Created by Arclin on 2018/6/5.
 */

import React from 'react';
import PropsType from 'prop-types'
import { StyleSheet, TextInput, View } from 'react-native'

export default class SearchInput extends React.Component {

    state = {
        text : '',
    };

    static propTypes = {
        onSubmit: PropsType.func.isRequired,
        placeholder: PropsType.string
    };

    static defaultProps = {
        placeholder: '',
    };

    constructor(props) {
        super(props);
    }
    render() {

        const { placeholder } = this.props;
        const { text } = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    autoCorrect={false}
                    value={ text }
                    placeholder={ placeholder }
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    clearButtonMode="always"
                    onChangeText={this.handleChangeText.bind(this)}
                    onSubmitEditing={this.handleSubmitEditing}
                />
            </View>
        );
    }

    handleChangeText = (newLocation) => {
        //console.log(newLocation);
        this.setState({text : newLocation});
        this.props.location = newLocation;
    }

    handleSubmitEditing = () => {

        console.log("is submitting");

        const { onSubmit } = this.props;
        const { text } = this.state;

        if (!text) return;

        onSubmit(text);
        this.setState({text : ""});
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 300,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textInput: {
        flex: 1,
        color: 'white'
    }
});