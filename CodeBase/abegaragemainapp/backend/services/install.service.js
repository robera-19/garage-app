const conn = require('../config/db.config');
// Import the fs module to read our sql file
const fs = require('fs');
// Write a function to create the database tables
async function install() {
  // Create a variable to hold the path to the sql file
  const queryfile = __dirname + '/sql/initial-queries.sql';

  let queries = [];
  let finalMessage = {};
  let templine = '';
  // Read the sql file
  const lines = await fs.readFileSync(queryfile, 'utf-8').split('\n');
  const executed = await new Promise((resolve, reject) => {
    lines.forEach((line) => {
      if (line.trim().startsWith('--') || line.trim() === '') {
        return;
      }
      templine += line;
      if (line.trim().endsWith(';')) {
        const sqlQuery = templine.trim();
        queries.push(sqlQuery);
        templine = '';
      }
    });
    resolve('Queries are added to the list');
  });

  for (let i = 0; i < queries.length; i++) {
    try {
      const result = await conn.query(queries[i]);
      console.log('Table created');
    } catch (err) {
      finalMessage.message = 'Not all tables are created';
    }
  }
  if (!finalMessage.message) {
    finalMessage.message = 'All tables are created';
    finalMessage.status = 200;
  } else {
    finalMessage.status = 500;
  }

  return finalMessage;
}

module.exports = { install };
