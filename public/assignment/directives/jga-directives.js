(function(){
    angular
        .module("jga-directives", [])
        .directive("sortable", sortable);

    function sortable(){

        function linker(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                start: function(event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function(event, ui) {
                    final = $(ui.item).index();
                    scope.sortableController.sort(initial, final);
                }
            });
        }

        return {
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }

    function sortableController($routeParams, WidgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(initial, final) {
            WidgetService.sortWidgets(initial, final, $routeParams.pid);
        }
    }
})();