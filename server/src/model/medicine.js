let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let medicineSchema = new Schema({
	english_name: String,
	latin_name: String,
	polish_name: String,
	german_name: String,
	type: String,
	/*organisms: [String],
	ailments: [String],
	active_ingredients: [String]*/
});

module.exports = mongoose.model('Medicine', medicineSchema);
