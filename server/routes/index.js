/*jslint node: true */
'use strict';

var expenses = [{
        id: 1,
        name: "Food",
        value: 13.5,
        date: 1390853358731
    },{
        id: 2,
        name: "Car",
        value: 234.0,
        date: 1390763358731
    },{
        id: 3,
        name: "Doctor",
        value: 132.5,
        date: 1380863358731
    },{
        id: 4,
        name: "Movie",
        value: 55.5,
        date: 1380963358731
    }];
var id=5;

exports.getAllExpenses = function(req, res) {
    res.json(expenses);
};

exports.getExpense = function(req, res) {
    var id = req.params.id;

    for (var e in expenses) {
        if (expenses[e].id == id) {
            res.json(expenses[e]);
        }
    }

    res.send(404, "Expense not found");
};

exports.addExpense = function(req, res) {
    var expense = req.body;
    expense.id = id++;

    expenses.push(expense);
    res.send(200);
}

exports.updateExpense = function(req, res) {
    var id = req.params.id;
    var expense = req.body;

    for (var e in expenses) {
        if (expenses[e].id == id) {
            expenses[e] = expense;
            res.send(200);
        }
    }
    res.send(404, "Expense not found");
}

exports.deleteExpense = function(req, res) {
    var id = req.params.id;

    for (var e in expenses) {
        if (expenses[e].id == id) {
            expenses.splice(e,1);
            res.send(200);
        }
    }
    res.send(404, "Expense not found");
}
