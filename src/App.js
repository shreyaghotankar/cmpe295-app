import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from "aws-amplify";
import {AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from "./aws-exports";

import MainPage from './components/main-page/main-page';
import {UserContext} from './shared/contexts/user-info';

Amplify.configure(awsconfig);

const App = () => {
  const [user, setUser] = useState();
  const [authState, setAuthState] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
      console.log(authData)
    });
  }, [])

  return authState === AuthState.SignedIn && user ? (
    <UserContext.Provider value={{user: user}}>
      <MainPage />
    </UserContext.Provider>) : (
      <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email",
            placeholder: "Email",
            inputProps: { required: true, autocomplete: "username" },
          },
          {
            type: "password",
            label: "Password",
            placeholder: "********",
            inputProps: { required: true, autocomplete: "new-password" },
          },
          {
            type: "given_name",
            label: "Given Name",
            placeholder: "First Name",
            inputProps: { required: true, autocomplete: "given_name" },
          },
          {
            type: "family_name",
            label: "Family Name",
            placeholder: "Last Name",
            inputProps: { required: true, autocomplete: "family_name" },
          },
        ]} 
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>
  )

};

export default App;
