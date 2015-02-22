define([
    'lib/underscore',
    'app/view/shared/base'
], function (_, BaseView) {
    return BaseView.extend({
        config: {
            zeroState: false
        },

        initialize: function () {
            BaseView.prototype.initialize.apply(this, arguments);

            // Example listeners, add to extending view as needed:
            // that.listenTo(that.collection, 'reset sort', that.renderChildren);
            // that.listenTo(that.collection, 'add', that.appendChild);
            // that.listenTo(that.collection, 'remove', that.removeChild);
        },

        render: function () {
            var that = this;

            BaseView.prototype.render.apply(that, arguments);

            if (!that.$childrenContainer) {
                that.$childrenContainer = that.$('.children-container');
                if (that.$childrenContainer.size() === 0) {
                    that.$childrenContainer = that.$el;
                }
            }

            that.renderChildren();

            return that;
        },

        renderChildren: function () {
            var that = this,
                childElements = [];

            this.$childrenContainer.empty();

            that.collection.each(function (model) {
                childElements.push(that.getOrCreateChild(model).el);
            });

            if (that.config.zeroState && that.childViews.length === 0) {
                that.showZeroState();
            }
            else {
                this.$childrenContainer.append(childElements);
            }

            this.trigger('render');

            return that;
        },

        getOrCreateChild: function (model) {
            var childView = this.childViews.findByModel(model);

            if (!childView) {
                childView = this.createChild(model);
            }

            childView.delegateEvents();

            return childView;
        },

        createChild: function (model) {
            var that = this,
                childView;

            childView = new that.itemView({
                model: model,
                viewModel: that.viewModel
            }).render();

            that.childViews.add(childView);

            if (that.config.zeroState && that.childViews.length === 1) {
                that.hideZeroState();
            }

            return childView;
        },

        appendChild: function (model) {
            var childView = this.getOrCreateChild(model);

            this.$childrenContainer.append(childView.el);

            this.trigger('render');

            return childView;
        },

        removeChild: function (model) {
            var that = this,
                childView = that.childViews.findByModel(model);

            if (childView) {
                childView.remove();
                that.childViews.remove(childView);

                if (that.config.zeroState && that.childViews.length === 0) {
                    that.showZeroState();
                }
            }

            this.trigger('render');
        },

        showZeroState: function () {
            this.$childrenContainer.html(this.config.zeroState);
        },

        hideZeroState: function () {
            this.$childrenContainer.empty();
        }
    });
});