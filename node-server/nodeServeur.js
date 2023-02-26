const host = 'localhost';
const port = 8080;
const express = require('express');
const app = express(); // creation du serveur
const fs = require('fs').promises;


app.get('/', (req, res) => {
    fs.readFile(__dirname + "/../index.html")
      .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
    })
    .catch(err => {
        res.writeHead(500);
        res.end(err);
        return;
    });
})
// le repertoire public va contenir les
// fichiers statiques
app.use(express.static('../'));
// démarrage du serveur sur le port 8080
const server = app.listen(port); 
console.log(`Server is running on http://${host}:${port}`);

