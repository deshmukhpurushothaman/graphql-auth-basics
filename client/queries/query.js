import { gql } from '@apollo/client';
export const CurrentUser = gql`
  {
    user {
      id
      email
    }
  }
`;

export const Logout = gql`
  mutation {
    logout {
      email
    }
  }
`;

export const Login = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const Signup = gql`
  mutation Signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;
