import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueState,
  IssueList,
  Paging,
  Button
} from './styles';

class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    issuesState: 'open',
    issuesPage: 1,
    issuesPageSize: 5,
    loading: true
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { issuesState, issuesPage, issuesPageSize } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: issuesState,
          per_page: issuesPageSize,
          page: issuesPage
        }
      })
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    });
  }

  handleStateChange = async e => {
    const { issuesState } = this.state;
    if (issuesState !== e.target.value) {
      await this.setState({ issuesState: e.target.value, issuesPage: 1 });
      await this.loadIssues();
    }
  };

  handlePreviousPage = async () => {
    const { issuesPage } = this.state;
    if (issuesPage > 1) {
      await this.setState({ issuesPage: issuesPage - 1 });
      await this.loadIssues();
    }
  };

  handleNextPage = async () => {
    const { issues, issuesPage, issuesPageSize } = this.state;
    if (issues.length === issuesPageSize) {
      await this.setState({ issuesPage: issuesPage + 1 });
      await this.loadIssues();
    }
  };

  loadIssues = async () => {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { issuesState, issuesPage, issuesPageSize } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issuesState,
        per_page: issuesPageSize,
        page: issuesPage
      }
    });

    this.setState({
      issues: issues.data
    });
  };

  render() {
    const {
      repository,
      issues,
      issuesState,
      issuesPage,
      issuesPageSize,
      loading
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <IssueState>
            <select onChange={this.handleStateChange} value={issuesState}>
              <option value="all">all</option>
              <option value="open">open</option>
              <option value="closed">closed</option>
            </select>
          </IssueState>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <Paging>
            <Button
              type="button"
              disabled={issuesPage === 1 ? 1 : 0}
              onClick={this.handlePreviousPage}
            >
              Anterior
            </Button>
            <Button
              type="button"
              disabled={issues.length < issuesPageSize ? 1 : 0}
              onClick={this.handleNextPage}
            >
              Próxima
            </Button>
          </Paging>
        </IssueList>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string
    })
  }).isRequired
};

export default Repository;
