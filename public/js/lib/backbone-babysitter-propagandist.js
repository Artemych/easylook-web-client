Backbone.TattletaleContainer = (function (Backbone, _) {
    var Container = function() {
        Backbone.ChildViewContainer.apply(this, arguments);
    };

    _.extend(Container.prototype, Backbone.Events, Backbone.ChildViewContainer.prototype, {
        add: function (view) {
            var that = this;

            Backbone.ChildViewContainer.prototype.add.apply(that, arguments);

            view.on('render', function () {
                var args = _.toArray(arguments);
                args.unshift('render');
                that.trigger.apply(that, args);
            });
        }
    });

    return Container;
})(Backbone, _);