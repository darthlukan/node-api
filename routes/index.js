var mongo = require('mongodb');

var Server = mongo.Server;
var db = mongo.Db;
var bson = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new db('test', server);


db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'test'");
        db.collection('testData', {strict: true}, function (err, collection) {
            if (err) {
                console.log("The 'testData' collection doesn't exist.");
            }
        });
    }
});

exports.index = function (req, res) {
  res.render('index', { title: 'Express' });
};

// GET all
exports.findAll = function (req, res) {
    db.collection('testData', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};

// GET id 'uri/id'
exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving item: ' + id);
    db.collection('testData', function (err, collection) {
        collection.findOne({'_id': new bson.ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};

// POST
exports.addStuff = function (req, res) {
    var stuff = req.body;
    console.log("Adding stuff: " + JSON.stringify(stuff));
    db.collection('testData', function (err, collection) {
        collection.insert(stuff, {safe: true}, function (err, result) {
            if (err) {
                res.send({"error": "An error happened"});
            } else {
                console.log("Success: " + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

// PUT
exports.updateStuff = function (req, res) {
    var id = req.params.id;
    var stuff = req.body;
    console.log("Updating stuff: " + id);
    console.log(JSON.stringify(stuff));
    db.collection('testData', function (err, collection) {
        collection.update({"_id": new bson.ObjectID(id)}, stuff, {safe: true}, function (err, result) {
            if (err) {
                console.log("Error updating stuff: " + err);
                res.send({"error": "An error happened"});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(stuff);
            }
        });
    });
};

// DELETE
exports.deleteStuff = function (req, res) {
    var id = req.params.id;
    console.log("Deleting stuff: " + id);
    db.collection('testData', function (err, collection) {
        collection.remove({"_id": new bson.ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({"error": "An error happened - " + err});
            } else {
                console.log("" + result + " document(s) deleted");
                res.send(req.body);
            }
        });
    });
};