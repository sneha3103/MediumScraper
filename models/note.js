var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var NoteSchema = new Schema({
  //titleId is the associated article that we want to attach the note to
  // titleId: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Article"
  // },
  // date: String,

  //users note text that they type in
  // noteText: String,
  // `body` is of type String
  body: {
    type: String
  }
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;