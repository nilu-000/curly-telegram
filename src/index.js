const express = require('express');
const app = express();
const routes = require('./routes/routes');
require('dotenv/config');
PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded());
routes.forEach(route => {
    app.use(route);
})


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})