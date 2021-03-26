const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema(
  {
    relationshipID: {
      type: String,
      required: true,
      index: true,
    },
    signer: {
      type: String,
      required: true,
      index: false,
    },
  },
  {
    timestamps: false,
  },
);

const Relationship = mongoose.model('relationship', relationshipSchema);

module.exports = Relationship;

