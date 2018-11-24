const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());
app.all('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.send('Test data');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));