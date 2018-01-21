var assert = require("assert");
var path = require('path');
var lib = require(path.join(__dirname, '../lib'));
var enquire = require('../');

describe('enquire.load()', function(){
    describe('when an empty module is requested', function(){
        it('should throw error - Module requested is empty', function(){
            var expected = new Error("Module requested is empty")
            var recorded_error;

            try {
                enquire.load('');
            } catch(err) {
                recorded_error = err;
            }

            assert.equal(recorded_error.message, expected.message);
        })
    })

    describe('when a module that does not exist is requested', function(){
        it('should throw error - Module could not be found', function(){
            var expected = new Error("Module could not be found")
            var recorded_error;

            try {
                enquire.load('./test/doubles');
            } catch(err) {
                recorded_error = err;
            }

            assert.equal(recorded_error.message, expected.message);
        })
    })

    describe('when valid module request is provided with empty environment', function(){
        it('should return default implementation of module ', function(){
            process.env.NODE_ENV = null;
            var module = enquire.load('../test/doubles');
            assert.notEqual(module, null);
            assert.equal(module(), true);
        })
    })

    describe('when valid module request is provided for development environment', function(){
        it('should return development implementation of module ', function(){
            process.env.NODE_ENV = "development";
            var module = enquire.load('../test/doubles');
            assert.notEqual(module, null);
            assert.equal(module(), true);
        })
    })

    describe('when valid module request is provided for missing environment', function(){
        it('should throw error - Module could not be found', function(){
            process.env.NODE_ENV = "uat";
            var expected = new Error("Module could not be found")
            var recorded_error;

            try {
                enquire.load('../test/doubles');
            } catch(err) {
                recorded_error = err;
            }

            assert.equal(recorded_error.message, expected.message);
        })
    })

    describe('when valid module request is provided for development environment as a parameter', function(){
        it('should return development implementation of module ', function(){
            process.env.NODE_ENV = null;
            var module = enquire.load('../test/doubles', "development");
            assert.notEqual(module, null);
            assert.equal(module(), true);
        })
    })

    describe('when valid module request is provided for uat environment with registered path', function(){
        it('should return uat implementation of module ', function(){
            enquire.register('uat', '../test/double-lib/');
            var env_path = enquire.paths['uat'];
            process.env.NODE_ENV = 'uat';
            var module = enquire.load('doubles');
            assert.notEqual(module, null);
            assert.equal(module(), true);
        })
    })
})