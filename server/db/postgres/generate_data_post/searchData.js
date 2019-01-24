const faker = require('faker');
const fs = require('fs');

const categories = ['electronics', 'clothes', 'accessories', 'appliances', 'furniture', 'games', 'books', 'handmade', 'officesupplies', 'software'];

const createCSV = (name) => {
  for (let i = 0; i < 1000; i++) {
    let bigString = '';
    for (let j = 0; j < 10000; j++) {
      const id = (i * 10000 + j);
      const productName = (faker.commerce.productName() + id).toLowerCase();
      let string = [id, productName, name].join(',');
      string += '\r\n';
      bigString += string;
    }
    fs.appendFileSync(`${name}.csv`, bigString);
  }
};

for (let i = 0; i < 10; i++) {
  createCSV(categories[i]);
  const progress = (((i + 1) * 10) + '% complete');
  console.log('Ding ' + progress);
}
