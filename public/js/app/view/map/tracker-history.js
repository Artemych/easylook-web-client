define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'text!app/template/map/tracker-history.html'
], function ($, Handlebars, BaseView, trackerHistory) {
    return BaseView.extend({
        className: 'tracker-block',
        template: Handlebars.compile(trackerHistory)
    });
});