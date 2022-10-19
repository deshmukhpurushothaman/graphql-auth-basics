import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { CurrentUser, Logout } from '../queries/query';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query: CurrentUser }],
    });
  }
  renderButtons() {
    const { user, loading } = this.props.data;
    if (loading) {
      return <div />;
    }
    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/signin'>Signin</Link>
          </li>
        </div>
      );
    }
  }
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo left'>
            Home
          </Link>
          <ul className='right'>{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(Logout)(graphql(CurrentUser)(Header));
