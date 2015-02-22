define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'text!app/template/map/icon.html'
], function ($, Handlebars, BaseView, icon) {
    return BaseView.extend({
        tagName: 'span',
        className: 'tracker-icon edit',

        render: function () {
            BaseView.prototype.render.apply(this, arguments);

            this.$el.attr('style',
                'background-image: url(' + this.model.get('link') + ')'
            );

            return this;
        }
    });
});