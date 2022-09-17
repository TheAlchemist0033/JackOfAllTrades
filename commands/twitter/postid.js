const mongoose = require("mongoose")
	  const hack = mongoose.Schema({
	    //PostIDs:Array,
        PostID:String,
		Exists:Number
	})
module.exports = mongoose.model("postbyid", hack)