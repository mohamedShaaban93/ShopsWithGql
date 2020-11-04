import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Posts } from './posts/Posts';
import { AddPost } from './addPost/AddPost';
import { SignUp } from './signup/SignUp';
import { Login } from './login/Login';
import {createUploadLink} from 'apollo-upload-client';
import { onError } from 'apollo-link-error'




interface Screens {
  name: string;
  Screen: any;
}
const screens:Screens[] = [
  { name: 'posts', Screen: Posts },
  { name: 'addPost', Screen: AddPost },
  { name: 'signup', Screen: SignUp },
  { name: 'login', Screen: Login}
];


export const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const link = ApolloLink.from([
  errorLink,
  createUploadLink({uri: "https://ionian-cotton-aerosteon.glitch.me/graphql"}),
  new HttpLink({ uri: "https://ionian-cotton-aerosteon.glitch.me/graphql" }),
])

const client = new ApolloClient({
  link,
  cache
});

/// create Screen
function createScreen(screen: Screens): void {
  const { name, Screen } = screen;
  let ScreenWraper = (props: object) => (
    <ApolloProvider client={client}>
      <Screen {...props} />
    </ApolloProvider>
  );
  Navigation.registerComponent(name, () =>
    ScreenWraper,
  );
}

//// register fun
const registerScreens = () => {
  screens.forEach((screen) => createScreen(screen));
};

export default registerScreens;
