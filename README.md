## Installation

Clone project to your machine;
```
git clone https://github.com/MuraraAllan/whats-app-clone
```
Install dependecies 
```
yarn install
```
----

# WhatsApp + Telegram inline buttons clone

This project was create based on a mock screen in PDF from the scratch, it includes work such as Mock, Archicture, Development and testing. 
It's functionality mimicks whats app added telegram inline buttons.

Architecture based on hooks, a central context (State Machine) on each page to ensure isolated state per page, important data such as chatSessions and userSession should be always available through top hoisted hooks, desired behavior is to containerize state <b>per page</b> and rerender as minimal as possible and as independent as possible.


## Pages
A page is an action or behavior that the application can have, such as UserPage or MainPage, they control their own state and can share the state between the application. 

``UserPages has registering and logingIn and control if user is Registering or Logging - WIP``

``MainPage controls NavBar and ActiveChatSession navigate between chatSessions, send Picture, send Audio, Attach File, Send Message...``

**Packages**: 
  - React
  - Cypress
  - Typescript
  - Yarn
   - @material-ui @testing-library @cypress-file-upload @styled-components @yup @react-hook-form 


![](https://raw.githubusercontent.com/MuraraAllan/whats-app-clone/Task5/Task2/Task6/public/appImage.png?token=ACBMDFVY5JJF7MDBSYSYAH3AGQKUM)



# Usage

 Don't forget to attach yarn.lock when changing package.json
 
## Installation

Clone project to your machine;
```
git clone https://github.com/MuraraAllan/whats-app-clone
```
Install dependecies 
```
yarn install
```

## Testing

Run cypress tests with url localhost:3000 pointed 
```
yarn cypress-dev
```

Run unit tests using Jest 
```
yarn test
```

## Running on Development mode
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Running on Production mode
  Build with
### `yarn build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified.

Add serve to host it
### `yarn global add serve`
Run serve on main project folder and host it
### `serve -s build`
 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
