$('#confirm').click(function(e) {
    $('#data').hide();
    $('#drawing').removeClass('hidden');
    $('#toolbox').removeClass('hidden');
    // floor width and height
    var width = $('#width').val() * 5;
    var height = $('#height').val() * 5;
    // draw the floor
    var svg = SVG('drawing').size(width, height);
    var rect = svg.rect(width, height).attr({
        fill: '#bdbdbd',
        rx: 10,
        ry: 5
    });
});