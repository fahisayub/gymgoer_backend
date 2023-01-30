let chai = require('chai');
let chaiHttp=require('chai-http');
chai.use(chaiHttp);
describe('testing listening to port',()=>{
    it('/ status code',(done)=>{
        chai.request('http://localhost:4500').get('/').end((result)=>{
            chai.expect(result).to.have.status(200);
            done();
        })
    })
})