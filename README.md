File Watcher:
    This project is generated with NPM.
    Run "npm install" to install all the required dependencies.

Development Server:
    Run "node index.js" to start the server.
    OR
    Run "node service.js" to run application as windows service, update service.js file with the path of index.js; For example:     script: 'C:\\github\\fileWatcher\\index.js'.


Configuration:
    JSON file with the config properties
    "watch": local path for watch folder
    "destination": local path for destination folder
    "isDailyFolder": (boolean) a new folder will be created if "true".
                     The folder will be creadet only if a new file is received on that particular date.
    
