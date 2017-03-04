## Solve Cholera

A cross platform tool that aims to provide awareness and disseminate sensitization information regarding cholera in an interactive and intuitive manner

For the User Interface Design and Logic Implementation, I have used the following resources(please refer to the documentation for further details on each)
*  `AngularJS
* `Inforgraphs and Media Data`
* `Firebase`(Authentication and Real-Time Database)
* `NodeJS` (Logic)
* `Twilio` (SMS)

## Main Features

* Show dedicated Data and Inforgraphs on the effects of Cholera Outbreaks and data on the affected communities
* Offer Users dedicated information on tackling cases of cholera outbreak
* Train users on First Aid tips in the case of Cholera outbreak
* Allow users to share the information on the social media platforms
* Implement SMS services for quick information sharing and user subscriptions

## Requirements
In order to utilize **Grunt** you will need to have installed **Node.js** on your computer. Also insure that you have **NPM** installed. 
You can check if these are installed properly by opening up a Terminal (Linux or Mac) or Command Prompt (Windows) 
and entering the command: `node --version` and `npm --version`

Once you have installed these programs, you'll need to get grunt and bower. You can achieve this by running the following command: `npm install -g bower grunt-cli` 
Now you should be able to exectue the commands "grunt" and "bower". 

Please note that these commands must be ran from the project's root folder.

### Bower Dependency Management

To ensure you have all updated the Javascript libraries managed by bower, run the command bower install in a terminal or command prompt while you are in the current working directory of the project.

## Grunt Build Tool

This project supports build steps with Grunt. The supported Grunt tasks that this project ships with is:

* Less Compilation
* Bower Depenecy Inclusion
* Release Tagging

To build your project, just run the command `grunt build:angular`. This will compile your less files and copy over your bower dependencies.

Release tagging allows you to bump your current project's version and tag it with git. It also creates a changelog based on your prevoius commit history. Checkout the **grunt-changelog module** for more details and how to customize.

## Local Server Development

We've made it easy to develop and test on your local machine. Once you've installed the bower dependencies and built your project, you can start a local server by running the command `npm start`. This will start a local server and open up your browser.

## Plugins

All jQuery plugins are depended on `ui-jq`, do not need create the Angular Directive for each of the plugin. you can config in the js/app.js Angular Constant `JQ_CONFIG`, `functionName => pluginPath`, the js and css files are lazy loaded.

* Flotchart
* Sparklines
* Datatables
* Chosen

Core
You must know AngularJS, "ui-router" and "ui-jq" to get started your project.
ui-router

ui-router for Nested Routing and Nested View, check the [official documents](http://angular-ui.github.io/ui-router/)

##### ui-load

ui-load for lazy loading the js and css files.

```css
angular.module('myModule', ['ui.load']);

uiLoad.load( ['path/style.css', 'path/script.js'] ).then(function() {
// loaded succesfully.
}).catch(function() {
// There was some error loading the files.
});
```

