let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let Medicine = require('./model/medicine');
let path = require('path');

mongoose.connect('mongodb://localhost/azfc_db'); // connect to our database

let app = express();

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;
let router_api = express.Router();
let router = express.Router();

router.route('/')

    .get((req, res) => {
        res.render('index', {
            title: `AZFC`
        })
    });

router.route('/medicine')

    .get((req, res) => {

        Medicine.find((err, result) => {
            if (err) {
                res.send(err);
            }

            res.render('medicine', {
                medicines: result
            })

        })

    });

router_api.route("/medicine")

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
        medicine.eng_name = req.body.eng_name;
        medicine.lat_name = req.body.lat_name;
        medicine.pol_name = req.body.pol_name;
        medicine.ger_name = req.body.ger_name;
        medicine.type = req.body.type;
        medicine.organisms = req.body.organisms.split(',');
        medicine.ailments = req.body.ailments;
        medicine.active_ingredients = req.body.active_ingredients;

        medicine.save(err => {
            if (err) {
                res.send(err);
            }

            res.json({message: 'medicine created'});
        })

    });

/*router_api.route("/medicine/:med_id")

 .get((req, res) => {
 connection.query(query, [req.params.med_id], function (err, rows, fields) {
 if (!err) {
 console.log('The solution is: ', rows);
 res.json(rows);
 }
 else {
 console.log('Error while performing Query.');
 }
 });

 //connection.end();
 });*/

app.use("/api", router_api);
app.use("/", router);

app.listen(port);
