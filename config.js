/*
 * Author:     Vignesh Kumar
 * Copyright:  vigneshuvi
 * Date:	   17/01/2017
 * This file contains the environment setup based on the NODE_ENV variable.
 */

'use strict';

var config = require("./envconfig.json"); 

module.exports = {
    // Return the environment configuration based on the NODE_ENV variable.
    getConfig : function() {
        switch(process.env.NODE_ENV) {
            case 'PROD':
                return config.PROD;

            case 'QA':
                return config.QA;

            case 'DEV':
            	return config.DEV;  

            default:
                return config.DEV;
        }
    },

    // Get Pinterest API Key
     getPinterestAPIKey : function() {
        switch(process.env.NODE_ENV) {
            case 'PROD':
                return config.PROD.API_KEY;

            case 'QA':
                return config.QA.API_KEY;

            case 'DEV':
                return config.DEV.API_KEY;  

            default:
                return config.DEV.API_KEY;
        }
    }
};