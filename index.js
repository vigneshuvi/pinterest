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
     * Method to make GET request
     *
     * @param string url
     * @param Request req
     * @param Response res
     * @param Function callback
     * @invoke callback(Object response)
     */
    get: function(url, shouldParse, req, res, callback) {
        console.log("Requested URL:  "+url);
        request(url, function (err, response, body) {
            if (err) {
                console.error('Error making GET request to endpoint ' + url);
                callback(req, res, shouldParse ? {} : "{}");
            }

            console.log("user response:"+body);
            if (response && response.statusCode !== 200) {
                console.error('non 200 response for URL: ' + url);
                if (body) {
                    callback(shouldParse ? JSON.parse(body) : body);
                } else {
                    callback(req, res, shouldParse ? {} : "{}");
                }
                return;
            } 

            var toReturn = shouldParse ? JSON.parse(body) : body;
            callback(req, res, toReturn);
            return;
        });
    }


    /* 
     * Method to make POST request
     *
     * @param string url
     * @param Request req
     * @param Response res
     * @param JSON data
     * @param Function callback
     * @invoke callback(Object response)
     */
    post: function(requestURL, shouldParse, req, res, data, callback) {
        request.post({url: requestURL, form: data}, function(err, response, body){
         /* ... */ 
                if (err) {
                    console.error('Error making GET request to endpoint ' + url);
                    callback(req, res, shouldParse ? {} : "{}");
                }

                console.log("user response:"+body);
                if (response && response.statusCode !== 200) {
                    console.error('non 200 response for URL: ' + url);
                    if (body) {
                        callback(shouldParse ? JSON.parse(body) : body);
                    } else {
                        callback(req, res, shouldParse ? {} : "{}");
                    }
                    return;
                } 

                var toReturn = shouldParse ? JSON.parse(body) : body;
                callback(req, res, toReturn);
                return;
            }
        }
    }

     /*
     * Get User information based on Access token.
     *
     * @param  {JSON} request
     * @return {JSON} response
     */
    getMe: function(request, response, data, callback) {
        var data = {"access_token":data.access_token, "fields": pinterestWSConfig.Fields.User};
        var requestURL = apiConfig.API_BASE_URL + pinterestWSConfig.WebServices.GetMe;
        if (data) {
            requestURL += '?' + querystring.stringify(data);
        }
        userMethods.get(requestURL, true, request, response, callback);
    },

     /*
     * Get User Boards based on Access token.
     *
     * @param  {JSON} request
     * @return {JSON} response
     */
    getMeBoards: function(request, response, data, callback) {
        var data = {"access_token":data.access_token, "fields": pinterestWSConfig.Fields.Boards};
        var requestURL = apiConfig.API_BASE_URL + pinterestWSConfig.WebServices.GetMeBoards;
        if (data) {
            requestURL += '?' + querystring.stringify(data);
        }
        userMethods.get(requestURL, true, request, response, callback);
    },

    /*
     * Get User Likes based on Access token.
     *
     * @param  {JSON} request
     * @return {JSON} response
     */
    getMeLikes: function(request, response, data, callback) {
        var data = {"access_token":data.access_token, "fields": pinterestWSConfig.Fields.Pins};
        var requestURL = apiConfig.API_BASE_URL + pinterestWSConfig.WebServices.GetMeLikes;
        if (data) {
            requestURL += '?' + querystring.stringify(data);
        }
        userMethods.get(requestURL, true, request, response, callback );
    },

     /*
     * Get User Pins based on Access token.
     *
     * @param  {JSON} request
     * @return {JSON} response
     */
    getMePins: function(request, response, data, callback) {
        var data = {"access_token":data.access_token, "fields": pinterestWSConfig.Fields.Pins};
        var requestURL = apiConfig.API_BASE_URL + pinterestWSConfig.WebServices.GetMePins;
        if (data) {
            requestURL += '?' + querystring.stringify(data);
        }
        userMethods.get(requestURL, true, request, response, callback);
    },

    /*
     * Post Pins based on Access token and image URL.
     *
     * @param  {JSON} request
     * @return {JSON} response
     */
    postImageInBoard: function(request, response, data, callback) {
        var requestURL = apiConfig.API_BASE_URL + pinterestWSConfig.WebServices.PostPins;
        userMethods.get(requestURL, true, request, response, data, callback);
    }


};
 
module.exports = userMethods;