var wx = require('../lib/wx');
var db = require('../models');

(async function() {
  var info = await wx.getAllUsers();
  var users = info.userlist;
  for(var i in users){
    var userParams = users[i];
    var user = await db.User.findOne({
      where:{
        userid: userParams.userid
      }
    });
    if(user){
      await db.User.update({
        name: userParams.name,
        position: userParams.position,
        mobile:userParams.mobile
      })
    }else{
      user = await db.User.create({
        userid: userParams.userid,
        name: userParams.name,
        position: userParams.position,
        mobile:userParams.mobile
      })
    }
  }
  console.log('finished!');
})();