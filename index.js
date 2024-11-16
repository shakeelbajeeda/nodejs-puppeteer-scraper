const express = require('express');
const searchRoutes = require('./app/routes/routes');
const {port} = require("./app/config/config");

const app = express();

app.use(searchRoutes);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})