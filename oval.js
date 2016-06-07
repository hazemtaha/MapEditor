app.ovalInit = function() {
    $('#oval_btn').on("click",function(e){
      $('#blockInfo').modal('toggle');
      $('#blDone').click(function(event) {
          var blockName = $('#blockName').val();
          $('#blockInfo').modal('toggle');

    var text;
    var oval = app.svg.ellipse().draw().attr({
      fill: '#1ABC9C',
      stroke: "black" ,
      'stroke-width': 5
    });
    oval.on('drawstart', function(e){
      text =  app.svg.text('').font({
         family:   'verdana'
         , size:    15
         , anchor:   'middle'
         , leading:  '1.5em'
       });
    });
    //$('#oval_btn').off('click');
    oval.on('drawupdate', function(e){
      console.log(oval.bbox());
      text.text(blockName+"\n"+oval.bbox().w/(2*app.scale(app.width,app.height))+"X"+oval.bbox().h/(2*app.scale(app.width,app.height))).move(oval.bbox().cx,oval.bbox().cy);
    });
      oval.on('drawstop', function(e){
      app.index = app.blocks.push({ shape:oval,name: blockName, type: 'oval' });
      oval.draggable();
      oval.on('dragend', function(e) {
        text.move(oval.bbox().cx,oval.bbox().cy);
      });
      oval.on('dblclick',function(ev){
        oval.selectize().resize();
        oval.on('resizedone',function(e){
          text.text(blockName+"\n"+oval.bbox().w/(app.scale(app.width,app.height)*2)+"X"+oval.bbox().h/(app.scale(app.width,app.height)*2)).move(oval.bbox().cx,oval.bbox().cy);
          oval.selectize(false);
        });
        $(document).on('keydown', function(e){
          if(e.keyCode == 46 && oval._memory._selectHandler.rectSelection.isSelected)
          {
            oval.selectize(false);
            ev.target.remove();
            text.clear();
            $(document).off('keydown');
          }
          if(e.keyCode == 13) {
            oval.selectize(false);
            $(document).off('keydown');
          }
        });
      });
      // var testPoint = {x:0,y:0};
      // console.log(app.insideCircle(testPoint,app.blocks[0]));
    });

      $('#blDone').off('click');
    });
  });


}
app.isInsideOval = function(point,block){
  var inOval = false;
  var dx = point.x-block.shape.bbox().cx;
  var dy = point.y-block.shape.bbox().cy;
  var x = dx*dx;
  x = x/((block.shape.bbox().w/2)*(block.shape.bbox().w/2));
  var y = dy*dy;
  y = y/((block.shape.bbox().h/2)*(block.shape.bbox().h/2));
  if((x+y)<=1)
  {
    inOval = true;
  }
  return inOval;
}
