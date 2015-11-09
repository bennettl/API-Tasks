// Initialize angular app
var taskApp = angular.module('taskApp', ['ngResource']);

// Create a service
taskApp.service('Task', ['$resource', function($resource){
    return $resource('/api/tasks/:id', null, {
        'update': { method: 'PUT'}
    });
}]);

// Controller
taskApp.controller('TasksCtrl', ['$scope', 'Task', function($scope, Task){
    $scope.newTask = {};

    // Query all tasks
    $scope.tasks = Task.query(function(){});

    // Creates new task
    $scope.create = function(){

        // Don't create empty tasks
        if ($scope.newTask.name.length < 1 || $scope.newTask.name.length < 1){
            return;
        }

        var task = new Task({ name: $scope.newTask.name, note: $scope.newTask.note, completed: false });

        task.$save(function(){
            $scope.tasks.push(task);
            $scope.newTask = {};
        });
    };

    // Delete an existing task
    $scope.delete = function(index){
        var task = $scope.tasks[index];

        Task.remove({id: task._id}, function(){
            $scope.tasks.splice(index, 1);
        });
    };


}]);