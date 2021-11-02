import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from "./aws-exports";
import './App.scss'

import MainPage from './components/main-page/main-page';
import { UserContext } from './shared/contexts/user-info';
import { getItems, uploadItem } from "./shared/hooks/items";
import { ItemsContext } from "./shared/contexts/items-info";

Amplify.configure(awsconfig);

const App = () => {
 const [user, setUser] = useState();
 const [authState, setAuthState] = useState();
 const [items, setItems] = useState();

 useEffect(() => {
  return onAuthUIStateChange((nextAuthState, authData) => {
   getItems().then(result => {
    setItems(result)
   })
   setAuthState(nextAuthState);
   setUser(authData);
  });
 }, [])

 const addItem = (fileName, file, item_type, attributes) => {
  return uploadItem(fileName, file, item_type, attributes).then(() => getItems()).then(result => setItems(result)).catch(e => console.log(e.step));
 }



 return authState === AuthState.SignedIn && user ? (
  <UserContext.Provider value={{ user: user }}>
   <ItemsContext.Provider value={{ items: items, addItem: addItem }}>
    <MainPage/>
   </ItemsContext.Provider>
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
