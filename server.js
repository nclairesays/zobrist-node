const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dataSource = require('./dataSource.json')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/api/products', (req, res) => {
    const {page, size} = req.query
    const {products} = dataSource

    if (page || size ) {
        res.send({ 
            products:queried(products, parseInt(page), parseInt(size)),
            length: products.length
         })
        
    } else  {
        console.log('SEND ALL')
        res.send({ products })
        
    }

});

const queried = (arr, page, size) => {
    let start = ( page - 1 ) * size
    return arr.slice(start, start+size)
}

app.listen(port, () => console.log(`Listening on port ${port}`));

