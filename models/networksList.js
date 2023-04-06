const mongoose = require('mongoose');

const { Schema } = mongoose;

const NetworksListSchema = new Schema({
  networkId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  networkName: {
    type: String,
    required: true,
  },
  networkLogoURL: {
    type: String,
    required: true,
  },
  networkVerifiedStatus: {
    type: Boolean,
    required: true,
  },
  approvalStatus:{
    type:Boolean,
    require:true,
    default: true
  }
});


module.exports = mongoose.model('NetworksList', NetworksListSchema);


