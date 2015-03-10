define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'text!app/template/tracker/tracker.html'
], function ($, Handlebars, BaseView, tracker) {
    return BaseView.extend({
        className: 'tracker',
        template: Handlebars.compile(tracker),

        events: {
            'click .tracker-title': 'showTrackerInfo',
            'click .edit-button.tracker-tool': 'showTrackerInfo',
            'click .delete-button.tracker-tool': 'removeModel',
            'click .close-tracker-content': 'close',
            'click .tracker-on': 'trackerOn',
            'click .tracker-off': 'trackerOff',
            'click .content-group-value': 'startEditing',
            'click .tracker-icon-edit': 'editIcon',
            'click .edit-icon': 'editTracker'
        },

        templateData: function () {
            var data = BaseView.prototype.templateData.apply(this, arguments);
            var model = this.viewModel.get('models').getById(this.model.get('modelId'));

            if (!model) {
                model = this.viewModel.get('models').at(0).get('name');
            } else {
                model = model.get('name');
            }

            data.model = model;

            return _.extend(data, {
                groupTitle: this.model.get('trackerGroup').get('title'),
                icons: this.viewModel.get('icons').toJSON(),
                tariffs: this.viewModel.get('tariffs').toJSON(),
                groups: this.viewModel.get('groups').toJSON(),
                models: this.viewModel.get('models').toJSON(),
                isOn: this.model.get('on') == true,
                isOff: this.model.get('on') != true
            });
        },

        showTrackerInfo: function () {
            this.$el.addClass('active');
        },

        removeModel: function () {
            var that = this;
            that.model.destroy({
                wait: true,
                success: function () {}
            });
        },

        close: function () {
            this.$el.removeClass('active');
        },

        trackerOn: function () {
            var that = this;
            that.model.save({
                on: true,
                success: function () {
                    that.render();
                }
            });
        },

        trackerOff: function () {
            var that = this;
            that.model.save({
                on: false
            }, {
                success: function () {
                    that.render();
                }
            });
        },

        editTracker: function (e) {
            var $parent = $(e.target).parent().parent(),
                field = null,
                that = this,
                value = null;
            $parent.find('.content-group-value').show();
            $parent.find('.tracker-edit').hide();
            var $input = $parent.find('.tracker-input');

            if ($input) {
                field = $input.data('field');
            }

            if ($input.is('select') || $input.is('input')) {
                value = $input.val();
            }

            if ($input.is('span')) {
                var $selected = $parent.find('.tracker-input.selected');
                if ($selected) {
                    value = $selected.data('icon-id');
                }
            }

            if (value != null) {
                var data = {};

                data[field] = value;

                this.model.save(data, {
                    success: function () {
                        that.render();
                    },
                    error: function () {
                        console.log('error');
                    }
                });
            }
        },

        startEditing: function (e) {
            var $parent = $(e.target).parent();
            $parent.find('.tracker-edit').show();
            $(e.target).hide();
        },

        editIcon: function (e) {
            $('.tracker-icon-edit').removeClass('selected');
            $(e.target).addClass('selected');
        }
    });
});
