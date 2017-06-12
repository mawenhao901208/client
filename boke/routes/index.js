var express = require('express');
var router = express.Router();
var mongodb =  require('mongodb').MongoClient;
var db_str  = 'mongodb://localhost:27017/boke';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});
router.get('/login',function(req,res,next){
	res.render('login',{});
})

//留言
router.get('/message',function(req,res,next){
	var findData   =function(db,callback){
		var conn = db.collection('liuyan');
		conn.find({}).toArray(function(err,result){
			callback(result);
		})
	}
	mongodb.connect(db_str,function(err,db){
		if(err){
				console.log('数据库连接失败');
		}else{
			console.log('success');
			findData(db,function(result){
				res.render('message',{result:result});
			})
		}
	});
});
module.exports = router;
