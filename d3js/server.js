/*
const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

*/

import { Express } from 'express';

const express = require('express');

const app = express();

const host = 'localhost';
const port = 8000;

app.use(express.static('../public/mychart.html')); // Supposons que votre fichier HTML soit dans un dossier "public"

app.listen(port, () => console.log(`Server listening on port ${port}`));



