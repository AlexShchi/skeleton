# Skeleton

(*Tested on Windows*)

##Requirement
* yarn v3 (or not. I am not sure)

##It is a start point for any projects.

To start the project, follow these steps:
1) add "favicon.svg" file to *"frontend/favicon"*
2) run **"yarn install"**
3) run **"yarn favicon"**
4) run **"yarn serve"**

**And fun!**

It will run localhost web-server for html creation. It uses BrowserSync for update html in browsers. 

##Commands (npm run):
1) **"yarn favicon"**    - create favicon files and html for any devices
2) **"yarn build"**      - build html, js, css for development mode
3) **"yarn serve"**      - run localhost server and watcher
4) **"yarn watch"**      - run watcher for files. Create development mode assets
5) **"yarn build-prod"** - create assets for production
6) **"yarn new-block"**  - create new block folder with base files in *"frontend/blocks/"*

##Creating new block **"yarn new-block"**
New block will create in ***'/frontend/blocks/'***. The command has 2 parameters:
1. block name - string, without spaces
2. block path - string, may be empty. The root for path is '/frontend/blocks/'. Second parameter needs if we want creat directory for block in root directory. 
