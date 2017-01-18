/*
 * Author:     Vignesh Kumar
 * Copyright:  vigneshuvi
 * Date:	   17/01/2017
 * This file contains the web service environment configuration and register the services and authentications.
 */

'use strict';

// var config = require("./config.json"); 
var express = require('express'),
	request = require('request'),
	config = require('./config.js'),
	https = require('https'),
	http = require('http'),
	bodyParser = require('body-parser'),
	pinterest = require('pinterest'),
	app = express();

// Set the Web service configuration based on Environment.
var wsConfig = config.getConfig(), validateType = null;


app.set('title', wsConfig.title);	// Set the Application title
app.use(bodyParser.json());	// for parsing application/json

// Response the Home Url
app.get('/',function(req,res){
    var resJson = {
					"status" : true,
					"message" : "successfully hit the config webservice.",
					"environment" : process.env.NODE_ENV
				};
	return res.status(200).send(resJson);
});

// Response the Home Url
app.get('/getMe', function(req,res) {
	var reqJson = {"access_token": ""};
    pinterest.getMe(req, res, reqJson, function(req, res, data) {
        var resJson = {
            status : true,
            message : "Successfully fetch the user information.",
            environment : process.env.NODE_ENV,
            "data" : data
        };
        return res.status(200).send(resJson);
    } );
});

// Response the Home Url
app.get('/getMeLikes', function(req,res) {
	var reqJson = {"access_token": ""};
    pinterest.getMeLikes(req, res, reqJson, function(req, res,data) {
        var resJson = {
            status : true,
            message : "Successfully fetch the user information.",
            environment : process.env.NODE_ENV,
            "data" : data
        };
        return res.status(200).send(resJson);
    } );
});

// Response the Home Url
app.get('/getMeBoards', function(req,res) {
	var reqJson = {"access_token":""};
    pinterest.getMeBoards(req, res, reqJson, function(req, res,data) {
                var resJson = {
                    status : true,
                    message : "Successfully fetch the user information.",
                    environment : process.env.NODE_ENV,
                    "data" : data
                };
                return res.status(200).send(resJson);
            });
});

// Response the Home Url
app.get('/getMePins', function(req,res) {
	var reqJson = {"access_token":""};
    pinterest.getMePins(req, res, reqJson, function(req, res, data) {
        var resJson = {
            status : true,
            message : "Successfully fetch the user information.",
            environment : process.env.NODE_ENV,
            "data" : data
        };
        return res.status(200).send(resJson);
    });
});

// Response the Home Url
app.get('/postPins', function(req,res) {
    var reqJson = {
        "access_token" : "",
        "board" : "",
        "image_url" : "",
        "link" : "",
        "note" : ""
    };
    pinterest.postImageInBoard(req, res, reqJson, function(req, res, data) {
        var resJson = {
            status : true,
            message : "Successfully posted the image in Board.",
            environment : process.env.NODE_ENV,
            "data" : data
        };
        return res.status(200).send(resJson);
    });
});

// Validate the https first, if it is enable, just create a https server alone.
if(wsConfig.https.enable) {
	const options = {
	  	key: null,
	  	cert: null
	};

	// Listen the environment port number
	https.createServer(options, app).listen(wsConfig.https.port, function () {
	  	console.log('Example HTTPS app listening on port '+wsConfig.https.port+'!');
	});
} else {
	// Listen the environment port number
	if(wsConfig.http.enable) {
		http.createServer(app).listen(wsConfig.http.port, function () {
		  console.log('Example HTTP app listening on port '+wsConfig.http.port+'!');
		});
	}
}


// Exit or Kill node 
process.on('exit', function (){
  console.log('Goodbye!');
});