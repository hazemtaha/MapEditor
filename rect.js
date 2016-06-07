app.rectInit = function() {
  $('#rect_btn').on("click",function(e){
    $('#blockInfo').modal('toggle');
    $('#blCancel').click(function(event) {
      $('#blCancel').off('click');
      $('#blDone').off('click');
    });
    $('#blDone').click(function(event) {
        var blockName = $('#blockName').val();
        $('#blockInfo').modal('toggle');
        var rect = app.svg.rect().draw({snapToGrid:8}).attr({
          fill: '#1ABC9C',
          stroke: "black" ,
          'stroke-width': 5
        });
        var x1;
        var y1;
        var x2;
        var y2;
        var width;
        var height,path;
        var text,drag_rect;
        rect.on('drawstart', function(e){
          x1 = e.detail.p.x;
          y1 = e.detail.p.y;
          text = app.svg.text('').font({
             family:   'verdana'
             , size:    15
             , anchor:   'middle'
             , leading:  '1.5em'
           });
        });
        //$('#rect_btn').off('click');
        rect.on('drawupdate', function(e){
          //console.log(rect.bbox());
          x2 = e.detail.p.x;
          y2 = e.detail.p.y;
         width = Math.abs(x2-x1)/app.scale_width;
         height = Math.abs(y2-y1)/app.scale_height;
         text.text(blockName+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
        });
        rect.on('drawstop', function(e){
          app.index = app.blocks.push({ shape: rect,name: blockName, type:'rect' });
          rect.draggable();
          rect.on('dragend', function(e) {
            text.move(rect.bbox().cx,rect.bbox().cy);
          });
          rect.on('dblclick',function(ev){
            rect.selectize().resize();
            //console.log();
            rect.on('resizedone',function(e){
              var room_type = text.text().split("\n")[0];
              text.text(room_type+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
              rect.selectize(false);
            });
            $(document).on('keydown', function(e){
              if(e.keyCode == 46 && rect._memory._selectHandler.rectSelection.isSelected)
              {
                rect.selectize(false);
                rect.remove();
                text.clear();
                $(document).off('keydown');
              }
              if(e.keyCode == 13) {
                rect.selectize(false);
                $(document).off('keydown');
              }
            });
            ////////////
            $('#setting_btn').on('click',function(){
              $('#toolbox_btns').addClass('hidden');
              $('#room_type').removeClass('hidden');

                $('#living').on('click',function(){
                  if(rect._memory._selectHandler.rectSelection.isSelected)
                  {
                  rect.selectize(false);
                  rect.fill('#FFA07A');
                  text.text(blockName+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
                  }
                });
                $('#reception').on('click',function(){
                  if(rect._memory._selectHandler.rectSelection.isSelected)
                  {
                  rect.selectize(false);
                  rect.fill('#778899');
                  text.text(blockName+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
                  }
                });
                $('#kitchen').on('click',function(){
                  if(rect._memory._selectHandler.rectSelection.isSelected)
                  {
                  rect.selectize(false)
                  rect.fill('#C8F0C8');
                  text.text(blockName+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
                  }
                });
                $('#hallway').on('click',function(){
                  if(rect._memory._selectHandler.rectSelection.isSelected)
                  {
                  rect.selectize(false)
                  rect.fill('#FF5733');
                  text.text(blockName+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
                  }
                });
                $('#bed_room').on('click',function(){
                  if(rect._memory._selectHandler.rectSelection.isSelected)
                  {
                  rect.selectize(false)
                  rect.fill('#FFC0CB');
                  text.text(blockName+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
                  }
                });
                $('#bathroom').on('click',function(){
                  if(rect._memory._selectHandler.rectSelection.isSelected)
                  {
                  rect.selectize(false)
                  rect.fill('#B0C4DE');
                  text.text(blockName+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
                  }
                });
                $('#balcony').on('click',function(){
                  if(rect._memory._selectHandler.rectSelection.isSelected)
                  {
                  rect.selectize(false)
                  rect.fill('#9ACD32');
                  text.text(blockName+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
                  }
                });
                $('#cloest').on('click',function(){
                  if(rect._memory._selectHandler.rectSelection.isSelected)
                  {
                  rect.selectize(false)
                  rect.fill('#7B68EE');
                  text.text(blockName+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
                  }
                });
                $('#other').on('click',function(){
                  if(rect._memory._selectHandler.rectSelection.isSelected)
                  {
                  rect.selectize(false)
                  rect.fill('#BA55D3');
                  text.text(blockName+"\n"+rect.bbox().w/app.scale(app.width,app.height)+"X"+rect.bbox().h/app.scale(app.width,app.height)).move(rect.bbox().cx,rect.bbox().cy);
                  }
                });
                $('#back').on('click',function(){
                  $('#toolbox_btns').removeClass('hidden');
                  $('#room_type').addClass('hidden');
                });
            });
            /////////////

          });
        });
        $('#blDone').off('click');
      });
    });
}
app.isInsideRect = function(point,block){
  var inRect = false;
  var x1 = block.shape.bbox().x;
  var x2 = block.shape.bbox().x2;
  var y1 = block.shape.bbox().y;
  var y2 = block.shape.bbox().y2;
  if(point.x>=x1 && point.x<=x2 && point.y>=y1 && point.y<=y2)
  {
    inRect = true;
  }
  return inRect;
}
