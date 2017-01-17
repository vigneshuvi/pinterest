/*
 * Author:     Vignesh Kumar
 * Copyright:  vigneshuvi
 * Date:	   17/01/2017
 * This file contains the test cases.
 */


'use strict';

var should = require('chai').should(),
    pinterestConfig = require('../config'),
    pinterest = require('../index');


var getPinterestAPIKey = pinterestConfig.getPinterestAPIKey,
    getMe = pinterest.getMe,
    sampleRequest = pinterest.sampleRequest;

describe('#getPinterestAPIKey', function() {
    it('Check the Pinterest API Key in config', function() {
        var APIKey = getPinterestAPIKey();
        APIKey.should.be.a('string');
    });
});

describe('#sampleRequest', function() {
    it('Test the sample request Pinterest module', function() {
        sampleRequest().should.have.property('status').equal(200);
    });
});

describe('#getMe', function() {
    it('Get Me with access token of Pinterest', function() {
        getMe({"access_token":""}, function(response, data) {
                console.log('Called successfully');
            }).should.have.property('status').equal(200);
    });
});