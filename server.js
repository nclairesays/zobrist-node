const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dataSource = require('./dataSource.json')


app.get('/api/products', (req, res) => {
    res.send(
        { dataSource: dataSource })

});


app.listen(port, () => console.log(`Listening on port ${port}`));

