let mongoose = require('mongoose');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app;
let expect = chai.expect;

chai.use(chaiHttp);


describe('/GET medicine', () => {

    beforeEach(() => {
        delete require.cache[require.resolve('../src/index')];
        app = require('../src/index');
    });

    afterEach(() => {
        app.terminate();
    });

    it('it should get a response', (done) => {
        chai.request(app.server)
            .get('/api/medicine')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.instanceof(Array);
                done();
            });
    });

    it('it should get a shortened list of medicines', (done) => {
        chai.request(app.server)
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

    /*it('gets all the details on the detail route', (done) => {
            chai.request(app)
                .get('api/medicine')
                .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.have.property('english_name');
                     expect(res.body).to.have.property('latin_name');
                     expect(res.body).to.have.property('polish_name');
                     expect(res.body).to.have.property('german_name');
                     expect(res.body).to.have.property('type');
                    expect(res.body).to.have.property('_id');
                    console.log(err);
                    console.log(res);
                    done();
                });
        });*/

});
