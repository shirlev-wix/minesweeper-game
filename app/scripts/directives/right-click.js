'use strict';

(function () {

  /* @ngInject */
  function rightClick($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
          scope.$apply(function () {
            event.preventDefault();
            fn(scope, {$event: event});
          });
        });
      }
    };
  }

  angular
    .module('minesweeperGameAppInternal')
    .directive('rightClick', rightClick);

})();
