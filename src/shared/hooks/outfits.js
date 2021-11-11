
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

export const deleteOutfit = function () {
     return new Promise(function (resolve) {
          setTimeout(function (){
               console.log("Outfit is deleted")
               // returning empty list of items
               resolve(["h"])
          }, 1000);
     });
}

export const generateRecommendations = function () {
     return new Promise(function (resolve) {
          setTimeout(function (){
               console.log("Generating outfit")
               // returning empty list of items
               resolve(["h", 'dsf', 'asdf', 'f',"h", 'dsf', 'asdf', 'f'])
          }, 1000);
     });
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
