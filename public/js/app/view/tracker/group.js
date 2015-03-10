define([
    'lib/underscore',
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base-collection',
    'app/view/tracker/tracker',
    'text!app/template/tracker/group.html'
], function (_, $, Handlebars, BaseCollectionView, TrackerView, group) {
    return BaseCollectionView.extend({

        className: 'tracker-group',

        template: Handlebars.compile(group),

        itemView: TrackerView,

        events: {
            'click .group-title': 'toggleGroup',
            'click .edit-button.group': 'handleEditGroup',
            'click .edit-button.group-edit': 'handleSave',
            'click .delete-button.group-edit': 'handleCancel',
            'click .delete-button.group': 'handleRemove',
            'click .tracker-icon-edit': 'editIcon'
        },

        initialize: function () {
            var that = this;

            that.config.zeroState = '<div class="empty-tracker-view">У вас пока нет ни одного трекера в данной группе</div>';

            BaseCollectionView.prototype.initialize.apply(that, arguments);
            that.collection = that.model.get('trackers');
            that.listenTo(that.collection, 'add', that.appendChild);
            that.listenTo(that.collection, 'remove', that.removeChild);
        },

        templateData: function () {
            var data = BaseCollectionView.prototype.templateData.apply(this, arguments);

            return _.extend(data, {icons: this.viewModel.get('icons').toJSON()});
        },

        toggleGroup: function (e) {
            $('.tracker-group').removeClass('active');
            this.viewModel.set('currentGroup', this.model);
            this.$el.addClass('active');
        },

        handleEditGroup: function () {
            this.$('.group-inner-block').hide();
            this.$('.group-edit-block').show();
            this.$('input[name="title"]').val(this.$('.group-title').html());
        },

        handleSave: function () {
            var that = this,
                title = this.$('input[name="title"]').val(),
                icon = $('.tracker-icon-edit.selected'),
                iconUrl = this.model.get('icon'),
                iconId = this.viewModel.get('icons').getIdByUrl(iconUrl);

            if (icon) {
                this.$('.group-icon').attr('style', icon.attr('style'));
                iconId = icon.data('icon-id');
                iconUrl = this.viewModel.get('icons').getUrlById(iconId.toString());
            }

            this.model.save({
                title: title,
                iconId: iconId,
                icon: iconUrl
            }, {
                patch: false,
                wait: true,
                success: function () {
                    that.render();
                }
            });
        },

        handleCancel: function () {
            this.$('.group-inner-block').show();
            this.$('.group-edit-block').hide();
        },

        editIcon: function (e) {
            $('.tracker-icon-edit').removeClass('selected');
            $(e.target).addClass('selected');
        },

        handleRemove: function () {
            var that = this;
            that.model.destroy({
                wait: true,
                success: function () {}
            });
        }
    });
});
