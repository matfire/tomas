// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new mongooseClient.Schema({
  
    email: {type: String, unique: true, lowercase: true},
    password: { type: String },
    elder: {type:Boolean},
    contacts: [{type: Schema.Types.ObjectId, ref:"users"}]
    
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
