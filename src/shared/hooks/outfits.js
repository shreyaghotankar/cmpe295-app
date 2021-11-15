
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

export const deleteOutfit = function (imageId, likedImageIds) {
     const data = {
          favorites: likedImageIds
     }
     const myInit = { // OPTIONAL
          headers: {},
          body: data // OPTIONAL
     };
     const path = '/recommendations/fav/'+ imageId ;
     return API.delete(apiName, path, myInit).catch((error) => 
     {
          return Promise.reject(new AddingError('Delete Fav Error'))})
}

export const generateRecommendations = function ( item ) {
     //recomDate < updated; recomAttr: undefined
     const {attributes, type, imageId, recomAttr, recomDate, updated } = item;
     const data = {
          type: type,
          attributes: attributes
     }
     console.log(item)
     if (recomDate && recomDate > updated) {
          data['recomAttr'] = recomAttr
     }
     const myInit = { // OPTIONAL
          headers: {},
          body: data // OPTIONAL
     };
     const path = '/recommendations/'+ imageId ;
     console.log("item: ", item);

     return API.post(apiName, path, myInit).catch((error) => 
     {
          return Promise.reject(new AddingError('OutfitGenerationError'))})
}

export const saveFavoriteOutfits = function ( imageId , likedImageIds) {
     const data = {
          favorites: likedImageIds
     }
     const myInit = { // OPTIONAL
          headers: {},
          body: data // OPTIONAL
     };
     const path = '/recommendations/fav/'+ imageId ;
     return API.put(apiName, path, myInit).catch((error) => 
     {
          return Promise.reject(new AddingError('Save Fav Error'))})
     
}
