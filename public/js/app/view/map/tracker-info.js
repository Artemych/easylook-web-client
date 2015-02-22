define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base-collection',
    'app/view/map/icon',
    'text!app/template/map/tracker-info.html'
], function ($, Handlebars, BaseCollectionView, Icon, trackerInfo) {
    return BaseCollectionView.extend({
        className: 'tracker-block',
        itemView: Icon,
        template: Handlebars.compile(trackerInfo)
    });
});
