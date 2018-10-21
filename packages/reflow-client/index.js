const masterClient = { element: () => masterClient }

class PageObject {
  constructor(masterClient) {
    const client = rootSelector? masterClient.element(rootSelector) : masterClient;
    Object.assign(this, client);
  }
  addSection(Section) {
    const sectionName = Section.name;
    this[sectionName] = this[sectionName] || new Section(this);
    return this[sectionName]
  }
}

class Rates extends PageObject {
  get rootSelector() {
    return '#rates'
  }
  get currency() {
    return 'USD'
  }
}

class HotelPage extends PageObject {
  get rates() {
    return this.addSection(Rates)
  }
}

const hotel = new HotelPage(masterClient);


console.log('hotel.element:', !!hotel.element)
console.log('hotel.addSection:', !!hotel.addSection)
console.log('hotel.rates:', !!hotel.rates.currency)

