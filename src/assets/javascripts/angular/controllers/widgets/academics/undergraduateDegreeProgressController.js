'use strict';

var angular = require('angular');
var _ = require('lodash');

angular.module('calcentral.controllers').controller('UndergraduateDegreeProgressController', function(academicStatusFactory, degreeProgressFactory, apiService, $scope) {
  $scope.degreeProgress = {
    undergraduate: {
      isLoading: true
    }
  };

  var loadDegreeProgress = function() {
    return degreeProgressFactory.getUndergraduateRequirements().then(
      function(response) {
        $scope.degreeProgress.undergraduate.progresses = _.get(response, 'data.feed.degreeProgress.progresses');
        $scope.degreeProgress.undergraduate.links = _.get(response, 'data.feed.links');
        $scope.degreeProgress.undergraduate.errored = _.get(response, 'data.errored');
        $scope.degreeProgress.undergraduate.showCard = apiService.user.profile.features.csDegreeProgressUgrdStudent && apiService.user.profile.roles.undergrad;
      }
    );
  };

  var loadAcademicRoles = function() {
    return academicStatusFactory.getAcademicRoles().then(
      function(parsedAcademicRoles) {
        $scope.isLettersAndScience = _.get(parsedAcademicRoles, 'roles.lettersAndScience');
      }
    );
  };

  var loadInformation = function() {
    loadAcademicRoles()
      .then(loadDegreeProgress)
      .finally(function() {
        $scope.degreeProgress.undergraduate.isLoading = false;
      });
  };

  loadInformation();
});
