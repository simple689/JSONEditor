module.exports = Conf;

function Conf() {
}

Conf._httpCom = "0.0.0.0";
Conf._httpPort = "6989";

Conf._pathRes = "/res";
Conf._pathResStore = Conf._pathRes + "/store";
Conf._pathResPersonal = Conf._pathRes + "/personal";

Conf._mysql = {};
Conf._mysql._db = "ZHEditor";

Conf._mysqlTable = {};
Conf._mysqlTable._user = "user";
Conf._mysqlTable._fileBrowser = "fileBrowser";

Conf._mysqlUser = {};
Conf._mysqlUser._id = "id";
Conf._mysqlUser._name = "name";

Conf._mysqlFileBrowser = {};
Conf._mysqlFileBrowser._id = "id";
Conf._mysqlFileBrowser._name = "name";
Conf._mysqlFileBrowser._personal = "personal";