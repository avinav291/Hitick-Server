/**
 * Created by sparsh on 11/8/16.
 */
var mongoose = require("mongoose");

// Define the Poll's structure
var pollSchema = mongoose.Schema({
    groupId: {type: ObjectId, required: true},
    pollTopic: {type: String, required: true},
    submittedAt: {type: Date, required: true},
    stipulatedTime: {type: Number, required: true},
    ongoing: {type: Boolean, required: true},
    inFavor: {type: Number, required: true},
    opposed: {type: Number, required: true},
    notVoted: {type: Number, required: true},
    result: {type: String}
});

var Poll = mongoose.model("Poll" , pollSchema);
module.exports = Poll;