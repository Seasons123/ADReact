# enquire.js

   provides a simple convention based solution to overriding dependencies in node.js.

   enquire is a simple wrapper around the require module; which allows you to require alternative;
   environment specific implementations of a module.

   using nodes core process.env.NODE_ENV environment variable we can setup alternative implementations for
   unit/integration testing; development, uat and production environments etc..


## Installation

    $ npm install enquire


## Features

   using enquire to import dependencies allows you to do some interesting things:

  - provide alternative implementations to your modules when in different environments
   - stub io bound modules in a unit testing environment
   - run integration tests against alternative implementations; for example an in-memory data stores
   - simplify development and debugging by providing stubbed out io bound modules
  - re-use tests by running the same test as a unit or integration test by simply setting process.env.NODE_ENV to
    for example 'unit' or 'integration'



## API

   - load an environment specific implementation of a module based on the current state of process.env.NODE_ENV

		var some-module = enquire.load('/some-module');

   - register an environment/path pair; this override allows you to store alternative implementations in
     different locations.

		enquire.register('uat', 'path-to-uat-modules');  

     by default enquire supports a convention whereby alternative implementations are located under the folder
     of the default implementation. For example:

		/some-module/
		/some-module-unit/
		/some-module-integration/
        /some-module-uat/


## Examples for registering environment/paths

## Example 1;

given I do not register any environment/path and I have an alternative implementation
to a module with the following folder structure

	    /path/some-module/
		/path/some-module-unit-testing/

when i request a module in a unit testing environment

		process.env.NODE_ENV = 'unit-testing';
		
		var module = enquire.load("some-module");

then the module requested should be located in this location

		/path/some-module-unit-testing/


## Example 2;
			
given I register the following environment/path

    	enquire.register('unit-testing', '/path/');

when i request a module in a unit testing environment

		process.env.NODE_ENV = 'unit-testing';
		
		var module = enquire.load("some-module");

then the module requested should be located in this location

		/path/some-module-unit-testing/
		
		

## Examples for loading modules

## Example 1;

given process.env.NODE_ENV is in its default state

when we request the module with enquire
 
    var module = enquire.load('some-module');

then return some_module
   

## Example 2

given process.env.NODE_ENV is set to 'uat'

	process.env.NODE_ENV = 'uat'

when we request some_module

     var module = enquire.load('some_module');

then return some_module-uat


## Example 3

given process.env.NODE_ENV is in its default state 

when we request some_module overriding environment parameter as "uat"

     var module = enquire.load('../test/doubles', "uat");

then return some-module-uat

