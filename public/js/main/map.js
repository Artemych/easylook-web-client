require([
    'lib/jquery',
    'lib/backbone',
    'app/view-model/map',
    'app/view/footer',
    'app/view/header',
    'app/view/secondary-header',
    'app/view/map',
    'app/router/map'
], function ($, Backbone, MapViewModel, FooterView, HeaderView, SecondaryHeaderView, MapView, MapRouter) {
    var mapViewModel = new MapViewModel();

    new FooterView({
        viewModel: mapViewModel
    }).render();

    new HeaderView({
        viewModel: mapViewModel
    }).render();

    new SecondaryHeaderView({
        viewModel: mapViewModel
    }).render();

    new MapView({
        viewModel: mapViewModel
    });

    new MapRouter({
        viewModel: MapRouter
    });
});