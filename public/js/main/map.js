require([
    'lib/jquery',
    'lib/backbone',
    'app/view-model/map',
    'app/view/map',
    'app/router/map'
], function ($, Backbone, MapViewModel, MapView, MapRouter) {
    var mapViewModel = new MapViewModel();

    new MapView({
        viewModel: mapViewModel
    }).render();

    new MapRouter({
        viewModel: MapRouter
    });
});