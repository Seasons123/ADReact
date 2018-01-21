var assert = require("assert");
var path = require('path');
var lib = require(path.join(__dirname, '../lib'));
var enquire = require('../');

describe('enquire.register()', function(){
    describe('when adding a valid path/environment pair to enquires list of paths', function(){
        it('should add path/env pair ', function(){
            enquire.register('uat', '/here/');
            var env_path = enquire.paths['uat'];
            assert.equal(env_path, '/here/');
        })
    }),
    describe('when adding a path/environment pair with invalid environment to enquires list of paths', function(){
        it('should throw error ', function(){
            var expected = new Error("Please provide an environment")
            var recorded_error;

             try {
                enquire.register('', '/here/');
            } catch(err) {
                recorded_error = err;
            }

            assert.equal(recorded_error.message, expected.message);
        })
    }),
    describe('when adding a path/environment pair with invalid path to enquires list of paths', function(){
        it('should throw error ', function(){
            var expected = new Error("Please provide a path")
            var recorded_error;

            try {
                enquire.register('uat', '');
            } catch(err) {
                recorded_error = err;
            }

            assert.equal(recorded_error.message, expected.message);
        })
    })
})
