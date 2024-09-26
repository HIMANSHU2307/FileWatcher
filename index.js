const config = require("./config.json");

const events = require("events"),
  util = require("util");


const fs = require("fs"),
  watchDir = config.watch,
  processedDir = config.destination;
  isDailyFolder = config.isDailyFolder;

//   const folderName = '/watcher';

// try {
//   if (!fs.existsSync(folderName)) {
//     fs.mkdirSync(folderName);
//   }
// } catch (err) {
//   console.error(err);
// }
  
  
  class Watcher extends events.EventEmitter {
  constructor(watchDir, processedDir) {
    super();
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }


  watch() {
    const watcher = this;
    fs.readdir(this.watchDir, function(err, files) {
      if (err) throw err;
      for (let index in files) {
        watcher.emit("process", files[index]);
      }
    });
  }


  start() {
    var watcher = this;
    fs.watchFile(watchDir, function() {
      watcher.watch();
    });
  }
}
 
 
let watcher = new Watcher(watchDir, processedDir);


watcher.on("process", function process(file) {
    let currentDate = new Date();
    var folderName = processedDir;

  if(isDailyFolder){
    let folderDate = currentDate.toISOString().split("T");
    folderName = `${processedDir}/${folderDate[0]}`;
    if(!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName)
    }
  }

  const watchFile = this.watchDir + "/" + file;
  const fileSpliter = file.split(".");
  let format = '';
  let fileName = '';
  if(fileSpliter[0].includes('AEAT')) {
    fileName = 'AEAT_NET_IN'
  } else if(fileSpliter[0].includes('tmp')) {
    fileName = 'tmpdate'
  } else {
    fileName = fileSpliter[0];
  }
  if(fileSpliter[1]) format = `.${fileSpliter[1]}`;
  let dateFormat = currentDate.toISOString().split("."); 
  const processedFile = folderName + "/" + fileName + dateFormat[0].replaceAll(':', '-') + format;
  fs.rename(watchFile, processedFile, function(err) {
    if (err) throw err;
  });
});

/*Start it!!!*/

watcher.start();
  
  