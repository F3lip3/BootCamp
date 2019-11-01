import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoadingBox
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func
    }).isRequired
  };

  state = {
    stars: [],
    page: 1,
    pageSize: 30,
    lastPageSize: 0,
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({
      stars: response.data,
      loading: false,
      lastPageSize: response.data.length
    });
  }

  loadMore = async () => {
    const { page, pageSize, lastPageSize, stars } = this.state;
    if (lastPageSize === pageSize) {
      const { navigation } = this.props;
      const user = navigation.getParam('user');
      const response = await api.get(
        `/users/${user.login}/starred?page=${page + 1}`
      );

      console.tron.log('more', response.data);

      this.setState({
        stars: [...stars, ...response.data],
        lastPageSize: response.data.length,
        page: page + 1
      });
    }
  };

  render() {
    const { stars, loading } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <LoadingBox>
            <ActivityIndicator size="large" />
          </LoadingBox>
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
