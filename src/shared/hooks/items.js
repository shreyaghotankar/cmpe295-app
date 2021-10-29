
import { API, Storage } from "aws-amplify";

Storage.configure({ level: 'private' });



const getItems = function() {
    return Storage.list('').then(keys => Promise.all(keys.map(k => Storage.get(k.key))));
  }

export default getItems;


// Shreya's fetch
// async function fetchImages() {
//   let imageKeys = await Storage.list('')
//   imageKeys = await Promise.all(imageKeys.map(async k => {
//   const signedUrl = await Storage.get(k.key)
//   return signedUrl
//   }))
//   console.log('imageKeys: ', imageKeys)
//   setImages(imageKeys)
// }  


// Dummy promise
    // return new Promise(function(resolve) {
    //   setTimeout(function(){
    //       console.log("Items read from DB")
    //       // returning  list of items
    //     resolve([])
    //   }, 3000);
    // });