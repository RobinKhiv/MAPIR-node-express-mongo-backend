'use strict';
require('dotenv').config();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const { MongoUri } = require('../config');
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MongoUri, { useNewUrlParser: true,useUnifiedTopology: true  })
    .then(client => {
      console.log('connected'); 
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log('error');
      throw err;
    });
};

const getDb = () => {
  if(_db){
    return _db;   
  }
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;