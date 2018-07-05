# Page Objects

> pageObjects
>   shared
>   hotel details
>     hotel-gallery.section.js

```javascript
// hotel-gallery.section.js
module.exports = {
  elements: [{id: 'leftNav', selector: '', type: ''}],
}
```

## Usage

```
const leftNav = await client.execute('click', '@hotelGallery.leftNav');
expect('@hotelGallery.leftNav').to.be.present;

const leftNavClass = await client.element('click', '@hotelGallery.leftNav');
```
