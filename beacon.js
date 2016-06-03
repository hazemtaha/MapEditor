app.beaconInit = function() {
    $('#beacon_btn').click(drawBeacon);
}

var drawBeacon = function(ev) {
        var beacon;
        app.svg.on('mousemove', function(e) {
            var x = e.pageX - $('#' + app.svg.id()).offset().left;
            var y = e.pageY - $('#' + app.svg.id()).offset().top;
            if (beacon) {
                beacon.move(x - 20, y - 22);
            } else {
                beacon = app.svg.circle(35).stroke({
                    width: 3,
                    color: '#747cf4'
                }).attr('fill', 'none').move(x - 50, y - 50);
            }
        });// end of mousemove
        app.svg.on('click', function(e) {
            var x = e.pageX - $('#' + app.svg.id()).offset().left;
            var y = e.pageY - $('#' + app.svg.id()).offset().top;
            beacon.stroke({
                width: 1,
                color: '#226699'
            }).attr('fill', '#6699cc').move(x - 20, y - 22);
            app.svg.off('mousemove');
            app.svg.off('click');
            app.beacons.push({beacon: beacon});
        });// end of click

    } // end of drawBeacon
