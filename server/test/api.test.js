let mongoose = require('mongoose');
let Medicine = require('../src/model/medicine');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/index');
let expect = chai.expect;

chai.use(chaiHttp);

function fillDBwithMockData() {
	let medicine = new Medicine();
	medicine.eng_name = 'Neroli';
	medicine.lat_name = 'Citrus Aurantium';
	medicine.pol_name = '';
	medicine.ger_name = '';
	medicine.type = 'Essential Oil';
	medicine.organisms = ['Canine', 'Feline'];
	medicine.ailments = ['Psoriasis'];
	medicine.active_ingredients = ['Aura'];

	return medicine.save();
}

describe('Reset the database', () => {
	beforeEach((done) => {
		Medicine.remove()
			.then(fillDBwithMockData())
			.then(done());
	});

	describe('/GET medicine', () => {
		it('it should get a response', (done) => {
			chai.request(server)
				.get('/api/medicine')
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.instanceof(Array);
					expect(res.body.length).to.equal(1);
					done();
				});
		});
	});
});
