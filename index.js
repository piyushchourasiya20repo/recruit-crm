const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const path = require('path');
const adminAuth = require('./src/v1/middleware/adminAuth.middleware');
const authRoutes = require('./src/v1/auth/auth.router');
const candidateRoutes = require('./src/v1/candidates/candidates.router');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/v1/auth', new authRoutes().getRouters());
// app.use(new adminAuth().adminLogin);//jwt auth
app.use('/v1/candidate', new candidateRoutes().getRouters());
app.use(express.static(path.join(__dirname, './src/v1/public/candidateResume/')));


module.exports = app;
