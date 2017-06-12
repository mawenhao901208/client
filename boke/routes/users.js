var express = require('express');
var router  = express.Router();
var mongodb =  require('mongodb').MongoClient;
var db_str  = 'mongodb://localhost:27017/boke';
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*注册*/
router.post('/register',function(req,res,next){
	
	var sUser      = req.body['username'];
	var sPassword  = req.body['password'];
	var insertName = function(db,callback){
		var conn = db.collection('yonghu');
		var data = [{user:sUser,pass:sPassword}];
		conn.insert(data,function(err,result){
			if(err){
				console.log('连接错误');
			}else{
				callback(result);
				
			}
		})
	};
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log('数据库连接失败');
		}else{
			console.log('success');
			 insertName(db,function(result){	
				res.redirect('/');
				db.close()
			})
		}
	})
})
//登录
router.post('/login',function(req,res,next){
	/*res.send('aaaa');*/
	var sUser      = req.body['username'];
	var sPassword  = req.body['password'];
	var findName   =function(db,callback){
		var conn = db.collection('yonghu');
		var data  = {user:sUser,pass:sPassword};
		conn.find(data).toArray(function(err,result){
			callback(result);
		})
	}
	mongodb.connect(db_str,function(err,db){
		if(err){
				console.log('数据库连接失败');
		}else{
			console.log('success');
			findName(db,function(result){
				if(result.length>0){
					req.session.user = result[0].user;
					res.redirect('/')
					db.close();
				}else{
					res.redirect('/login');
					db.close();
				}
			})
		}
	})
})
//留言

router.post('/message',function(req,res,next){
	if(req.session.user){
		var sNick = req.body['nickname'];
		var sTitle = req.body['title'];
		var sCon   = req.body['message'];
		var insertdata = function(db,callback){
			var conn = db.collection('liuyan');
			var data = [{name:sNick,title:sTitle,con:sCon}];
			conn.insert(data,function(err,result){
				if(err){
					console.log('连接错误')
				}else{
					callback(result);
				}
			})
		};
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log('数据库连接失败');
			}else{
				console.log('success');
				 insertdata(db,function(result){	
					res.redirect('/message');
					db.close()
				})
			}
		})
	}else{
		res.send('从新登录');
	}
		
})
module.exports = router;
