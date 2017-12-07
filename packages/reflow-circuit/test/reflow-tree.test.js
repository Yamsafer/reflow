import reflowServer from '../lib';
import createTree from '../lib/create-tree'
import _ from 'lodash';
import flareDate from './fixture/flare.json';
import reflowData from './fixture/reflow-data.json';


describe('Server', function() {
  it('returns success', function(done) {
    const app = reflowServer();
    const agent = request.agent(reflowServer());

    agent
      .post('/tree')
      .send(flareDate)
      .expect(200)
      .end(done);
  });
  it.only('builds tree', function() {
    const tree = createTree(reflowData);
    const arr = [
      "A -> B -> C -> D -> F",
      "A -> B -> E -> D -> F",
    ]
    const mapped = arr.map(flow => flow.split(' -> '));
    console.log(
      _.intersection(...mapped)
    )
    // console.log(JSON.stringify(tree, 2, 2));
  })
})


// | Before All -> Visa Mock Card -> Minimum Booking Amount: 0 -> City Attraction -> 3 nights -> Postpaid -> ( Postpaid Suppliers: Expedia ) -> Auth0 User -> 2 adults -> 2 rooms -> 1 child -> ( Search Hotels List: Supplier Omniscience -> Search page, Algolia -> Firsebase Socket request -> Search page, Firebase -> Search Page combined Hotels Result ) -> ( Reserve Booking: Hotel Rates -> Get Reservation Token -> Reservation Details API ) -> Use Wallet: False -> Store booking API -> ( Wallet: Wallet ) -> ( Orders: Orders list API -> Order details API -> Order cancellation API ) -> After All
// | Before All -> Visa Mock Card -> Minimum Booking Amount: 0 -> City Attraction -> 3 nights -> Cardless -> ( Cardless Suppliers: Local ) -> Auth0 User -> 2 adults -> 2 rooms -> 1 child -> ( Search Hotels List: Supplier Omniscience -> Search page, Algolia -> Firsebase Socket request -> Search page, Firebase -> Search Page combined Hotels Result ) -> ( Reserve Booking: Hotel Rates -> Get Reservation Token -> Reservation Details API ) -> Use Wallet: False -> Store booking API -> ( Wallet: Wallet ) -> ( Orders: Orders list API -> Order details API -> Order cancellation API ) -> After All
