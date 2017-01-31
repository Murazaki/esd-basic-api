'use strict';

const Hapi = require('hapi');
const Boom = require("boom");
const crypto = require('crypto');
 
const dbOpts = {
    "url": "mongodb://localhost:27017/diplomeESD",
    "settings": {
        "db": {
            "native_parser": false
        }
    }
};

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({ 
    host: 'localhost', 
    port: 8000 
});


// Add the route
server.route({
    method: 'GET',
    path: '/eleves', 
    handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

        db.collection('eleves').find({}, function(err, result) {
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            reply(result.toArray());
        });
    }
});

server.route({
    method: 'GET',
    path: '/eleve/{hash}', 
    handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
      
        db.collection('eleves').findOne({ "hash": request.params.hash }, function(err, result) {
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            reply(result);
        });
    }
});

server.route({
    method: 'POST',
    path: '/eleve/{hash}', 
    handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
      
        const values = Object.assign({ "hash": request.params.hash }, request.payload);
      
        db.collection('eleves').update({ "hash": request.params.hash }, values, function(err, result) {
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            reply(result);
        });
    }
});

server.route({
    method: 'POST',
    path: '/eleve', 
    handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
      
        const hash = crypto.createHash('sha256');
      
        const values = Object.assign({ "hash": hash.digest('hex') }, request.payload);

        db.collection('eleves').insert(values, function(err, result) {
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            reply(result);
        });
    }
});

server.route({
    method: 'DELETE',
    path: '/eleve/{hash}', 
    handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
      
        db.collection('eleves').remove({ "hash": request.params.hash }, function(err, result) {
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            reply(result);
        });
    }
});


server.route({
    method: 'DELETE',
    path: '/eleves', 
    handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

        db.collection('eleves').remove({}, function(err, result) {
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            reply(result);
        });
    }
});

server.route({
    method: 'DELETE',
    path: '/dbeleves', 
    handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

        db.collection('eleves').drop(function(err, result) {
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            reply(result);
        });
    }
});

server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
  
  // Start the server
  server.start((err) => {

      if (err) {
          throw err;
      }
      console.log('Server running at:', server.info.uri);
  });
});