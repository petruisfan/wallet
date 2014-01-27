'use strict';

var wallet = angular.module("wallet", ['ngResource']);

wallet.config(function($routeProvider) {
    $routeProvider
        .when("/", {templateUrl: "views/Main.html"})
        .when("/expenses", {templateUrl: "views/expenseList.html", controller: "ExpenseCtrl"})
        .when("/expenses/new", {templateUrl: "views/expenseForm.html", controller: "CreateExpenseCtrl"})
        .when("/expenses/:id/edit", {templateUrl: "views/expenseForm.html", controller: "EditExpenseCtrl"})
        .otherwise({redirectTo: "/"});
});

wallet.controller("ExpenseCtrl", function($http, $scope, Expense) {
    $scope.expenses = Expense.query();
    $scope.sortField = "name";

    $scope.orderBy = function(predicate) {
        $scope.sortField = predicate;
    }
});

wallet.controller("CreateExpenseCtrl", function($scope, Expense, $location) {
    $scope.title = "Add new expense:";
    $scope.button = "Add ";

    $scope.submit = function() {
        $scope.expense.date = new Date().getTime();

        Expense.save($scope.expense,
            function onSuccess() {
                $location.path("/expenses")
            });
    }
});

wallet.controller("EditExpenseCtrl", function($scope, $routeParams, Expense, $location) {
    var id = $routeParams.id;

    $scope.title = "Update expense:"
    $scope.button = "Update ";
    $scope.edit = true;

    $scope.expense = Expense.get({id: id});

    $scope.submit = function() {
        Expense.update($scope.expense,
            function onSuccess() {
                $location.path("/expenses");
            }
        );
    }

    $scope.delete = function() {
        Expense.delete({id: id});
    }
});

wallet.factory("Expense", function($resource) {
    return $resource("/api/expense/:id", {id: "@id"}, {
        update: {method: "PUT"}
    });
})