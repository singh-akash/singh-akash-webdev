(function() {
    angular
        .module("jga-directives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable(){

        function linker(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                start: function(event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function(event, ui) {
                    final = $(ui.item).index();
                    scope.jgaSortableController.sort(initial, final);
                }
            });
        }

        return {
            scope: {},
            link: linker,
            controller: jgaSortableController,
            controllerAs: 'jgaSortableController'
        }
    }

    function jgaSortableController($routeParams, WidgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(initial, final) {
            WidgetService.sortWidgets(initial, final, $routeParams.pid);
        }
    }
})();