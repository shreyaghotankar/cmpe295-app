
// import { API, Storage } from "aws-amplify";
// import { AddingError } from '../constants';


// Storage.configure({ level: 'private' });

// let apiName = 'dBApi';
// let path = '/images';


export const getOutfits = function () {
     return new Promise(function (resolve) {
          setTimeout(function (){
               console.log("Outfits read from DB")
               // returning empty list of items
               resolve(["h"])
          }, 1000);
     });
}
