# CMPE295 Masters Project
### University : [San Jose State University](http://www.sjsu.edu/)
### Project: Sustainable Fashion Recommendation Application using Machine Learning
### Project Advisor: Dr. KaiKai Liu
*This repository has Frontend and Backend code for the application.* \
*For ML component code follow this [link](https://github.com/shreyaghotankar/CMPE295-Masters_Project)*

**Live version: [www.outfitperfection.com](https://www.outfitperfection.com/)**

>Table of content: 
> - [Abstract](#abstract) 
> - [Architecture Diagram](#architecture-diagram) 
> - [React configurations](#react-configurations) 
> - [Testing](#testing)
> - [Amplify Setup](#amplify-setup)
> - [Project Folder Structure](#project-folder-structure)
> - [Styles](#styles)
> - [Screenshots](#screenshots)
> - [Branching](#branching)

## Abstract
According to the UN environment program, the fashion industry is the second-biggest consumer of water and is responsible for 8-10 percent of global carbon emissions. Clothing affordability, demand over-stimulated by social media lead to imprudent buying and under-utilization of clothes which eventually results in waste accumulation. We are seeking a solution to provide outfit recommendations based on users’ existing closets and help them reimagine their style without compromising the environment.

Rapid advancements in Machine Learning (ML) and Artificial Intelligence (AI) created significant momentum for developing recommendation systems. Broad utilization of such systems allows online fashion retailers to make more personalized suggestions for upselling products. Existing fashion recommendation systems encourage additional purchases of similar items or items based on their previous purchases and current trends. 

In this project, we built a web application reinforced with machine learning recommendation system. We achieved this by applying collaborative filtering recommendations to users' virtual closets. Users can upload images of their pre-existing wardrobe, and the application will recommend the outfits. Our application will help people wear the styles that best suit them and have satisfaction knowing that they contributed towards mitigating climate change.

## Architecture Diagram
![architecture](https://github.com/shreyaghotankar/cmpe295-app/blob/feature/update-readme/images/architecture.jpg)

## React configurations

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Configuration: 
- node >= 10.16
- npm >= 5.6s
- node-sass [to use scss instead of plain css]
- prop-types [to typecheck]
- bootstrap
- lint

## Testing

Jest library
`npm test`

## Amplify Setup

```
npm install -g @aws-amplify/cli
amplify upgrade
```

AWS best practices suggest to create a new user for each project and grant granual permissions to it. 

After the user is create in AWS console and creadentials for CLI (access key Id and secret access key) are recieved, aws cli should be cofigured on a local machine. 

Run the command to create a new profile and you will be prompted to add credentials: 
```
aws configure --profile [new_profile_name]
```

Output: 
```
AWS Access Key ID [None]: SOMEKEYID
AWS Secret Access Key [None]: SoMeSeCrEtHeRe
Default region name [None]: us-west-2 // or any other region of your choice 
Default output format [None]: json // or any other format
```

To avoid specifying the profile in every command set the AWS_PROFILE environment variable: 
```
export AWS_PROFILE=master_project
```
##  Project Folder Structure
-> components (holds all components by separate folders) \
---> component-name1 \
---> component-name2 \
... \
-> shared \
---> icons (holds all icons for the project) \
---> styles (holds all scss files for global styles and variables) 

### Component Folder Structure

*Folder name*: component-name
*Files*:
- component-name.js
- component-name.test.js
- component-name.module.scss  

**component-name.js**
```javascript
import React from "react";
import PropTypes from 'prop-types'; // for typechecking

import styles from './component-name.module.scss'; // for creating unique local class names

function ComponentName (props) {
    const {
        propOne,
        propTwo
    } = props;

    return (
        <div>
            {propOne}
        </div>
    )
}

ComponentName.propTypes = {
    propOne: PropTypes.string, //type of the property should be specified
    propTwo: PropTypes.bool
}

export default ComponentName;

```

## Styles

To destinguish local vs global styles we are using Css Modules that automatically create a unique classname in the format `[filename]\_[classname]\_\_[hash]`

## Screenshots

### Welcome Screen (mobile and desktop)
![welcome_screen](https://github.com/shreyaghotankar/cmpe295-app/blob/feature/update-readme/images/desktop_welcome.png)
![about_screen](https://github.com/shreyaghotankar/cmpe295-app/blob/feature/update-readme/images/desktop_aboutus.png)
![mobile_welcome_screen](https://github.com/shreyaghotankar/cmpe295-app/blob/feature/update-readme/images/mobile_welcome.png)

### Main Scree (mobile and desktop)
![mobile_add](https://github.com/shreyaghotankar/cmpe295-app/blob/feature/update-readme/images/mobile_add.png)
![mobile_magic](https://github.com/shreyaghotankar/cmpe295-app/blob/feature/update-readme/images/mobile_magic.png)
![mobile_outfits](https://github.com/shreyaghotankar/cmpe295-app/blob/feature/update-readme/images/mobile_outfits.png)
![desktop_results](https://github.com/shreyaghotankar/cmpe295-app/blob/feature/update-readme/images/desktop_results.png)

## Branching


 > ! Before you start always pull latest changes \
 > `git pull`

For each feature/bug or issue resolvment create a new branch 

`git checkout -b [branch name]`

Follow branch naming convention:
[feature/bug/issue]/[name of the reature]-[author]
Ex: feature/readme-az


## References:

[Configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) \
[CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet) \

[Context Usage](https://dmitripavlutin.com/react-context-and-usecontext/) \
[Custom Amplify SignOut](https://github.com/aws-amplify/amplify-js/issues/7039) \
[Preview in React](https://dev.to/yosraskhiri/make-an-image-preview-in-react-js-301f) \
[Custom Upload Button](https://dev.to/faddalibrahim/how-to-create-a-custom-file-upload-button-using-html-css-and-javascript-1c03) \
[Error handling in long Promises](https://medium.com/@arthurxavier/error-handling-in-long-promise-chains-155f610b5bc6)
[Drag and Drop](https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929)
