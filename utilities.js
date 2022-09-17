const { number } = require("mathjs")
const mongoose = require("mongoose")
	  const util = mongoose.Schema({
	    //PostIDs:Array,
        comUsed:Number,
        file:Number
	})
module.exports = mongoose.model("utility", util)