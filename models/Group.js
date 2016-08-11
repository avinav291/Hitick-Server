/**
 * Created by sparsh on 10/8/16.
 */
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var SALT_FACTOR = 10;

// Create a group schema
var groupSchema = mongoose.schema({
    groupName: {type: String, required: true, unique: true},
    groupPassword: {type: String, required: true},
    groupMembers: Number,
    adminId: ObjectId
});

groupSchema.methods.name = function () {
    return this.groupName;
};

groupSchema.methods.members = function () {
    return this.groupMembers;
};

var noop = function () {};


// Hash the password before saving
groupSchema.pre("save", function (done) {
    var group = this;
    bcrypt.genSalt(SALT_FACTOR, function (error, salt) {
        if (error) {
            return done(error);
        }
        bcrypt.hash(group.password , salt , noop , function(error , hashedPassword){
            if(error){
                done(error);
            }
            this.password = hashedPassword;
            done();
        });
    });
});

groupSchema.methods.checkPassword = function (guess , done) {
  bcrypt.compare(guess , this.password , function(error , isMatch){
     done(error , isMatch);
  });
};

var Group = mongoose.model("Group" , groupSchema);
module.exports = Group;