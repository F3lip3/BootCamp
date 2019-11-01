import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default class Repository extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func
    }).isRequired
  };

  state = {
    uri: ''
  };

  componentDidMount() {
    const { navigation } = this.props;
    const repository = navigation.getParam('repository');
    this.setState({ uri: repository.html_url });
  }

  render() {
    const { uri } = this.state;

    return <WebView source={{ uri }} style={{ flex: 1 }} />;
  }
}
