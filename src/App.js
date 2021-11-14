import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from "./aws-exports";
import './App.scss'

import MainPage from './components/main-page/main-page';
import { UserContext } from './shared/contexts/user-info';
import { getItems, uploadItem, deleteItems, updateItemDynamoDb } from "./shared/hooks/items";
import { ItemsContext } from "./shared/contexts/items-info";
import { getOutfits, deleteOutfit, saveFavoriteOutfits, generateRecommendations } from "./shared/hooks/outfits";
import { OutfitsContext } from "./shared/contexts/outfits-info";

Amplify.configure(awsconfig);

const App = () => {
     const [user, setUser] = useState();
     const [authState, setAuthState] = useState();
     const [items, setItems] = useState();
     const [outfits, setOutfits] = useState();

     useEffect(() => {
          return onAuthUIStateChange((nextAuthState, authData) => {
               getItems().then(result => {
                    setItems(result.data.Items.sort((a, b) => b?.created - a?.created))
                    console.log(result.data.Items)
               })
               getOutfits().then(result => setOutfits(result));
               setAuthState(nextAuthState);
               setUser(authData);
          });
     }, [])

     const sortItems = (result) => {
          return result?.data?.Items?.sort((a, b) => b?.created - a?.created);
     }

     const addItem = (fileName, file, item_type, attributes) => {
          return uploadItem(fileName, file, item_type, attributes).then(() => getItems()).then(result => setItems(sortItems(result))).catch(e => console.log(e.step));
     }

     const removeItem = (imageId) => {
          return deleteItems(imageId).then(() => getItems()).then(result => setItems(sortItems(result))).catch(e => console.log(e.step));
     }

     const updateItem = (imageId, type, attributes) => {
          return updateItemDynamoDb(imageId, type, attributes).then(() => getItems()).then(result => setItems(sortItems(result))).catch(e => console.log(e.step));
     }

     const removeOutfit = (imageIdOne, imageIdTwo) => {
          return deleteOutfit(imageIdOne, imageIdTwo).then(() => getOutfits()).then(result => setOutfits(result));
     }

     const saveOutfits = (imageId, likedImageIds) => {
          return saveFavoriteOutfits(imageId, likedImageIds).then(() => getOutfits()).then(result => setOutfits(result));
     }

     const generateOutfits = (imageId, type, attributes, recomAttr) => {
          return generateRecommendations(imageId, type, attributes, recomAttr);
     }

     return authState === AuthState.SignedIn && user ? (
          <UserContext.Provider value={{ user: user }}>
               <ItemsContext.Provider value={{ items: items, addItem: addItem, removeItem: removeItem, updateItem: updateItem }}>
                    <OutfitsContext.Provider value={{ outfits: outfits, removeOutfit: removeOutfit, saveOutfits: saveOutfits, generateOutfits: generateOutfits }}>
                         <MainPage/>
                    </OutfitsContext.Provider>
                    
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
