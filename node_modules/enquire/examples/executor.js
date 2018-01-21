
process.env.NODE_ENV = 'unit';
//process.env.NODE_ENV = 'integration';

var assert = require("assert");
var enquire = require('../');

enquire.register('unit', '../examples/');
enquire.register('integration', '../examples/');

describe(process.env.NODE_ENV + ' testing enquire.load()', function(){
    describe('when registering a user  ', function(){
        it('should save user ', function(){
            var user = {};
            user.username = 'airasoul';
            user.password = '010101';

            var query = require('../examples/query');

            query.register_user(user, function (err) {
                assert.equal(err, null);
            });
        })
    })
})
