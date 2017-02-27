let mongoose = require('mongoose');
let Medicine = require('../src/model/medicine');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/index');
let expect = chai.expect;

chai.use(chaiHttp);

function fillDBwithMockData() {
	let medicine = new Medicine();
	medicine.english_name = 'Neroli';
	medicine.latin_name = 'Citrus Aurantium';
	medicine.polish_name = '';
	medicine.german_name = '';
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

		it('it should get a shortened list of medicines', (done) => {
			chai.request(server)
				.get('/api/medicine/short')
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.have.deep.property('[0].english_name');
					expect(res.body).to.have.deep.property('[0].latin_name');
					expect(res.body).to.have.deep.property('[0].polish_name');
					expect(res.body).to.have.deep.property('[0].german_name');
					expect(res.body).to.have.deep.property('[0].type');
					expect(res.body).to.have.deep.property('[0]._id');
					expect(res.body).to.not.have.deep.property('[0].organisms');
					expect(res.body).to.not.have.deep.property('[0].ailments');
					expect(res.body).to.not.have.deep.property('[0].active_ingredients');
					done();
				});
		});
	});
});
