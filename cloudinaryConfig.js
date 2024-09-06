const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dmearvehn',
  api_key: '894325364693313',
  api_secret: 'pMjEC3HXjEoFE_ij_zkAlwUpMTQ'
});

module.exports = cloudinary;
