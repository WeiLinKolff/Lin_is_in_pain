fetch('node.json')
  .then(response => response.json())
  .then(data => {
    // Verwerk de JSON-gegevens hier
    data.forEach(item => {
      console.log(`ID: ${item.id}, Question: ${item.question}`);
    });
  })
  .catch(error => console.error(error));
