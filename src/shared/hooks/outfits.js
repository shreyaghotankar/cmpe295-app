
import { API } from "aws-amplify";
import { AddingError } from '../constants';




// Storage.configure({ level: 'private' });

let apiName = 'dBApi';
// let path = '/images';



export const getOutfits = (results) => {
     const existingRecommendations = results?.filter(el => el.favorites).reduce((acc, el) => {
          el.favorites.forEach(fav => acc.push({ itemOne: el, itemTwo: fav }))
          return acc
     }, []);
     return(existingRecommendations);
}

export const deleteOutfit = function (mainItem, itemToRemove) {
     const { imageId, favorites } = mainItem || {};
     const newFavorites = favorites?.filter(el => el !== itemToRemove);
     const data = {
          favorites: newFavorites
     }
     const myInit = { // OPTIONAL
          headers: {},
          body: data // OPTIONAL
     };
     const path = '/recommendations/fav/'+ imageId ;
     return API.del(apiName, path, myInit).catch((error) => 
     {
          return Promise.reject(new AddingError('Delete Fav Error'))})
}

export const generateRecommendations = function (item) {
     const { attributes, type, imageId, recomAttr, recomDate, updated } = item;
     const data = {
          type: type,
          attributes: attributes
     }
     if (recomDate && recomDate > updated) {
          data['recomAttr'] = recomAttr
     }
     const myInit = { // OPTIONAL
          headers: {},
          body: data // OPTIONAL
     };
     const path = '/recommendations/'+ imageId ;

     return API.post(apiName, path, myInit).catch((error) => 
     {
          return Promise.reject(new AddingError('OutfitGenerationError'))})
}

export const saveFavoriteOutfits = function (imageId , likedImageIds) {
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


