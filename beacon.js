app.beaconInit = function() {
    $('#beacon_btn').click(function(ev) {
      // modal for getting block name
        $('#beaconInfo').modal('toggle');
        $('#bcnCancel').click(function(ev){
          $('#bcnDone').off('click');
          $('#bcnCancel').off('click');
        });
        // done button event
        $('#bcnDone').click(function(ev) {
          // get the block name
            var beaconName = $('#beaconName').val();
            var beaconUUID = $('#uuid').val();
            var beaconMajor = $('#major').val();
            var beaconMinor = $('#minor').val();
            var beaconInfo = {name: beaconName, uuid: beaconUUID, major: beaconMajor, minor: beaconMinor};
            // close the modal
            $('#beaconInfo').modal('toggle');
            // start drawing
            drawBeacon(beaconInfo);
            // delete the click event on done button so that it dosen't get attached multiple times
            $('#bcnDone').off('click');
        });
    });
}

var drawBeacon = function(beaconInfo) {
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
            var log = app.isInAny({x: beacon.bbox().cx, y: beacon.bbox().cy},app.blocks);
            console.log(log);
            app.beacons.push({beacon: beacon, info: beaconInfo});

        });// end of click

    } // end of drawBeacon
