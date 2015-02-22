define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'text!app/template/map/tracker-condition.html'
], function ($, Handlebars, BaseView, trackerCondition) {
    return BaseView.extend({
        className: 'tracker-block',
        template: Handlebars.compile(trackerCondition)
    });
});