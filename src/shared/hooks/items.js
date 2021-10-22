import React, { useEffect, useRef, useState } from "react";
import { API } from 'aws-amplify';
import {UserContext} from '../../shared/contexts/user-info';

let apiName = 'dBApi';
let path = '/images';


const getItems = function() {
    return new Promise(function(resolve) {
      setTimeout(function(){
          console.log("Items read from DB")
          // returning  list of items
          API.get(apiName,path)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error.response)
          })
        resolve([])
      }, 3000);
    });
  }

export default getItems;