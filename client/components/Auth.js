import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import { CurrentUser } from '../queries/query';

export default (WrappedComponent) => {
  class Auth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.user && !nextProps.data.loading) {
        hashHistory.push('/signin');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return graphql(CurrentUser)(Auth);
};
