import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  FaSpinner,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronCircleLeft,
} from 'react-icons/fa';
import { Loading, Owner, IssueList } from './styles';

import Container from '../../components/Container';
import api from '../../services/api';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`repos/${repoName}`),
      api.get(`repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      page: 1,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`repos/${repoName}/issues`, {
      params: {
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handlePage = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'prev' ? page - 1 : page + 1,
    });

    this.loadIssues();
  };

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner size={30} color="#FFF" />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <div>
            <Link to="/">
              <FaChevronCircleLeft color="orange" size={20} /> Back to
              Repositories
            </Link>
          </div>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.length > 0 ? (
            issues.map(issue => (
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
            ))
          ) : (
            <p>This repository has no issues at all :(</p>
          )}
          {issues.length > 0 && (
            <div>
              <button
                type="button"
                disabled={page === 1}
                onClick={() => this.handlePage('prev')}
              >
                <FaAngleDoubleLeft size={24} />
              </button>

              <strong>{page}</strong>

              <button type="button" onClick={() => this.handlePage('next')}>
                <FaAngleDoubleRight size={24} />
              </button>
            </div>
          )}
        </IssueList>
      </Container>
    );
  }
}
