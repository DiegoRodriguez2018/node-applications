const express = require('express');
const router = new express.Router();

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);


router.get('/test', (req, res) => {
    return res.send('api working');
});

const getData = (req, res, next) => {
    const url = 'https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=10';

    axios.get(url)
        .then(info => {
            res.info = info.data;
            next();
        }
        );
    console.log("getting data");
}


router.get('/stocks', getData, (req, res) => {

    console.log (res.info);
    return res.send(res.info);

})


app.listen(port, () => {
    console.log(`listening on ${port}`);
});





