const express = require('express');
//save the express application as a constant named app
const app = express();
const port = 3000;

//require mongoose to connect to mongodb
const mongoose = require('mongoose');
//connect to mongodb atlas via mongoose
mongoose.connect('mongodb+srv://admin:BrdyBOYktXyW51Tf@learnmongo-9fdce.gcp.mongodb.net/to_do_list?retryWrites=true&w=majority', {useNewUrlParser: true});

//set notifications for connection success or failure
let db = mongoose.connection;
//if connection error encountered, output it in the console
db.on('error', console.error.bind(console, 'connection error:'));
//once connected, show a corresponding notification in the console
db.once('open', () => console.log("We're connected to our cloud database"));

//used in handling json request bodies
app.use(express.json());

////used in handling form data
app.use(express.urlencoded({extended:true}));

//define our Schema for a task
//this defines the structure of task documents
//this is done via the Schema() constructor of the mongoose module
const taskSchema = new mongoose.Schema({
	//define the field name with corresponding data type
	name: String,
	status: {
		type: String,
		default: 'pending'
	}
})

//define our Schema for a user
const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	//tasks is an array of embedded task documents, it refers to taskSchema in this case
	tasks: [taskSchema]
})

//compile our task schema into a model named Task
	//in the context of mongoose, a model is a class used in constructing documents
const Task = mongoose.model('Task', taskSchema);

//compile the user schema as a model named User
const User = mongoose.model('User', userSchema);

//the express app has methods corresponding to the various HTTP methods
app.get('/', (req, res) => {
	res.send('hello world');
})

//register a new user
app.post('/users', (req, res) => {
	//check for duplicate username or email prior to registration
	let dupes = User.find({$or: [{username: req.body.username}, {email: req.body.email}]} , (err, duplicates) => {
		//if duplicates found
		if(duplicates.length > 0){
			//return a status 403 - forbidden, with accompanying json with a message property
			return res.status(403).json({
				message: "Duplicates found, kindly choose a different username and/or email."
			})
		}else{
			//instantiate a new user object with properties derived from the request body
			let newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				//tasks is initially an empty array
				tasks: []
			})

			newUser.save((err, newUser)=>{
				//if an error was encountered while saving the document,
				//output the error in the console
				if(err) return console.error(err);
				//return a response with http status code 201 - successful creation
				//and a json that has a message, data containing the newly created User details, and a link to show the newly created user
				return res.status(201).json({
					message: `User ${newUser.username} successfully registered.`,
					data: {
						username: newUser.username,
						email: newUser.email
					},
					link: `/users/${newUser._id}`
				});
			})
		}
	})	
})

//show particular user
app.get('/users/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if(err) return console.error(err);
		return res.status(200).json({
			message: "User retrieved successfully.",
			data: {
				username: user.username,
				email: user.email,
				tasks: `/users/${user._id}/tasks`
			}
		})
	})
})

//get all tasks of a particular user
app.get('/users/:userId/tasks', (req, res) => {
	//retrieve user who owns tasks to be viewed
	User.findById(req.params.userId, (err, user) => {
		if(err) return console.error(err);
		//let tasks = user.tasks;
		if(user.tasks.length > 0){
			return res.status(200).json({
				message: `Tasks of ${user.username} retrieved successfully.`,
				data: user.tasks
			})
		}else{
			return res.status(200).json({
				message: `${user.username} currently has no tasks.`
			})
		}
	})
})

//create a new task for a particular user
app.post('/users/:userId/tasks', (req, res) => {
	//find the user who will register a new task
	User.findById(req.params.userId, (err, user) => {
		if(err) return console.error(err);

		if(user.tasks === []){
			user.tasks.push({
				name: req.body.name
			});
			user.save((err, modifiedUser)=>{
				if(err) return console.error(err);
				return res.status(200).json({
					message: `${user.tasks[0].name} added to task list of ${user.username}.`,
					data: modifiedUser.tasks
				})
			});
		}else{
			//look for duplicate tasks
			let dupes = user.tasks.filter(task => task.name.toLowerCase() === req.body.name.toLowerCase());
			//if duplicates found
			if(dupes.length > 0){
				return res.status(403).json({
					message: `${req.body.name} is already registered as a task.`
				})
			}else{
				//no duplicates found
				user.tasks.push({
					name: req.body.name
				});
				user.save((err, modifiedUser)=>{
					if(err) return console.error(err);
					return res.status(200).json({
						message: `${user.tasks[user.tasks.length-1].name} added to task list of ${user.username}.`,
						data: modifiedUser.tasks
					})
				});
			}
		}
	});
})



app.listen(port, () => console.log(`You got served on port ${port}!`));