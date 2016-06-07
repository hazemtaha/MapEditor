app.ovalInit = function() {
    $('#oval_btn').on("click",function(e){
      $('#blockInfo').modal('toggle');
      $('#blDone').click(function(event) {
          var blockName = $('#blockName').val();
          $('#blockInfo').modal('toggle');

    var text;
    var oval = app.svg.ellipse().draw({snapToGrid:8}).attr({
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
      //console.log(oval.bbox());
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
        ////////////
        $('#setting_btn').on('click',function(){
          $('#toolbox_btns').addClass('hidden');
          $('#room_type').removeClass('hidden');

            $('#living').on('click',function(){
              if(oval._memory._selectHandler.rectSelection.isSelected)
              {
              oval.selectize(false);
              oval.fill('#FFA07A');
              text.text(blockName+"\n"+oval.bbox().w/(app.scale(app.width,app.height)*2)+"X"+oval.bbox().h/(app.scale(app.width,app.height)*2)).move(oval.bbox().cx,oval.bbox().cy);
              }
            });
            $('#reception').on('click',function(){
              if(oval._memory._selectHandler.rectSelection.isSelected)
              {
              oval.selectize(false);
              oval.fill('#778899');
              text.text(blockName+"\n"+oval.bbox().w/(app.scale(app.width,app.height)*2)+"X"+oval.bbox().h/(app.scale(app.width,app.height)*2)).move(oval.bbox().cx,oval.bbox().cy);
            }
            });
            $('#kitchen').on('click',function(){
              if(oval._memory._selectHandler.rectSelection.isSelected)
              {
              oval.selectize(false)
              oval.fill('#C8F0C8');
              text.text(blockName+"\n"+oval.bbox().w/(app.scale(app.width,app.height)*2)+"X"+oval.bbox().h/(app.scale(app.width,app.height)*2)).move(oval.bbox().cx,oval.bbox().cy);              }

            });
            $('#hallway').on('click',function(){
              if(oval._memory._selectHandler.rectSelection.isSelected)
              {
              oval.selectize(false)
              oval.fill('#FF5733');
              text.text(blockName+"\n"+oval.bbox().w/(app.scale(app.width,app.height)*2)+"X"+oval.bbox().h/(app.scale(app.width,app.height)*2)).move(oval.bbox().cx,oval.bbox().cy);              }
            });
            $('#bed_room').on('click',function(){
              if(oval._memory._selectHandler.rectSelection.isSelected)
              {
              oval.selectize(false)
              oval.fill('#FFC0CB');
              text.text(blockName+"\n"+oval.bbox().w/(app.scale(app.width,app.height)*2)+"X"+oval.bbox().h/(app.scale(app.width,app.height)*2)).move(oval.bbox().cx,oval.bbox().cy);              }
            });
            $('#bathroom').on('click',function(){
              if(oval._memory._selectHandler.rectSelection.isSelected)
              {
              oval.selectize(false)
              oval.fill('#B0C4DE');
              text.text(blockName+"\n"+oval.bbox().w/(app.scale(app.width,app.height)*2)+"X"+oval.bbox().h/(app.scale(app.width,app.height)*2)).move(oval.bbox().cx,oval.bbox().cy);
              }
            });
            $('#balcony').on('click',function(){
              if(oval._memory._selectHandler.rectSelection.isSelected)
              {
              oval.selectize(false)
              oval.fill('#9ACD32');
              text.text(blockName+"\n"+oval.bbox().w/(app.scale(app.width,app.height)*2)+"X"+oval.bbox().h/(app.scale(app.width,app.height)*2)).move(oval.bbox().cx,oval.bbox().cy);
              }
            });
            $('#cloest').on('click',function(){
              if(oval._memory._selectHandler.rectSelection.isSelected)
              {
              oval.selectize(false)
              oval.fill('#7B68EE');
              text.text(blockName+"\n"+oval.bbox().w/(app.scale(app.width,app.height)*2)+"X"+oval.bbox().h/(app.scale(app.width,app.height)*2)).move(oval.bbox().cx,oval.bbox().cy);
              }
            });
            $('#other').on('click',function(){
              if(oval._memory._selectHandler.rectSelection.isSelected)
              {
              oval.selectize(false)
              oval.fill('#BA55D3');
              text.text(blockName+"\n"+oval.bbox().w/(app.scale(app.width,app.height)*2)+"X"+oval.bbox().h/(app.scale(app.width,app.height)*2)).move(oval.bbox().cx,oval.bbox().cy);
              }
            });
            $('#back').on('click',function(){
              $('#toolbox_btns').removeClass('hidden');
              $('#room_type').addClass('hidden');
            });
        });
        /////////////
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
