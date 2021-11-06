
import { API, Storage } from "aws-amplify";
import { AddingError } from '../constants';


Storage.configure({ level: 'private' });

let apiName = 'dBApi';
let path = '/images';


const addItemS3 = (fileName, file) => {
 return Storage.put(fileName, file).catch((err) => Promise.reject(new AddingError('S3')))
}

const addItemDynamoDB = (result, type, attributes) => {
 const item = {
  imageId: result.key,
  type: type,
  attributes: attributes
 }
 return API.put(apiName,path, {
  body: item,
 }).catch((err) => Promise.reject(new AddingError('DynamoDB')))
} 

export const uploadItem = function (fileName, file, type, attributes) {
 return addItemS3(fileName, file).then(result => {
  return addItemDynamoDB(result, type, attributes)
 })

}

export const getItems = function () {
 return API.get('dBApi','/images')
 //return Storage.list('').then(keys => Promise.all(keys.map(k => Storage.get(k.key))));
}


// TBD: REMOVE_ITEM AND UPDATE_ITEM



// async function onchange(e){
//   const file = e.target.files[0];
//   const result = await Storage.put(file.name, file)
//   const image_id = result.key
//   //await Storage.get(result.key)
//   console.log("results: ", result)
//   console.log("image id: ", image_id)
//   setImage_id(image_id);

//   }
//   const onBoxChecked = e =>{
//       const target = e.target;
//       const attributes = target.value;
//       setAttributes(attributes)
//     }
//   const handleSubmit = e => {
//       e.preventDefault();
//       let item = {image_id, attributes};
//       console.log("payload:", item)
//       API.put(apiName,path, {
//          body: {
//              imageId: image_id,
//              attributes: attributes
//          },
//      }).then(res => {
//          console.log("Database updated");
//      })
//      .catch(error => {
//          console.log(error.response)
//      });

//   }

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
