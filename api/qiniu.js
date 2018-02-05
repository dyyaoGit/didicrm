var qiniu = require('qiniu');

var accessKey = 'hiaSMM1QqBT-0Q0KywiDrpp_tXbgBz8p1mFXkoil';
var secretKey = 'A4to1dxJHlKuQ_HuoKWhdf34-J3B_dYzt4eIT5tl';

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {scope: 'didi'};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac)

module.exports = uploadToken;
