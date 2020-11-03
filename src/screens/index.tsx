import { ApolloClient, ApolloProvider, FieldPolicy, InMemoryCache } from '@apollo/client';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Posts } from './posts/Posts';
import { AddPost } from './addPost/AddPost';
import { SignUp } from './signup/SignUp';
import { Login } from './login/Login';
import PhotoSelection from './photoSelection/PhotoSelection';
// import { createUploadLink } from 'apollo-upload-client'



interface Screens {
  name: string;
  Screen: any;
}
const screens: Screens[] = [
  { name: 'posts', Screen: Posts },
  { name: 'addPost', Screen: AddPost },
  { name: 'signup', Screen: SignUp },
  { name: 'login', Screen: Login },
  { name: 'photoSelection', Screen: PhotoSelection },
];


export const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'https://ionian-cotton-aerosteon.glitch.me/graphql',
  headers: {
    accept: "application/json",
    contentType: "application/json"
  },
  // link: createUploadLink({
  //   uri: "https://ionian-cotton-aerosteon.glitch.me/graphql",
  // }),
  cache,

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
