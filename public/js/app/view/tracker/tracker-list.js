define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base-collection',
    'app/view/map/group',
    'text!app/template/map/tracker-list.html'
], function ($, Handlebars, BaseCollectionView, GroupView, trackerList) {
    return BaseCollectionView.extend({
        className: 'tracker-block active',
        template: Handlebars.compile(trackerList),
        itemView: GroupView
    });
});
