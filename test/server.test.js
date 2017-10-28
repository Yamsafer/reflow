// Supertest allows us to make requests against an express object
import supertest from 'supertest';

app = express();
request = supertest(app);

request
   .get('/')
   .expect('Content-Type', /json/)
   .expect(404, function (err, res) {
       expect(res.body).to.deep.equal({
          status: 'not ok',
          data: null
        });
     done();
   });