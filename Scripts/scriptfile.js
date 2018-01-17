var app = angular
			.module("Sarthak",["ui.router"])
			.config(function($stateProvider){
				$stateProvider
					.state("login",{
						url:"/login",
						templateUrl: "../Sarthak/Templates/login.html",
						controller:"login"
					})
                    .state("signup",{
						url:"/signup",
						templateUrl: "../Sarthak/Templates/signup.html",
                        controller:"signup"
					})
                    .state("facultyhome",{
						url:"/home",
						templateUrl: "../Sarthak/Templates/facultyhome.html",
						controller:"facultyhome"
					})
                    .state("studenthome",{
						url:"/home1",
						templateUrl: "../Sarthak/Templates/studenthome.html",
						controller:"studenthome"
					})
                    .state("addschedule",{
						url:"/addschedule",
						templateUrl: "../Sarthak/Templates/editschedule.html",
						controller:"addsch"
					})
                    .state("facultyschedule",{
						url:"/facultyschedule",
						templateUrl: "../Sarthak/Templates/facultyschedule.html",
						controller:"facultyschedule"
					})
                    .state("history",{
						url:"/history",
						templateUrl: "../Sarthak/Templates/history.html",
						controller:"history"
					})
                    .state("submit1",{
                        url:"/done",
						templateUrl: "../Sarthak/Templates/submit1.html",
                        controller:"submit1"
                    })
                    .state("submit",{
                        url:"/requested",
						templateUrl: "../Sarthak/Templates/submit.html",
                        controller:"submit1"
                    })
				})
			.controller("login", function ($scope, $http, $state, $window){
                        $http({
						    method:'Get',
						    url:'http://127.0.0.1:8000/student/',
						    headers : {'Content-Type': 'application/json'}
					    })
					    .then(function(response)
					    {
                            $scope.facultys = response.data;
                            $http({
						        method:'Get',
						        url:'http://127.0.0.1:8000/faculty/',
						        headers : {'Content-Type': 'application/json'}
					        })
					        .then(function(response)
					        {
                                $scope.students = response.data;
                            })
                        })
                $scope.submitForm = function(){
                    //$console.log("AA gya");
					var data = {
							"username":$scope.user.username,
							"password":$scope.user.password
					};
                    console.log($scope.user.s);
                    if($scope.user.s==1){
                            angular.forEach($scope.facultys, function(value,key){
                                var con1, con2;
                                con1 = angular.equals($scope.facultys[key].studentid, data.username);
                                con2 = angular.equals($scope.facultys[key].password, data.password);
							    if(con1 && con2){
                                    $window.localStorage['id'] = $scope.facultys[key].id;
                                    console.log($scope.facultys[key].id);
                                    console.log($window.localStorage['id']);
								    $state.go("studenthome");
                                }
						    })
                    }
                    else {
						    angular.forEach($scope.students, function(value,key){
                                var con3, con4;
                                con3 = angular.equals($scope.students[key].facultyid, data.username);
                                con4 = angular.equals($scope.students[key].password, data.password);
                                console.log($scope.students[key].id);
							    if(con3 && con4){
                                    $window.localStorage['id'] = $scope.students[key].id;
                                    console.log($scope.students[key].id);
							    	$state.go("facultyhome");
                                }
						    })
                    }
                }
			})
            .controller("signup", function ($scope, $http, $state, $window){
                $scope.submitForm = function(){
                        console.log("data0");
                        console.log($scope.user.s);
                    if($scope.user.s==1){
                        console.log("data");
					    var data = {
							"name":$scope.user.name,
                            "email":$scope.user.email,
                            "facultyid":$scope.user.uname,
							"password":$scope.user.password
					    };
                        console.log("data1");
                        $http({
						    method:'Post',
						    url:'http://127.0.0.1:8000/faculty/',
                            data : data,
						    headers : {'Content-Type': 'application/json'}
					    })
                        .then(function(response){
                            $state.go("login");
                        })
                    }
                    else{
					    var data = {
							"name":$scope.user.name,
                            "email":$scope.user.email,
                            "studentid":$scope.user.uname,
							"password":$scope.user.password
					    };
                        $http({
						    method:'Post',
						    url:'http://127.0.0.1:8000/student/',
                            data : data,
						    headers : {'Content-Type': 'application/json'}
					    })
                        .then(function(response){
                            $state.go("login");
                        })
                    }
                }
            })
            .controller("history", function ($scope, $http, $state, $window){
                        $http({
                            method:'Get',
						    url:'http://127.0.0.1:8000/student/'+$window.localStorage['id']+'/',
						    headers : {'Content-Type': 'application/json'}
					    })
					    .then(function(response)
					    {
                            $scope.username = response.data.name;
                             $http({
                                    method:'Get',
						            url:'http://127.0.0.1:8000/history/'+$window.localStorage['id']+'/',
						            headers : {'Content-Type': 'application/json'}
					            })
					            .then(function(response)
					            {
                                    $scope.channels_temp = response.data;
                                    angular.forEach($scope.channels_temp, function(value,key){
                                        $http({
                                            method:'Get',
						                    url:'http://127.0.0.1:8000/faculty/'+$scope.channels_temp[key].faculty_id+'/',
						                    headers : {'Content-Type': 'application/json'}
					                    })
                                        .then(function(response){
                                            $scope.channels_temp[key].faculty_id=response.data.name;
                                        })
						            })
                                })
                        })
                        $scope.logout = function(){
                            $window.localStorage.removeItem('id');
					        $state.go("login");
                        }
            })
            .controller("facultyschedule", function ($scope, $http, $state, $window){
                        $http({
                            method:'Get',
						    url:'http://127.0.0.1:8000/student/'+$window.localStorage['id']+'/',
						    headers : {'Content-Type': 'application/json'}
					    })
					    .then(function(response)
					    {
                            $scope.username = response.data.name;
                             $http({
                                    method:'Get',
						            url:'http://127.0.0.1:8000/schedule/',
						            headers : {'Content-Type': 'application/json'}
					            })
					            .then(function(response)
					            {
                                    $scope.channels_temp = response.data;
                                    angular.forEach($scope.channels_temp, function(value,key){
                                        $http({
                                            method:'Get',
						                    url:'http://127.0.0.1:8000/faculty/'+$scope.channels_temp[key].faculty_id+'/',
						                    headers : {'Content-Type': 'application/json'}
					                    })
                                        .then(function(response){
                                            $scope.channels_temp[key].faculty_id=response.data.name;
                                        })
						            })
                                })
                        })
                        $scope.logout = function(){
                            $window.localStorage.removeItem('id');
					        $state.go("login");
                        }
            })
            .controller("facultyhome", function ($scope, $http, $state, $window){
                        $http({
                            method:'Get',
						    url:'http://127.0.0.1:8000/faculty/'+$window.localStorage['id']+'/',
						    headers : {'Content-Type': 'application/json'}
					    })
					    .then(function(response)
					    {
                            $scope.username = response.data.name;
                            $http({
                                method:'Get',
						        url:'http://127.0.0.1:8000/faculty/'+$window.localStorage['id']+'/',
						        headers : {'Content-Type': 'application/json'}
					        })
					        .then(function(response)
					        {
                                $scope.username = response.data.name;
                                 $http({
                                        method:'Get',
						                url:'http://127.0.0.1:8000/request/'+$window.localStorage['id']+'/',
						                headers : {'Content-Type': 'application/json'}
					                })
					                .then(function(response)
					                {
                                        $scope.channels_temp = response.data;
                                        angular.forEach($scope.channels_temp, function(value,key){
                                            $http({
                                                method:'Get',
						                        url:'http://127.0.0.1:8000/student/'+$scope.channels_temp[key].student_id+'/',
						                        headers : {'Content-Type': 'application/json'}
					                        })
                                            .then(function(response){
                                                $scope.channels_temp[key].faculty_id=response.data.name;
                                                if($scope.channels_temp[key].status=="Waiting"){
                                                    $scope.channels_temp[key].statusid=1;
                                                }
                                                else{
                                                    $scope.channels_temp[key].statusid=0;
                                                }
                                            })
						                })
                                    })
                            })
                        })
                        $scope.logout = function(){
                            $window.localStorage.removeItem('id');
					        $state.go("login");
                        }
                        $scope.approve = function(id){
                            console.log(id);
                                    $http({
                                        method:'Get',
						                url:'http://127.0.0.1:8000/appointment/'+id+'/',
						                headers : {'Content-Type': 'application/json'}
					                })
					                .then(function(response)
					                {
                                         var appointment = response.data;
                                            appointment.status = "Approved"
                                            $http({
                                                method:'Put',
						                        url:'http://127.0.0.1:8000/appointment/'+id+'/',
                                                data : appointment,
						                        headers : {'Content-Type': 'application/json'}
					                        })
                                            .then(function(response){
                                                $state.go($state.current, {}, {reload: true});
                                            })
                                    })
                        }
                        $scope.reject = function(id){
                            console.log(id);
                                    $http({
                                        method:'Get',
						                url:'http://127.0.0.1:8000/appointment/'+id+'/',
						                headers : {'Content-Type': 'application/json'}
					                })
					                .then(function(response)
					                {
                                         var appointment = response.data;
                                            appointment.status = "Rejected"
                                            $http({
                                                method:'Put',
						                        url:'http://127.0.0.1:8000/appointment/'+id+'/',
                                                data : appointment,
						                        headers : {'Content-Type': 'application/json'}
					                        })
                                            .then(function(response){
                                                $state.go($state.current, {}, {reload: true});
                                            })
                                    })
                        }
            })
             .controller("submit1", function ($scope, $http, $state, $window){
                        $http({
                            method:'Get',
						    url:'http://127.0.0.1:8000/faculty/'+$window.localStorage['id']+'/',
						    headers : {'Content-Type': 'application/json'}
					    })
					    .then(function(response)
					    {
                            $scope.username = response.data.name;
                        })
                        $scope.logout = function(){
                            $window.localStorage.removeItem('id');
					        $state.go("login");
                        }
            })
             .controller("submit", function ($scope, $http, $state, $window){
                        $http({
                            method:'Get',
						    url:'http://127.0.0.1:8000/student/'+$window.localStorage['id']+'/',
						    headers : {'Content-Type': 'application/json'}
					    })
					    .then(function(response)
					    {
                            $scope.username = response.data.name;
                        })
                        $scope.logout = function(){
                            $window.localStorage.removeItem('id');
					        $state.go("login");
                        }
            })
            .controller("addsch", function ($scope, $http, $state, $window, $filter){
                        $http({
                            method:'Get',
						    url:'http://127.0.0.1:8000/faculty/'+$window.localStorage['id']+'/',
						    headers : {'Content-Type': 'application/json'}
					    })
					    .then(function(response)
					    {
                            $scope.username = response.data.name;
                        })
                        $scope.logout = function(){
                            $window.localStorage.removeItem('id');
					        $state.go("login");
                        };
                        $scope.submitForm = function(){
                            console.log("data0");
                            var data = {
							    "faculty_id":$window.localStorage['id'],
                                "date": $filter('date')($scope.date, 'yyyy-MM-dd'),
                                "start_time":$filter('date')($scope.startt, 'hh:mm:ss.uuuuuu'),
							    "end_time":$filter('date')($scope.endt, 'hh:mm:ss.uuuuuu')
					        };
                            console.log(data.start_time);
                            $http({
						        method:'Post',
						        url:'http://127.0.0.1:8000/schedule/',
                                data : data,
						        headers : {'Content-Type': 'application/json'}
					        })
                            .then(function(response){
                                $state.go("submit1");
                            })
                        }
            })
            .controller("studenthome", function ($scope, $http, $state, $window){
                        $http({
                            method:'Get',
						    url:'http://127.0.0.1:8000/student/'+$window.localStorage['id']+'/',
						    headers : {'Content-Type': 'application/json'}
					    })
					    .then(function(response)
					    {
                            $scope.username = response.data.name;
                            $http({
					            method:'Get',
					            url:'http://127.0.0.1:8000/faculty/',
					            headers : {'Content-Type': 'application/json'}
                            })
					        .then(function(response)
					            {
						            $scope.facultys = response.data;
					            });
                        })
                        $scope.logout = function(){
                            $window.localStorage.removeItem('id');
					        $state.go("login");
                        }
            })
            .controller("addapp", function ($scope, $http, $state, $window, $filter){
                        $scope.submitForm = function(){
                            console.log("data0");
                            var data = {
                                "faculty_id":$scope.app.fid,
                                "message":$scope.app.message,
                                "subject":$scope.app.subject,
							    "student_id":$window.localStorage['id'],
                                "date": $filter('date')($scope.app.date, 'yyyy-MM-dd'),
                                "feedback": " ",
                                "time":$filter('date')($scope.app.time, 'hh:mm:ss.uuuuuu')
					        };
                            //console.log(data.start_time);
                            $http({
						        method:'Post',
						        url:'http://127.0.0.1:8000/appointment/',
                                data : data,
						        headers : {'Content-Type': 'application/json'}
					        })
                            .then(function(response){
                                $state.go("submit");
                            })
                        }
            })
