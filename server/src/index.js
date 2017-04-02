let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let Medicine = require('./model/medicine');
let path = require('path');
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.SERVERPORT || 8080;
let router_api = express.Router();
let router = express.Router();


mongoose.promise = global.Promise;
let options = { promiseLibrary: global.Promise };

if(process.env.NODE_ENV == 'test') {
	mongoose.connect('mongodb://localhost/azfc_db_dev', options); 
}
else {
	mongoose.connect('mongodb://localhost/azfc_db', options); 
}

router.route('/')

	.get((req, res) => {
		res.render('index', {
			title: `AZFC`
		})
	});

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

			res.json({message: 'medicine created'});
		})

	});

router_api.route('/medicine/short')
	.get((req, res) => {
		
		let query = Medicine.find().select({english_name: 1, latin_name: 1, polish_name: 1, german_name: 1, type: 1});
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
var allowCrossDomain = function(req, res, next) {
	//if ('OPTIONS' == req.method) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
	//}
};

app.use(allowCrossDomain);

app.use('/api', router_api);
app.use('/', router);
console.log(process.env.NODE_ENV);
console.log(process.env.PORT);
console.log(process.env.SERVERPORT);
console.log(port);
app.listen(port);

module.exports = app;
