define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base'
], function ($, Handlebars, BaseView) {
    return BaseView.extend({
        cars: {},

        initialize: function () {
            var that = this;
            BaseView.prototype.initialize.apply(that, arguments);

            (function fetchPeriodic () {
                window.setTimeout(function () {
                    that.viewModel.get('periodic').fetch({
                       success: function() {
                           that.setCurrentTrackerData();
                           that.updatePlaceMarks();
                           fetchPeriodic();
                       }
                    });
                }, 30000);
            })();

            var map = new ymaps.Map("map", {
                center: [55.753559, 37.609218 ], // москва
                zoom: 12,
                controls: ["zoomControl"]
            });

            that.viewModel.set('map', map);
            that.viewModel.set('cars', {});

            $.when(that.viewModel.get('promises').periodic).done(function () {
                that.updatePlaceMarks();
            });

            that.listenTo(that.viewModel, 'refreshData', that.refreshData);
        },

        setCurrentTrackerData: function () {
            var currentTracker = this.viewModel.get('currentTracker');
            //@todo think about triggering change
            this.viewModel.unset('currentTrackerData');

            if (!currentTracker) {
                return;
            }

            var currentTrackerData = this.viewModel.get('periodic')
                .getDataByTrackerId(currentTracker.get('id'));

            this.viewModel.set('currentTrackerData', currentTrackerData);
        },

        updatePlaceMarks: function () {
            var that = this,
                periodicData = that.viewModel.get('periodic'),
                currentTracker = that.viewModel.get('currentTracker'),
                map = that.viewModel.get('map');

            _.map(periodicData.models, function (el) {
                var id = el.get('trackerId'),
                    startPoint = [el.get('lat'), el.get('lng')];

                if (that.cars[id]) {
                    that.cars[id].geometry.setCoordinates(startPoint);
                    if (currentTracker && id == currentTracker.get('id')) {
                        if (!that.viewModel.get('currentRoute')) {
                            map.setCenter(startPoint);
                        }
                    }
                } else {
                    var icon = that.viewModel.get('groups').getIconByTrackerId(id);
                    var car = new Car({
                        hintContent: el.get('title'),
                        iconLayout: ymaps.templateLayoutFactory.createClass(
                            '<div class="tracker-icon map-icon" data-id="'+ id +'" style="background-image: url(\'' + icon +'\')"></div>'),
                        coordinates: startPoint,
                        cursor: "pointer",
                        iconShape: {
                            type: 'Circle',
                            coordinates: [0, 0],
                            radius: 10
                        }
                    });

                    car.events.add('click', function (e) {
                        e.stopPropagation();
                        that.viewModel.trigger('clearMapData');

                        map.setCenter(that.cars[id].geometry.getCoordinates());
                        map.setZoom(14);
                        var tracker = that.viewModel.get('groups').getTrackerById(id);
                        that.viewModel.set('currentTracker', tracker);
                        $('.tracker-icon-compass').removeClass('active');
                        $('.tracker-icon-compass[data-id=' + id +']').addClass('active');
                    });

                    map.geoObjects.add(car);
                    that.cars[id] = car;
                }

                if (currentTracker && id == currentTracker.get('id')) {
                    map.setCenter(startPoint);
                    map.setZoom(14);
                }

                that.viewModel.set('cars', that.cars);
            });
        },

        refreshData: function () {
            var that = this;
            that.viewModel.get('promises')
                .fetch({success: function() {
                    that.updatePlaceMarks();
                }});
        }
    });
});
