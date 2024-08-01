# Twitter React
One frontend twitter project based on react

## How to start
npm start

## How to visite
http://localhost:3000/

## Send Request
request: get post put patch delete
service: const getUser = (params) => get('/user', params).then((res) => {
  return res;
});

## React five steps
1. Break The UI Into A Component Hierarchy
2. Build A Static Version in React
3. Identify The Minimal (but complete) Representation Of UI State

## Style Choices
- css hard to nest
- sass better than css
- css module No duplicate name styles

## config file info
- craco.config.js: webpack config files
- jsconfig.js: for vscode

{
  "name": "my-react-template",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^1.3.4",
    "craco": "^0.0.3",
    "js-cookie": "^3.0.1",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.2",
    "react-scripts": "^5.0.1",
    "sass": "^1.58.3",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@craco/craco": "^5.9.0",
    "postcss-px-to-viewport-with-include": "^1.0.0",
    "react-cookie": "^4.1.1"
  }
}
