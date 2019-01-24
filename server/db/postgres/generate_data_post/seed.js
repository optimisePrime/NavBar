const fs = require('fs');
// const { Client }  = require('pg');
const { Pool } = require('pg');
const copyFrom = require('pg-copy-streams').from;

const categories = ['electronics', 'clothes', 'accessories', 'appliances', 'furniture', 'games', 'books', 'handmade', 'officesupplies', 'software'];
const pool = new Pool({
  user: 'liamwilliams',
  host: 'localhost',
  database: 'search_bar_data',
  password: '',
  port: 5432,
});

pool.connect((err, client, done) => {
  const seed = (index) => {
    if (index === 10) {
      return;
    }
    const category = categories[0];
    console.log(`Seeding ${category}`);
    const stream = client.query(copyFrom(`COPY ${category} FROM STDIN CSV;`));
    const fileStream = fs.createReadStream(`${category}.csv`);
    fileStream.on('error', done);
    fileStream.pipe(stream).on('finish', () => done).on('error', (err) => console.log(err));
  };
  seed(0);
});

pool.end();
