const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
const dir = '/srv';

app.use(express.static(dir));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(dir, 'index.html'));
});

console.log('Listening at 0.0.0.0', port, '...');
app.listen(port);
