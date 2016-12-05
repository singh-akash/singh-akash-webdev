module.exports = function() {

    var mongoose = require("mongoose");
    //mongoose.connect("mongodb://localhost/cs5610-assignment");
    var connectionString = "mongodb://localhost/cs5610-assignment";

    if(process.env.HEROKU_MONGODB_DB_PASSWORD) {
        connectionString = "mongodb://" +
            process.env.HEROKU_MONGODB_DB_USERNAME + ":" +
            process.env.HEROKU_MONGODB_DB_PASSWORD + "@" +
            process.env.HEROKU_MONGODB_DB_HOST + ':' +
            process.env.HEROKU_MONGODB_DB_PORT + '/' +
            process.env.HEROKU_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};