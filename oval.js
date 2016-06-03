app.ovalInit = function() {


    $('#oval_btn').on("click",function(e){
      $('#blockInfo').modal('toggle');
      $('#blDone').click(function(event) {
          var blockName = $('#blockName').val();
          $('#blockInfo').modal('toggle');
    var text;
    var oval = app.svg.ellipse().draw().attr({
      fill: '#00FF00',
      stroke: "yellow" ,
      'stroke-width': 4
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
      text.text(blockName+"\n"+oval.node.attributes.rx.nodeValue/5+"X"+oval.node.attributes.ry.nodeValue/5).move(oval.node.cx.baseVal.value,oval.node.cy.baseVal.value);
    });
    oval.on('drawstop', function(e){
      app.index = app.blocks.push({ shape:oval,name: blockName });
      oval.draggable();
      oval.on('dragend', function(e) {
        text.move(oval.node.cx.baseVal.value,oval.node.cy.baseVal.value);
      });
      oval.on('dblclick',function(ev){
        oval.selectize().resize();
        oval.on('resizedone',function(e){
          text.text(blockName+"\n"+oval.node.attributes.rx.nodeValue/5+"X"+oval.node.attributes.ry.nodeValue/5).move(oval.node.cx.baseVal.value,oval.node.cy.baseVal.value);
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
    });

      $('#blDone').off('click');
    });
  });


}