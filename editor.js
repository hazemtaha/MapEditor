var app = {
  blocks: [],
  beacons: []
};
app.index;
$('#confirm').click(function(e) {
    $('#data').hide();
    $('#drawing').removeClass('hidden');
    $('#toolbox').removeClass('hidden');
    // floor width and height
    app.width = $('#width').val();
    app.height = $('#height').val();
app.scale = function(width,height){
  var scale;
  if (width*height<2500) {
    scale = 20;
    width = width*20;
    height = height*20;
  }
  else if(width*height>=2500 && width*height<=10000)
  {
    scale = 10;
    width = width*10;
    height = height*10;
  }
  else if (width*height>10000 && width*height<=50000) {
    scale = 5;
    width = width*5;
    height = height*5;
  }
  else if (width*height>50000 && width*height<=250000) {
    scale = 3;
    width = width*3;
    height = height*3;
  }
  else if (width*height>250000 && width*height<=1000000) {
    scale = 1;
  }
  return scale;
}
    // draw the floor
    app.svg = SVG('drawing').size(app.width*app.scale(app.width,app.height),app.height*app.scale(app.width,app.height));
    var rect = app.svg.rect(app.width*app.scale(app.width,app.height),app.height*app.scale(app.width,app.height)).attr({
        fill: '#bdbdbd'
    });
    app.rectInit();
    app.circleInit();
    app.ovalInit();
    app.polygonInit();
    app.beaconInit();
});
