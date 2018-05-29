	var bodyParser = require('body-parser');
	var mongoose = require('mongoose');
	// db connection
	mongoose.connect('mongodb://pramukhkul:abc123@ds137720.mlab.com:37720/pramukhdb');
	//create schema

	var todoSchema = new mongoose.Schema({
		item:String
	});
	//create model
	var Todo = mongoose.model('Todo',todoSchema);
	/*var itemOne = Todo({item:'make tea'}).save(function(err){
		if(err) throw err;
		console.log('item saved');
	});*/

	//var data = [{item:'get milk'},{item:'make tea'},{item:'cook food'}];
	var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
 
	app.get('/todo', function(req,res){
		//get data from mongo
		Todo.find({}, function(err,data){
			if(err) throw err;
			res.render('todo', {todos:data});
		});
		 

	});

	app.post('/todo',urlencodedParser, function(req,res){
		//add data to mongodb
		var newTodo = Todo(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data);
		})
		/*data.push(req.body);
		res.json(data);*/
	});


	app.delete('/todo/:item', function(req,res){
		// delete the item from mongo
		Todo.find({item:req.params.item.replace(/\-/g,' ')}).remove(function(err,data){
			if(err) throw err;
			res.json(data);
		});
		/*data = data.filter(function(todo){
			return todo.item.replace(/ /g,'-') !== req.params.item;
		});
		res.json(data);*/
		
	});

}