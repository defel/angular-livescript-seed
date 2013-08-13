
var application_root = __dirname,
    express = require('express'),
    mongoose = require('mongoose'),
    path = require("path"),
    // Create a new Express app
    app = module.exports = express(),
    profiles = {
      'dev': {
        "mongo": "mongodb://127.0.0.1:27017/gendern",
        "url": 'http://localhost:8394/',
        "url_api": 'http://localhost\\:8394/api/'
      }
    },
    profile;

// === APP SETUP ===
if(!process.env.APPENV) {
  process.env.APPENV = 'dev';
}

profile = profiles[process.env.APPENV];

// Connect to mongodb
mongoose.connect(profile.mongo);

// Use middleware to parse POST data and use custom HTTP methods
app.use(express.bodyParser());
app.use(express.methodOverride());

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// == APP ==


var SomeSchema = new mongoose.Schema({
  field1: { type: String, required: true},
  field2: { type: String, required: true}
});

var SomeRefSchema = new mongoose.Schema({
  foo: { type: String, required: true},
  bar: { type: String, required: true},
  baz: { type: mongoose.Schema.ObjectId, ref: 'Source'}
});

SomeRefSchema.index({foo: 1, bar: 1}, {unique: true}); 

var 
  SourceModel = mongoose.model('Source', SourceSchema),
  SearchModel = mongoose.model('Search', SearchSchema);

app.get('/api', function (req, res) {
  res.send('API is running');
});


// example: search for a single item
/*
app.get('/api/search/:for', function(req, res) {
  if(!req.params.for || req.params.for.length < 3 ) {
    return res.send([]);
  }
  SearchModel.find({ "searchFor": new RegExp(req.params.for, 'i') })
    .populate('source')
    .exec(function(err, results) {
    if(!err) {
      return res.send(results);
    } else {
      console.error(err); 
    }
  });
});
*/

app.listen(8349);
