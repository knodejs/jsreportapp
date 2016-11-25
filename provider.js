var mongoose = require('mongoose');
mongoose.connect('mongodb://nat:s56255625@ds163377.mlab.com:63377/jsreports');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var TemplateVersions = new Schema({
    person     : String
  , comment    : String
  , created_at : Date
});

var TemplateBase = new Schema({
    author      : ObjectId
  , title       : String
  , body        : String
  , created_at  : Date
  , templateVersions    : [TemplateVersions]
});

mongoose.model('TemplateBase', TemplateBase);
var TemplateBase = mongoose.model('TemplateBase');

TemplateProvider = function(){};

//Find all TemplateBases
TemplateProvider.prototype.findAll = function(callback) {
  TemplateBase.find({}, function (err, templateBases) {
    callback( null, templateBases )
  });
};

//Find TemplateBase by ID
TemplateProvider.prototype.findById = function(id, callback) {
  TemplateBase.findById(id, function (err, templateBase) {
    if (!err) {
	  callback(null, templateBase);
	}
  });
};

//Update TemplateBase by ID
TemplateProvider.prototype.updateById = function(id, body, callback) {
  TemplateBase.findById(id, function (err, templateBase) {
    if (!err) {
	  templateBase.title = body.title;
	  templateBase.body = body.body;
	  templateBase.save(function (err) {
	    callback();
	  });
	}
  });
};

//Create a new TemplateBase
TemplateProvider.prototype.save = function(params, callback) {
  var templateBase = new TemplateBase({title: params['title'], body: params['body'], created_at: new Date()});
  templateBase.save(function (err) {
    callback();
  });
};

//Add comment to TemplateVersion
TemplateProvider.prototype.addCommentToPost = function(postId, comment, callback) {
  this.findById(postId, function(error, post) {
    if(error){
	  callback(error)
	}
    else {
	  templateBase.templateVersions.push(comment);
	  templateBase.save(function (err) {
	    if(!err){
		  callback();
	    }
	  });
    }
  });
};

exports.TemplateProvider = TemplateProvider;
