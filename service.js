var Service = require('node-windows').Service;
var svc = new Service({
 name:'FileWatcher',
 description: 'Node.js service description goes here.',
 script: 'C:\\github\\fileWatcher\\index.js'
});

svc.on('install',function(){
 svc.start();
});

svc.install();