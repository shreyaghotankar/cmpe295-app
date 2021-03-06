
import { API, Storage } from "aws-amplify";
import { AddingError } from '../constants';
import { v4 as uuidv4 } from 'uuid';


Storage.configure({ level: 'private' });

let apiName = 'dBApi';
let path = '/images';


const addItemS3 = (fileName, file) => {
     return Storage.put(fileName, file).catch((err) => Promise.reject(new AddingError('S3')))
}

const addItemDynamoDB = (result, type, attributes) => {
     const date = new Date();
     const epoch = date.getTime();
     const item = {
          imageId: result.key,
          type: type,
          attributes: attributes, 
          created: epoch,
          updated: epoch
     }
     return API.put(apiName,path, {
          body: item,
     }).catch((err) => Promise.reject(new AddingError('DynamoDB')))
} 

export const uploadItem = function (fileName, file, type, attributes) {
     let fileId = uuidv4();
     return addItemS3(fileId, file).then(result => {
          return addItemDynamoDB(result, type, attributes)
     })

}

export const getItems = function () {
     const myInit = { // OPTIONAL
          headers: {}, // OPTIONAL
     };
     return API.get('dBApi','/images', myInit)
     //return Storage.list('').then(keys => Promise.all(keys.map(k => Storage.get(k.key))));
}


const removeItemS3 = (fileName) => {
     return Storage.remove(fileName).catch((err) => Promise.reject(new AddingError('S3 remove Failed')))
}
// TBD: REMOVE_ITEM AND UPDATE_ITEM
export const deleteItems = function (imageId) {
     return API.del(apiName,path,{
          body: {
               imageId: imageId
          },
     }).catch((err) => Promise.reject(new AddingError('Delete Fail'))).then(result => {
          return removeItemS3(imageId)
     })
}
   
export const updateItemDynamoDb = function (imageId, type, attributes) {
     const updatePath = path + '/' + imageId;
     const date = new Date();
     const epoch = date.getTime();
     const item = {
          imageId: imageId,
          type: type,
          attributes: attributes,
          updated: epoch
     }
     //console.log("print stuff", item)
     return API.put(apiName,updatePath, {
          body: item,
     }).catch((err) => Promise.reject(new AddingError('DynamoDB Update Failed')))
} 

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
