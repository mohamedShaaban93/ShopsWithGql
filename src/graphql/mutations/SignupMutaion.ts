import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation ($profileImg: Upload,$email: String,$name: String,$password: String) {
  signUp(input: {email: $email, name: $name, password: $password, profileImg: $profileImg}) {
    user {
      id
      updatedAt
      profileImg
      password
      createdAt
      email
    }
    token
  }
}
`;
