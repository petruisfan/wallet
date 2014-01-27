/*jslint node: true */
'use strict';
var express = require('express'),
    routes = require('./routes'),
    app = express();

app.use(express.bodyParser());

app.get('/api/expense', routes.getAllExpenses);
app.get('/api/expense/:id', routes.getExpense);
app.post('/api/expense', routes.addExpense);
app.put('/api/expense/:id', routes.updateExpense);
app.delete('/api/expense/:id', routes.deleteExpense);


module.exports = app;