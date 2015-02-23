define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'text!app/template/map/icon.html'
], function ($, Handlebars, BaseView, icon) {
    return BaseView.extend({
        tagName: 'span',
        className: 'tracker-icon edit',

        events: {
            'click': 'iconChange'
        },

        render: function () {
            BaseView.prototype.render.apply(this, arguments);

            this.$el.attr('style',
                'background-image: url(' + this.model.get('link') + ')'
            );

            return this;
        },

        iconChange: function (e) {
            var $clickedEl = $(e.target),
                currentTracker = this.viewModel.get('currentTracker');

            if (!currentTracker) {
                return;
            }

            $('.tracker-icon.edit').removeClass('selected');
            var placeMark = $('.map-icon[data-id=' + currentTracker.get('id') +']');
            $clickedEl.addClass('selected');
            if (placeMark) {
                placeMark.attr('style', $clickedEl.attr('style'));
            }
        }
    });
});