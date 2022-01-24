/*
 * Create and export configuration variables
 *
 */


// used this file for setting up environments 


// container for envs 
var environments = {};

// staging env 
environments.staging = {
    'http': 3000,
    'https':3001,
    'envName': 'staging',
    'hashingSecret' : 'thisIsASecret',
    'maxChecks' : 10
};

// prod env
environments.production = {
    'http': 5000,
    'https': 5001,
    'envName': 'production',
    'hashingSecret' : 'thisIsAlsoASecret',
    'maxChecks' : 10
};

// get the environment passed in the CLI command 
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check if the environments is one of the above keys from environments objec set it to staging (default)
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.production;

// export the module 
module.exports = environmentToExport;
