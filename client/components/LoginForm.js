import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import { Login, CurrentUser } from '../queries/query';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    // this.props - Old, current set of props
    // nextProps - props received after component is rerendered
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: {
          email,
          password,
        },
        refetchQueries: [{ query: CurrentUser }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({ errors });
      });
  }
  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(CurrentUser)(graphql(Login)(LoginForm));
