const path = require('path');
require('dotenv').config();

let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.promise = global.Promise;

let Medicine = require('./model/medicine');
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let router_api = express.Router();

/*process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected due to api server termination');
		process.exit(0);
	});
});

process.on('exit', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected due to api server termination');
		process.exit(0);
	});
});*/

let options = { promiseLibrary: global.Promise };

mongoose.connect(process.env.DB_URI, options);

router_api.route('/medicine')

	.get((req, res) => {

		Medicine.find((err, result) => {
			if (err) {
				res.send(err);
			}

			res.json(result);

		})

	})

	.post((req, res) => {

		let medicine = new Medicine();
		medicine.english_name = req.body.english_name;
		medicine.latin_name = req.body.latin_name;
		medicine.polish_name = req.body.polish_name;
		medicine.german_name = req.body.german_name;
		medicine.type = req.body.type;
		/*medicine.organisms = req.body.organisms.split(',');
		medicine.ailments = req.body.ailments;
		medicine.active_ingredients = req.body.active_ingredients;*/

		medicine.save(err => {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'medicine created' });
		})

	});

router_api.route('/medicine/short')
	.get((req, res) => {

		let query = Medicine.find().select({ english_name: 1, latin_name: 1, polish_name: 1, german_name: 1, type: 1 });
		query.exec((err, result) => {
			if (err) {
				res.send(err);
			}

			res.json(result);
		});
	});

router_api.route('/medicine/detail/:id')
	.get((req, res) => {
		let id = req.params.id;
		let query = Medicine.findById(id);
		query.exec((err, result) => {
			if (err) {
				res.send(err);
			}

			res.json(result);
		});
	});

//TODO: super unsafe temporary solution - change this
var allowCrossDomain = function (req, res, next) {
	//if ('OPTIONS' == req.method) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
	//}
};

app.use(allowCrossDomain);

app.use('/api', router_api);



let server = app.listen(process.env.SERVER_PORT);
module.exports = {server, terminate: () => {
	server.close(() => {
		mongoose.connection.close(function () {
		console.log('Mongoose disconnected due to api server termination');
		//process.exit(0);
	});
	})
}};
