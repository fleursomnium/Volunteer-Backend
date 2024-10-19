//profileModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user
  fullName: { type: String, maxlength: 50 },
  address1: { type: String, maxlength: 100 },
  address2: { type: String, maxlength: 100 },
  city: { type: String, maxlength: 100 },
  state: { type: String, enum: [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
    'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
    'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA',
    'WA', 'WV', 'WI', 'WY'
  ] },
  zip: { type: String, maxlength: 9 },
  preferences: { type: String },
  skills: [{ type: String }],
  availability: [{ type: Date }],
}, {
  timestamps: true // Automatically creates 'createdAt' and 'updatedAt'
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;