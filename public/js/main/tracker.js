require([
    'lib/jquery',
    'lib/backbone',
    'app/view-model/tracker',
    'app/view/shared/header',
    'app/view/tracker/tracker-wrapper'
], function ($, Backbone, TrackerViewModel, HeaderView, TrackerWrapperView) {
    var trackerViewModel = new TrackerViewModel();

    new HeaderView({
        viewModel: trackerViewModel
    }).render();

    $.when(
        trackerViewModel.get('promises').groups,
        trackerViewModel.get('promises').icons,
        trackerViewModel.get('promises').models,
        trackerViewModel.get('promises').tariffs
    ).done(function() {
            new TrackerWrapperView({
                collection: trackerViewModel.get('groups'),
                viewModel: trackerViewModel
            }).render();
        }
    );
});