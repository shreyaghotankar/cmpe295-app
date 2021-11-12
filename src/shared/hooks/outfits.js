
import { API } from "aws-amplify";
import { AddingError } from '../constants';




// Storage.configure({ level: 'private' });

let apiName = 'dBApi';
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

export const deleteOutfit = function () {
     return new Promise(function (resolve) {
          setTimeout(function (){
               console.log("Outfit is deleted")
               // returning empty list of items
               resolve(["h"])
          }, 1000);
     });
}

export const generateRecommendations = function (imageId, type, attributes) {
     const myInit = { // OPTIONAL
          headers: {}, // OPTIONAL
     };
     const path = '/recommendations/'+ imageId ;

     return API.get('dBApi', path, myInit)

}

export const saveFavoriteOutfits = function () {
     return new Promise(function (resolve) {
          setTimeout(function (){
               console.log("SavingOutfits")
               // returning empty list of items
               resolve(["h"])
          }, 1000);
     });
}
