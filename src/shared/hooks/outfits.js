
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
     const path = '/outfits/' + imageId;
     const item = {
          imageId: imageId,
          type: type,
          attributes: attributes, 
     }
     // returning empty list of items
     return API.get(apiName,'/recommendations',{
          body: item,
     }).catch((err) => console.log('DynamoDB Error'))

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
