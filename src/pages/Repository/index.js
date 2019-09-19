import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  FaSpinner,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronCircleLeft,
} from 'react-icons/fa';
import { Loading, Owner, IssueList, FilterList } from './styles';

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
    filter: 'all',
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`repos/${repoName}`),
      api.get(`repos/${repoName}/issues`, {
        params: {
          state: 'all',
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
    const { page, filter } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`repos/${repoName}/issues`, {
      params: {
        state: filter,
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

  handleFilter = async action => {
    await this.setState({
      filter: action,
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
              <FaChevronCircleLeft color="#f2784b" size={22} />
              <span>Get back</span>
            </Link>
          </div>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <FilterList>
          <li>
            <button type="button" onClick={() => this.handleFilter('all')}>
              All
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.handleFilter('open')}>
              Open
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.handleFilter('closed')}>
              Closed
            </button>
          </li>
        </FilterList>

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
                <FaAngleDoubleLeft size={24} /> <span>Previous</span>
              </button>

              <strong>{page}</strong>

              <button type="button" onClick={() => this.handlePage('next')}>
                <span>Next</span> <FaAngleDoubleRight size={24} />
              </button>
            </div>
          )}
        </IssueList>
      </Container>
    );
  }
}
