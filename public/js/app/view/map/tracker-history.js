define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'app/collection/map/history-points',
    'text!app/template/map/tracker-history.html'
], function ($, Handlebars, BaseView, HistoryPoints, trackerHistory) {
    return BaseView.extend({
        className: 'tracker-block',
        template: Handlebars.compile(trackerHistory),
        currentRoute: {},
        currentMapTimer: {},

        events: {
            'click .route': 'buildRoute',
            'click .stop': 'clearMapData'
        },

        initialize: function () {
            var that = this;

            BaseView.prototype.initialize.apply(that, arguments);

            that.listenTo(that.viewModel, 'change:currentTracker', that.changeCurrentTrackerInfo);
            that.listenTo(that.viewModel, 'change:currentTrackerData', that.updateTrackerInfo);
            that.listenTo(that.viewModel, 'clearMapData', that.clearMapData);
        },

        changeCurrentTrackerInfo: function () {
            var model = this.viewModel.get('currentTracker');
            this.$el.toggleClass('active', model);
        },

        updateTrackerInfo: function () {
            var currentTrackerData = this.viewModel.get('currentTrackerData');

            if (!currentTrackerData) {
                return;
            }

            var startDate = this.getDateObject(currentTrackerData.get('logDate') * 1000);
            this.updatePeriod(this.$('.period-row.to'), startDate);
        },

        updatePeriod: function ($periodRow, date) {
            $periodRow.find('.min').val(date.min);
            $periodRow.find('.hour').val(date.hours);
            $periodRow.find('.day').val(date.day);
            $periodRow.find('.month').val(date.month);
            $periodRow.find('.year').val(date.year);
        },

        buildRoute: function () {
            var that = this,
                currentTracker = this.viewModel.get('currentTracker');

            if (!currentTracker) {
                alert('Выберете трекер');
                return;
            }

            var historyPoints = new HistoryPoints(),
                timeStamps = that.getTimeStamps();

            historyPoints.fetch({
                data: {
                    toDate: timeStamps.toDate,
                    fromDate: timeStamps.fromDate,
                    trackerId: currentTracker.get('id')
                },
                success: function (data) {
                    that.handleSuccess(data, that);
                }
            });
        },

        handleSuccess: function(data, context) {
            if (data.length < 0) {
                return;
            }

            if (data.length < 2) {
                alert('В данном промежутке история не существует');
                return;
            }

            var tmproute = [],
                that = context,
                map = that.viewModel.get('map');

            tmproute.push(data.at(data.length - 1).get('point'));

            for(var i = data.length - 2; i > 0; i--) {
                tmproute.push({
                    type: 'viaPoint',
                    point: data.at(i).get('point')
                });
            }

            tmproute.push(data.at(0).get('point'));
            var car = that.viewModel.get('cars')[that.viewModel.get('currentTracker').get('id')];

            ymaps.route(tmproute.reverse()).then(
                function (route) {
                    that.clearMapData();
                    that.currentRoute = route;
                    map.geoObjects.add(route);

                    if (car) {
                        that.currentMapTimer = car.moveTo(route.getPaths().get(0).getSegments(), {
                            speed: 10,
                            directions: 8
                        }, function (geoObject, coords, direction) { // тик движения
                            geoObject.geometry.setCoordinates(coords);
                            map.setCenter(coords);
                            geoObject.properties.set('direction', direction.t);
                        }, function (geoObject) { // приехали
                            geoObject.properties.set('balloonContent', "Приехали!");
                            geoObject.balloon.open();
                            that.clearMapData();
                        });
                    }
                },
                function (error) {
                    alert("Возникла ошибка: " + error.message);
                }
            );

        },

        getTimeStamps: function () {
            var $periodRow = this.$('.period-row.to'),
                min = $periodRow.find('.min').val(),
                hour = $periodRow.find('.hour').val(),
                day = $periodRow.find('.day').val(),
                month = $periodRow.find('.month').val(),
                year = $periodRow.find('.year').val();

            var date = new Date();
            date.setYear("20" + year);
            date.setDate(day);
            date.setMonth(parseInt(month) - 1);
            date.setHours(hour);
            date.setMinutes(min);

            var toDate = date.getTime() / 1000;

            var $periodRow2 = this.$('.period-row.from');
            min = $periodRow2.find('.min').val();
            hour = $periodRow2.find('.hour').val();
            day = $periodRow2.find('.day').val();
            month = $periodRow2.find('.month').val();
            year = $periodRow2.find('.year').val();

            date.setYear("20" + year);
            date.setDate(day);
            date.setMonth(parseInt(month) - 1);
            date.setHours(hour);
            date.setMinutes(min);

            return {
                'fromDate': parseInt(date.getTime() / 1000),
                'toDate': parseInt(toDate)
            }
        },

        clearMapData: function() {
            console.log('clear map data');
            var map = this.viewModel.get('map');
            map.geoObjects.remove(this.currentRoute);
            clearInterval(this.currentMapTimer);
        }
    });
});