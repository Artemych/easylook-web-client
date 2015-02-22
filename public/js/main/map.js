require([
    'lib/jquery',
    'lib/backbone',
    'app/view-model/map',
    'app/view/shared/footer',
    'app/view/shared/header',
    'app/view/shared/secondary-header',
    'app/view/map/map',
    'app/view/map/tracker-wrapper',
    'app/router/map'
], function ($, Backbone, MapViewModel, FooterView, HeaderView, SecondaryHeaderView, MapView, TrackerWrapperView, MapRouter) {
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

    $.when(
        mapViewModel.get('promises').groups,
        mapViewModel.get('promises').icons,
        mapViewModel.get('promises').periodic
    ).done(function() {
            new TrackerWrapperView({
                viewModel: mapViewModel
            }).render();
        }
    );

    new MapView({
        viewModel: mapViewModel
    });

    new MapRouter({
        viewModel: MapRouter
    });
});