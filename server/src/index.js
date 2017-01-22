let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let Medicine = require('./model/medicine');
let path = require('path');

mongoose.connect('mongodb://localhost/azfc_db'); 

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
 
app.use("/api", router_api);
app.use("/", router);
console.log("Started");
app.listen(port);
