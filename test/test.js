
process.env.NODE_ENV = 'test';

import { expect, use } from 'chai';
import chaiHttp from 'chai-http/index.js'; // Usual import (`chai-http') is deprecated.
import { server } from '../src/server.js';

const chaiServer = use(chaiHttp)

describe("Tests", () => {

    // Test for basic GET request
    describe('/GET ', () => {
        it('it should return 404 - Not Found', (done) => {
            chaiServer.request.execute(server)
                .get('/')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('error').eql('Not found');
                    done();
                });
        });
    });

    // Test for POST request with valid JSON format
    describe('/POST Sum', () => {
        it('it should return the sum of the list', (done) => {
            let numbers = [1, 2, 3, 4];
            chaiServer.request.execute(server)
                .post('/sum')
                .send(numbers)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('sum').eql(10);
                    done();
                });
        });
    });

    // Test for POST request with invalid JSON format
    describe('/POST Sum', () => {
        it('it should return 400 - Invalid JSON format', (done) => {
            let numbers = [1, 2, 3, '4'];
            chaiServer.request.execute(server)
                .post('/sum')
                .send(numbers)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('error').eql('Invalid input, expected an array of numbers');
                    done();
                });
        });
    });

    // Test with an invalid format JSON
    describe('/POST Sum', () => {
        it('it should return 400 - Invalid JSON format', (done) => {
            let numbers = '1, 2, 3, 4';
            chaiServer.request.execute(server)
                .post('/sum')
                .send(numbers)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('error').eql('Invalid JSON format');
                    done();
                });
        });
    });
})


