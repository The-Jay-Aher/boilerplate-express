let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

// 1st Challenge
// console.log("Hello World")

// 2nd Challenge
// res.send sends a text to the port
// app.get('/', (req, res) => {
//   res.send("Hello Express")
// })

// 7th Challenge
// Middleware functions are functions that take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle
// These functions execute some code that can have side effects on the app, and usually add information to the request or response objects
// They can also end the cycle by sending a response when some condition is met
// If they don’t send the response when they are done, they start the execution of the next function in the stack
// This triggers calling the 3rd argument, next().
//  Express evaluates functions in the order they appear in the code. This is true for middleware too. If you want it to work for all the routes, it should be mounted before them.
// To do this challenge we need to add the statement earlier
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

// 3rd Challenge
// Here __dirname gives us the path where the current project present
// Because, we want to send the index.html file
// We add it to the absolutePath
// To send a file to the server we need to use res.sendFile
// This method will set the appropriate headers to instruct your browser on how to handle the file you want to send, according to its type
// After sending the file, we get the output
const absolutePath = __dirname + '/views/index.html';
app.get('/', (req, res) => {
	res.sendFile(absolutePath);
});

// 4th Challenge
// The first path argument is optional. If you don’t pass it, the middleware will be executed for all requests
// Middleware are functions that intercept route handlers, adding some kind of information
// Here express.static() plays the role of a middleware
app.use('/public', express.static(__dirname + '/public'));

// 5th Challenge
// A REST API allows data exchange in a simple way, without the need for clients to know any detail about the server
// The client only needs to know where the resource is (the URL), and the action it wants to perform on it
// These days, the preferred data format for moving information around the web is JSON
// Simply put, JSON is a convenient way to represent a JavaScript object as a string, so it can be easily transmitted
// app.get('/json', (req, res) => {
// 	res.json({ message: 'Hello json' });
// });

// 6th Challenge
// The .env file is a hidden file that is used to pass environment variables to your application
// This file is secret, no one but you can access it, and it can be used to store data that you want to keep private or hidden
// The environment variables are accessible from the app as process.env.VAR_NAME
// The process.env object is a global Node object, and variables are passed as strings
let response = 'Hello json';
app.get('/json', (req, res) => {
	if (process.env.MESSAGE_STYLE === 'uppercase') {
		res.json({ message: response.toUpperCase() });
	} else {
		res.json({ message: response });
	}
});

// 8th Challenge
// Chaining a middleware on a route
app.get(
	'/now',
	(req, res, next) => {
		// There is a difference in .toLocaleString and .toString
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.send({ time: req.time });
	}
);

// 9th Challenge
// Route parameters are named segments of the URL, delimited by slashes (/)
// Each segment captures the value of the part of the URL which matches its position
// The captured values can be found in the req.params object
// If someone tells you to build a GET or POST endpoint you would achieve the same using app.get(...) or app.post(...) accordingly
app.get('/:word/echo', (req, res) => {
	res.json({ echo: req.params.word });
});

// 10th Challenge
// Another common way to get input from the client is by encoding the data after the route path, using a query string
// The query string is delimited by a question mark (?), and includes field=value couples
// Each couple is separated by an ampersand (&)
// Express can parse the data from the query string, and populate the object req.query
// Some characters, like the percent (%), cannot be in URLs and have to be encoded in a different format before you can send them
app.route('/name').get((req, res) => {
	const firstName = req.query.first;
	const lastName = req.query.last;
	res.json({ name: `${firstName} ${lastName}` });
});

// 11th Challenge
// Besides GET, there is another common HTTP verb, it is POST
// POST is the default method used to send client data with HTML forms
// In REST convention, POST is used to send data to create new items in the database
// In these kind of requests, the data doesn’t appear in the URL, it is hidden in the request body
// The body is a part of the HTTP request, also called the payload
// Even though the data is not visible in the URL, this does not mean that it is private
app.use(bodyParser.urlencoded({ extended: false }));
// Extended is a configuration option that tells body-parser which parsing needs to be used. When extended=false it uses the classic encoding querystring library. When extended=true it uses qs library for parsing.
// When using extended=false, values can be only strings or arrays. The object returned when using querystring does not prototypically inherit from the default JavaScript Object, which means functions like hasOwnProperty, toString will not be available.

// 12th Challenge
app.post('/name', (req, res) => {
	res.json({ name: `${req.body.first} ${req.body.last}` });
});

module.exports = app;
