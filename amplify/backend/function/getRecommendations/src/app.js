/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')
var cors = require('cors')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "user-image-data";
if(process.env.ENV && process.env.ENV !== "NONE") {
     tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = true; // TODO: update in case is required to use that definition
const partitionKeyName = "imageId";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/recommendations";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cors())

// Enable CORS for all methods
app.use(function (req, res, next) {
     res.header("Access-Control-Allow-Origin", "*")
     res.header("Access-Control-Allow-Headers", "*")
     next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
     switch(type) {
     case "N":
          return Number.parseInt(param);
     default:
          return param;
     }
}

/********************************
 * HTTP Get method for list objects *
 ********************************/

/* app.get(path + hashKeyPath, function(req, res) {
  var condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
}); */
app.get(path, function (req, res) {
     var condition = {}

     condition.userId = {
          ComparisonOperator: 'EQ'
     }

     if (userIdPresent && req.apiGateway) {
          condition.userId['AttributeValueList'] = [ req.apiGateway.event.requestContext.identity.cognitoIdentityId ];
     }

     console.log("recommendations condition: ", condition);

     let queryParams = {
          TableName: tableName,
          IndexName: 'userId-index',
          KeyConditions: condition        
     }

     dynamodb.query(queryParams, function (err, data) {
          if (err) {
               res.statusCode = 500;
               res.json({ error: 'Could not load items: ' + err });
          } else {
               res.json({ data });
          }
     })
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

/* app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
}); */

function createFilteringObject(itemType, attr) {
  let attrValues = {};
  if (itemType === 'TOP') {
    attrValues[':type'] = 'BOTTOM'
} else {
    attrValues[':type'] = 'TOP'
}
let filterExp = '#b = :type and ';
if (attr.length > 1) {
  filterExp += '(';
}
for (var i=0; i<attr.length; i++){
  let elem = attr[i]; // ['f_cotton', 'f_demin']
  if (i !== 0){
       filterExp += ' or ';
  }
  filterExp += '('
  for (var j = 0; j < elem.length; j++) {
       if (j != 0) {
            filterExp += ' and '
       }
       let name = ':a' + i + j;
       filterExp += 'contains (#a, ' + name + ')'
       attrValues[name] = elem[j];
  }
  filterExp += ')'
}
if (attr.length > 1) {
  filterExp += ')';
}

return {
  attrValues: attrValues, 
  filterExp: filterExp
}
}

app.post('/recommendations/:imageId', async function(req, res) {
     let params = {};
     let condition = {};
  

     condition.userId = {
          ComparisonOperator: 'EQ'
     }

     if (userIdPresent && req.apiGateway) {
          condition.userId['AttributeValueList'] = [ req.apiGateway.event.requestContext.identity.cognitoIdentityId ];
          params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);

     }
     
// [[], []]
     let attr = req?.body?.['recomAttr'];


     if (!attr) {
        //await from axios
        // let response = await axios.get('').promise(); // add api name in env
        // attr = response.attributes;
       // now attr = return from axios
       attr = [['f_pleated'],['f_cotton']];
       attr = attr.filter(el => el.length != 0);
       // put attr into DB
       if (attr.length === 0) {
         attr = "EMPTY"
       }
       const date = new Date();
     const epoch = date.getTime();
       let itemParams = {
        TableName: tableName,
        IndexName: 'userId-index',
        Key: params,
        KeyConditions: condition,
        UpdateExpression: 'set recomAttr = :attributes, recomDate = :recomDate',
        ExpressionAttributeValues: {
          ':attributes': attr, 
          ':recomDate': epoch
        }
       }
      //await from DB
      await dynamodb.update(itemParams).promise();    
     } 
     console.log("check attr after update: ", attr);
     if (attr === "EMPTY") {
       res.json({data: {
         Items: "EMPTY"}}) // ?
     }
     let filteringData = createFilteringObject(req?.body?.['type'], attr);
     let attrValues = filteringData.attrValues;
     let filterExp = filteringData.filterExp;


     console.log("check expression :", filterExp);
     console.log("attrValues: ", attrValues);

     let queryParams = {
          TableName: tableName,
          IndexName: 'userId-index',
          KeyConditions: condition,
          FilterExpression: filterExp,
          ExpressionAttributeNames:{
               '#a': 'attributes',
               '#b': 'type'
          },
          ExpressionAttributeValues: attrValues
     }
     console.log("query: ", queryParams)
     console.log("get req:", req.body['type']);
     console.log("get req attr:", req.body['attributes']);

     dynamodb.query(queryParams, function (err, data) {
          if (err) {
               res.statusCode = 500;
               res.json({ error: 'Could not load items: ' + err });
          } else {
               res.json({ data });
          }
     })
});


/************************************
* HTTP put method for insert object *
*************************************/

app.put('/recommendations/fav/:imageId', function (req, res) {
  let params = {};
  let condition = {};


  condition.userId = {
       ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
       condition.userId['AttributeValueList'] = [ req.apiGateway.event.requestContext.identity.cognitoIdentityId ];
       params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);

  }

  let putItemParams = {
    TableName: tableName,
    IndexName: 'userId-index',
    Key: params,
    KeyConditions: condition,
    UpdateExpression: 'set favorites = :rImg',
    ExpressionAttributeValues: {
      ':rImg': req?.body?.['favorites']
    }
  }
     dynamodb.update(putItemParams, (err, data) => {
          if(err) {
               res.statusCode = 500;
               res.json({ error: err, url: req.url, body: req.body });
          } else{
               res.json({ success: 'put call succeed!', url: req.url, data: data })
          }
     });
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function (req, res) {

     if (userIdPresent) {
          req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
     }

     let putItemParams = {
          TableName: tableName,
          Item: req.body
     }
     dynamodb.put(putItemParams, (err, data) => {
          if(err) {
               res.statusCode = 500;
               res.json({ error: err, url: req.url, body: req.body });
          } else{
               res.json({ success: 'post call succeed!', url: req.url, data: data })
          }
     });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete('/recommendations/fav/:imageId', function (req, res) {
  let params = {};
  let condition = {};


  condition.userId = {
       ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
       condition.userId['AttributeValueList'] = [ req.apiGateway.event.requestContext.identity.cognitoIdentityId ];
       params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);

  }

  let putItemParams = {
    TableName: tableName,
    IndexName: 'userId-index',
    Key: params,
    KeyConditions: condition,
    UpdateExpression: 'set favorites = :rImg',
    ExpressionAttributeValues: {
      ':rImg': req?.body?.['favorites']
    }
  }
     dynamodb.update(putItemParams, (err, data) => {
          if(err) {
               res.statusCode = 500;
               res.json({ error: err, url: req.url, body: req.body });
          } else{
               res.json({ success: 'delete call succeed!', url: req.url, data: data })
          }
     });
});
app.listen(3000, function () {
     console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
