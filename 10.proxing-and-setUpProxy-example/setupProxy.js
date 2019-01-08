// create-react-app is looking for this file, so teh name is important.
// This helps us to avoid the CORS erro but its also very handy for  authentication. 

const proxy = require ('http-proxy-middleware');

module.exports = (app) => {
    app.use(proxy('/api',{target:'http://localhost:5000/'}))
}