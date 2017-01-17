/*
 * Author:     Vignesh Kumar
 * Copyright:  vigneshuvi
 * Date:	   17/01/2017
 * This file contains the integration of Pinterest web service and handle the request and response.
 */


var config = require('./config.js'), 
    pinterestWSConfig = require("./pinterestapiconfig.json"),
    querystring = require('querystring'),
    request = require('request'),
    apiConfig = config.getConfig(); // Set the Web service configuration based on Environment.; 


var userMethods = {

    /*
     * Post Image is useful to post the images in Pinterest.
     *
     * @param  {JSON} request
     * @return {JSON} response
     */
    sampleRequest: function(request) {
        var response = {"status":200};
        return response;
    },

     /*
     * Get User information based on Access token.
     *
     * @param  {JSON} request
     * @return {JSON} response
     */
    getMe: function(request, response) {
        var data = {"access-token":request.access_token, "fields": pinterestWSConfig.Fields.User};
        var requestURL = apiConfig.API_BASE_URL + pinterestWSConfig.WebServices.GetMe;
        if (request.data) {
            requestURL += '?' + querystring.stringify(request.data);
        }
        userMethods.get(requestURL, true,
            function(data) {
                var resJson = {
                    status : true,
                    message : "Successfully fetch the user information.",
                    environment : process.env.NODE_ENV,
                    "data" : data
                }
                return resJson;
            }
        );
    },

     /*
     * Get User information based on Access token.
     *
     * @param  {JSON} request
     * @return {JSON} response
     */
    getMeBoards: function(request, response) {
        var data = {"access-token":request.access_token, "fields": pinterestWSConfig.Fields.Boards};
        var requestURL = apiConfig.API_BASE_URL + pinterestWSConfig.WebServices.GetMeBoards;
        if (request.data) {
            requestURL += '?' + querystring.stringify(request.data);
        }
        userMethods.get(requestURL, true,
            function(data) {
                var resJson = {
                    status : true,
                    message : "Successfully fetch the user boards.",
                    environment : process.env.NODE_ENV,
                    "data" : data
                }
                return resJson;
            }
        );
    },

    /*
     * Get User information based on Access token.
     *
     * @param  {JSON} request
     * @return {JSON} response
     */
    getMeLikes: function(request, response) {
        var data = {"access-token":request.access_token, "fields": pinterestWSConfig.Fields.Pins};
        var requestURL = apiConfig.API_BASE_URL + pinterestWSConfig.WebServices.GetMeLikes;
        if (request.data) {
            requestURL += '?' + querystring.stringify(request.data);
        }
        userMethods.get(requestURL, true,
            function(data) {
                var resJson = {
                    status : true,
                    message : "Successfully fetch the user likes.",
                    environment : process.env.NODE_ENV,
                    "data" : data
                }
                return resJson;
            }
        );
    },

     /*
     * Get User information based on Access token.
     *
     * @param  {JSON} request
     * @return {JSON} response
     */
    getMePins: function(request, response) {
        var data = {"access-token":request.access_token, "fields": pinterestWSConfig.Fields.Pins};
        var requestURL = apiConfig.API_BASE_URL + pinterestWSConfig.WebServices.GetMePins;
        if (request.data) {
            requestURL += '?' + querystring.stringify(request.data);
        }
        userMethods.get(requestURL, true,
            function(data) {
                var resJson = {
                    status : true,
                    message : "Successfully fetch the user pins.",
                    environment : process.env.NODE_ENV,
                    "data" : data
                }
                return resJson;
            }
        );
    },

    /* 
     * Method to make GET request
     *
     * @param string url
     * @param Function callback
     * @invoke callback(Object response)
     */
    get: function(url, shouldParse, callback) {
        request(url, function (err, response, body) {
            if (err) {
                console.error('Error making GET request to endpoint ' + url);
                callback(shouldParse ? {} : "{}");
            }

            console.log("user response:"+body);
            if (response && response.statusCode !== 200) {
                console.error('non 200 response for URL: ' + url);
                callback(shouldParse ? {} : "{}");
                return;
            }
            
            var toReturn = shouldParse ? JSON.parse(body) : body;
            callback(toReturn);
            return;
        });
    }
};
 
module.exports = userMethods;