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
      getParam: PropTypes.func,
      navigate: PropTypes.func
    }).isRequired
  };

  state = {
    stars: [],
    page: 1,
    pageSize: 30,
    lastPageSize: 0,
    loading: false,
    refreshing: false
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

  handleNavigate = repository => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repository });
  };

  loadMore = async () => {
    const { page, pageSize, lastPageSize, stars } = this.state;
    if (lastPageSize === pageSize || page === 0) {
      const { navigation } = this.props;
      const user = navigation.getParam('user');
      const response = await api.get(
        `/users/${user.login}/starred?page=${page + 1}`
      );

      this.setState({
        stars: page === 0 ? response.data : [...stars, ...response.data],
        lastPageSize: response.data.length,
        page: page + 1,
        refreshing: false
      });
    }
  };

  refreshList = async () => {
    await this.setState({
      page: 0,
      refreshing: true
    });

    await this.loadMore();
  };

  render() {
    const { stars, loading, refreshing } = this.state;
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
            refreshing={refreshing}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
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
