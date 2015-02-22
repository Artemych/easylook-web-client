define([
    'lib/jquery',
    'lib/underscore',
    'lib/backbone',
    'lib/handlebars',
    'lib/backbone-babysitter-propagandist'
], function ($, _, Backbone, Handlebars) {
    return Backbone.View.extend({

        propagandUpdate: function () {
            var args = _.toArray(arguments);
            args.unshift('render');
            this.trigger.apply(this, args);
        },

        constructor: function (options) {
            options = options || {};
            this.viewModel = options.viewModel;

            this.childViews = new Backbone.TattletaleContainer();

            this.childViews.on('render', _.bind(this.propagandUpdate, this));

            return Backbone.View.prototype.constructor.apply(this, arguments);
        },

        renderTo: function ($el, insertionMethod) {
            insertionMethod = insertionMethod || 'append';

            $el[insertionMethod](this.el);

            return this.render();
        },

        templateData: function () {
            var data = {};

            if (this.model) {
                data = _(this.model.attributes).clone();
                data.cid = this.model.cid;
            }

            return data;
        },

        render: function () {
            if (this.template) {
                this.$el.html(this.template(this.templateData()));
            }

            this.trigger('render');

            return this;
        },

        remove: function () {
            this.removeChildren();

            return Backbone.View.prototype.remove.apply(this, arguments);
        },

        registerPartial: function (name, template) {
            if (!(name in Handlebars.partials)) {
                Handlebars.registerPartial(name, template);
            }
        }
    });
});
