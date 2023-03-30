
const mysql = require('mysql2');
const http = require('http');
const fs = require('fs');

// Maak een verbinding met de database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'gebruikersnaam',
  password: 'wachtwoord',
  database: 'databasenaam'
});

// Maak een HTTP-server
const server = http.createServer((req, res) => {
  // Serveer de scan.html-pagina wanneer de URL '/scan' is
  if (req.url === '/scan') {
    fs.readFile('scan.html', (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write('Pagina niet gevonden');
      } else {
        // Voer een query uit om gegevens op te halen
        connection.query('SELECT * FROM nodes', (error, results, fields) => {
          if (error) {
            console.error(error);
          } else {
            // Formatteer de resultaten in een HTML-string
            let html = '<ul>';
            results.forEach((result) => {
              html += `<li>${result.naam}, ${result.leeftijd}</li>`;
            });
            html += '</ul>';

            // Vervang de inhoud van de 'resultaten' sectie met de HTML
            data = data.toString().replace('{{resultaten}}', html);

            // Stuur de HTML naar de client
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
          }
          res.end();
        });
      }
    });
  } else {
    res.writeHead(404);
    res.write('Pagina niet gevonden');
    res.end();
  }
});

// Start de server
server.listen(3000, () => {
  console.log('Server gestart op poort 3000');
});


