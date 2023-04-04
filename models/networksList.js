const mongoose = require('mongoose');

const { Schema } = mongoose;

const NetworksListSchema = new Schema({
  networkId: {
    type: Schema.Types.ObjectId,
  },
  networkLogoURL: {
    type: String,
    required: true,
  },
  networkName: {
    type: String,
    required: true,
  },
  networkVerifiedStatus: {
    type: Boolean,
    required: true,
  },
});


module.exports = mongoose.model('NetworksList', NetworksListSchema);


