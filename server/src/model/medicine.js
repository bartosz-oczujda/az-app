let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let medicineSchema = new Schema({
    eng_name: String,
    lat_name: String,
    pol_name: String,
    ger_name: String,
    type: String,
    organisms: [String],
    ailments: [String],
    active_ingredients: [String]
});

module.exports = mongoose.model('Medicine', medicineSchema);