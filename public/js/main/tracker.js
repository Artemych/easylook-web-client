require([
    'lib/jquery',
    'lib/backbone',
    'app/view-model/tracker',
    'app/view/shared/header'
], function ($, Backbone, TrackerViewModel, HeaderView) {
    var trackerViewModel = new TrackerViewModel();

    new HeaderView({
        viewModel: trackerViewModel
    }).render();
});