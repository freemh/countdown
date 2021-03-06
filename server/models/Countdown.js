let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let CountdownSchema = new mongoose.Schema({
  launch_time: { type: String, required: true },
  title: { type: String, required: [true, "can't be blank"], minlength: 10 },
  description: { type: String, required: [true, "can't be blank"] },
  logo: { type: String, required: [true, "can't be blank"] },
  facebook_url: { type: String },
  twitter_url: { type: String },
  behance_url: { type: String },
}, {timestamps: true});

CountdownSchema.methods.toJSONFor = function(user){
  return {
    launch_time: this.launch_time,
    title: this.title,
    description: this.description,
    logo: this.logo,
    facebook_url: this.facebook_url,
    twitter_url: this.twitter_url,
    behance_url: this.behance_url,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Countdown', CountdownSchema);