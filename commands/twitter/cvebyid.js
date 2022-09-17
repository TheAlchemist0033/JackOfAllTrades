const mongoose = require("mongoose")
	  const hack = mongoose.Schema({
	    //PostIDs:Array,
        CVE:String,
		Mentioned:Number,
		Archive:Array,
		Exists:Number
	})
module.exports = mongoose.model("cvebyid", hack)