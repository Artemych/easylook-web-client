define([
    'lib/underscore',
    'lib/backbone',
    'lib/backbone-relational'
], function (_, Backbone) {
    return Backbone.RelationalModel.extend({
        unset: function (attribute, options) {
            var that = this;

            if (_(attribute).isArray()) {
                _(attribute).each(function (attributeName) {
                    that.set(attributeName, null, _({}).extend(options, {
                        unset: true
                    }));
                });
            }
            else {
                Backbone.Model.prototype.unset.apply(that, arguments);
            }
        },

        listenToOnceDefined: function (key, event, callback) {
            if (this.get(key)) {
                this.listenTo(this.get(key), event, callback);
            }
            else {
                this.once('change:' + key, function (model, value) {
                    this.listenTo(value, event, callback);
                });
            }
        },

        toJSON: function () {
            return _(Backbone.RelationalModel.prototype.toJSON.apply(this, arguments)).omit('cid', 'lastUpdated');
        }
    });
});