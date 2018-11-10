const Conf = require('./conf.js');
const ModuleServer = require('../../common/js/module/moduleServer.js');

var moduleServer = new ModuleServer(Conf);
moduleServer.create(Conf._httpCom, Conf._httpPort);