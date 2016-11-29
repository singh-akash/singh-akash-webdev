module.exports = function() {

    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/cs5610-assignment");
    //mongoose.connect('mongodb://heroku_q902xh5w:v72hd7qnt7gklqeuj8imp1t2dm@ds033086.mlab.com:33086/heroku_q902xh5w/cs5610');

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