
const mysql = require('mysql2/promise');
const fs = require('fs/promises');

async function getNodes() {
  const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alaa',
    waitForConnections: true,
  });

  try {
    const [rows, fields] = await pool.execute('SELECT * FROM nodes');
    return rows;
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

async function checkAndUpdateJson() {
  try {
    const rows = await getNodes();
    const jsonData = JSON.stringify(rows, null, 2);

    // Check if the JSON data has changed
    const currentData = await fs.readFile('nodes.json', 'utf8');
    if (currentData !== jsonData) {
      // Write the new data to the file
      await fs.writeFile('nodes.json', jsonData);
      console.log('Updated nodes.json');
    } else {
      console.log('nodes.json is up-to-date');
    }
  } catch (err) {
    console.error(err);
  }
}

checkAndUpdateJson();
