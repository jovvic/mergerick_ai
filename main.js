var maxWidth = 400
var bars = {}; //storage for bars (bar number indexed by group object)
var selectedBar = null; //selected bar (group object)
var placeholder = new fabric.Text("XXXXX", { fontSize: 12 });

$(function(){
  var canvas = new fabric.Canvas('canvas', {
    renderOnAddition: true,
    hoverCursor: 'pointer',
    selection: true });

  // ■　begin of http://jsfiddle.net/RRv3g/3/

  //pass null or a bar
  function selectBar(bar) {
    if (selectedBar) {
        //remove the old topmost bar and put it back in the right zindex
        //PROBLEM: It doesn't go back; it stays at the same zindex
        //selectedBar.remove();
        canvas.moveTo(selectedBar, selectedBar.XZIndex);
        selectedBar = null;
     }

    if (bar) {
        //put a placeholder object ("XXX" for now) in the position
        //where the bar was, and put the bar in the top position
        //so it shows topmost
        selectedBar = bar;
        canvas.bringToFront(selectedBar);
        //canvas.moveTo(selectedBar, canvas.size()-1);
        canvas.add(bar);
        canvas.renderAll();
        }
    }

 canvas.on({
     'mouse:down': function(e) {
     //hook up dynamic zorder
     if (!e.target) return;
     if (bars[e.target])
           selectBar(e.target);
     else
            selectBar(null);
     },
   });

    // ■　---> end of http://jsfiddle.net/RRv3g/3/

  var $download = $('#download');

  var $text = $('#text');
  var $text2 = $('#text2');
  var $text3 = $('#text3');

  var $strokeColor=  $('#stroke-color');
  var $strokeColor2=  $('#stroke-color2');
  var $strokeColor3=  $('#stroke-color3');

  var $fillColor=  $('#fill-color');
  var $fillColor2=  $('#fill-color2');
  var $fillColor3=  $('#fill-color3');

  var lgtmText = null;
  var lgtmText2 = null;
  var lgtmText3 = null;

  var $file = $('input[type=file]');

  // about fonts http://jsfiddle.net/mvprzy/szzGa/

  var $fontFamilies = $('#font-families');
  var $fontFamilies2 = $('#font-families2');
  var $fontFamilies3 = $('#font-families3');
  var $fontFamilies4 = $('#font-families4');

  var $fontFamily = $('#font-family');
  var $fontFamily2 = $('#font-family2');
  var $fontFamily3 = $('#font-family3');

  var $fontFamily4 = $('#font-family4');

  var $bold = $('#bold');
  var $bold2 = $('#bold2');
  var $bold3 = $('#bold3');

  var $italic = $('#italic');
  var $italic2 = $('#italic2');
  var $italic3 = $('#italic3');

  // ------------
  $(document).on('dragover', function(e){
    e.preventDefault()
  }).on('drop', function(e){
    e.preventDefault()
    setImage(e.originalEvent.dataTransfer.files[0]);
  });

  $file.on('change', function(e){
    setImage(e.target.files[0]);
  });

  $download.on('click', function(){
    canvas.deactivateAll().renderAll()
    $download.attr('href', canvas.getElement().toDataURL());
  });

  // ------------
  $text.on('change', function(){
    if(!lgtmText) { return; }
    lgtmText.setText($text.val());
    canvas.renderAll();
  });

  $text2.on('change', function(){
    if(!lgtmText2) { return; }
    lgtmText2.setText($text2.val());
    canvas.renderAll();
  });

  $text3.on('change', function(){
    if(!lgtmText3) { return; }
    lgtmText3.setText($text3.val());
    canvas.renderAll();
  });

    // --------------------
  $strokeColor.on('change', function(){
    if(!lgtmText) { return; }
    lgtmText.setStroke($strokeColor.val());
    canvas.renderAll();
  });

   $strokeColor2.on('change', function(){
       if(!lgtmText2) { return; }
       lgtmText2.setStroke($strokeColor2.val());
       canvas.renderAll();
     });

   $strokeColor3.on('change', function(){
       if(!lgtmText3) { return; }
       lgtmText3.setStroke($strokeColor3.val());
       canvas.renderAll();
     });

  // --------------------
  $fillColor.on('change', function(){
    if(!lgtmText) { return; }
    lgtmText.setFill($fillColor.val());
    canvas.renderAll();
  });

  $fillColor2.on('change', function(){
    if(!lgtmText2) { return; }
    lgtmText2.setFill($fillColor2.val());
    canvas.renderAll();
  });

  $fillColor3.on('change', function(){
    if(!lgtmText3) { return; }
    lgtmText3.setFill($fillColor3.val());
    canvas.renderAll();
  });
    // -----------------------

  $fontFamilies.on('change', function(){
    $fontFamily.val($fontFamilies.val());
    if(!lgtmText) { return; }
    lgtmText.setFontFamily($fontFamilies.val());
    canvas.renderAll();
  });

  $fontFamilies2.on('change', function(){
        $fontFamily2.val($fontFamilies2.val());
        if(!lgtmText2) { return; }
        lgtmText2.setFontFamily($fontFamilies2.val());
        canvas.renderAll();
      });

    $fontFamilies3.on('change', function(){
        $fontFamily3.val($fontFamilies3.val());
        if(!lgtmText3) { return; }
        lgtmText3.setFontFamily($fontFamilies3.val());
        canvas.renderAll();
      });
    // -----------------------

  $fontFamily.on('change', function(){
    if(!lgtmText) { return; }
    lgtmText.setFontFamily($fontFamily.val());
    canvas.renderAll();
  });

  $fontFamily2.on('change', function(){
    if(!lgtmText2) { return; }
    lgtmText2.setFontFamily($fontFamily2.val());
    canvas.renderAll();
  });

  $fontFamily3.on('change', function(){
    if(!lgtmText3) { return; }
    lgtmText3.setFontFamily($fontFamily3.val());
    canvas.renderAll();
  });
    // --------------------------

  $bold.on('change', function(){
    if(!lgtmText) { return; }
    lgtmText.setFontWeight($bold.is(':checked') ? 'bold' : null);
    canvas.renderAll();
  });

  $bold2.on('change', function(){
    if(!lgtmText2) { return; }
    lgtmText2.setFontWeight($bold.is(':checked') ? 'bold' : null);
    canvas.renderAll();
  });

  $bold3.on('change', function(){
    if(!lgtmText3) { return; }
    lgtmText3.setFontWeight($bold.is(':checked') ? 'bold' : null);
    canvas.renderAll();
  });

    // ---------------
  $italic.on('change', function(){
    if(!lgtmText) { return; }
    lgtmText.setFontStyle($italic.is(':checked') ? 'italic' : null);
    canvas.renderAll();
  });

  $italic2.on('change', function(){
    if(!lgtmText2) { return; }
    lgtmText2.setFontStyle($italic.is(':checked') ? 'italic' : null);
    canvas.renderAll();
  });

    $italic3.on('change', function(){
    if(!lgtmText3) { return; }
    lgtmText3.setFontStyle($italic3.is(':checked') ? 'italic' : null);
    canvas.renderAll();
  });

// ----------------

  var setImage = function(file){
    if(!file) { return; }
    var imageReader = new FileReader;

    imageReader.onload = function(e){
      var image = new Image;

      image.onload = function(){

        var fabricImage = new fabric.Image(image);
        var fabricImage = new fabric.Image(image);
        var aspect = fabricImage.width / fabricImage.height;
        var width = Math.min(image.width, maxWidth)

        fabricImage.set({
          selectable: true,
          width:  width,
          height: width / aspect
        });

       canvas.setWidth(fabricImage.width*2);     // original values
       canvas.setHeight(fabricImage.height*2);

       lgtmText = new fabric.Text($text.val());
       lgtmText.set({
          fontSize: 64,
          fontFamily: $fontFamily.val(),
          stroke: '#000',
          strokeWidth: 2,
          fill: '#fff',
          left: (fabricImage.width - lgtmText.width+10) / 2,
          top:  (fabricImage.height - lgtmText.height+10) / 2,
          cornerSize: 6,
          cornerColor: '#6699ff',
          transparentCorners: false,
          fontWeight: ($bold.is(':checked') ? 'bold' : null),
          fontStyle: ($italic.is(':checked') ? 'italic' : null)
        });


        lgtmText2 = new fabric.Text($text2.val());
        lgtmText2.set({
          fontSize: 64,
          fontFamily: $fontFamily2.val(),
          stroke: '#000',
          strokeWidth: 2,
          fill: '#fff',
          left: (fabricImage.width - lgtmText2.width+50) / 2,
          top:  (fabricImage.height - lgtmText2.height+50) / 2,
          cornerSize: 6,
          cornerColor: '#6699ff',
          transparentCorners: false,
          fontWeight: ($bold2.is(':checked') ? 'bold' : null),
          fontStyle: ($italic2.is(':checked') ? 'italic' : null)
        });

        lgtmText3 = new fabric.Text($text3.val());
        lgtmText3.set({
          fontSize: 64,
          fontFamily: $fontFamily3.val(),
          stroke: '#000',
          strokeWidth: 2,
          fill: '#fff',
          left: (fabricImage.width - lgtmText3.width+70) / 2,
          top:  (fabricImage.height - lgtmText3.height+70) / 2,
          cornerSize: 6,
          cornerColor: '#6699ff',
          transparentCorners: false,
          fontWeight: ($bold3.is(':checked') ? 'bold' : null),
          fontStyle: ($italic3.is(':checked') ? 'italic' : null)
        });

        canvas.clear()
        canvas.add(fabricImage);
        canvas.add(lgtmText);
        canvas.add(lgtmText2);
        canvas.add(lgtmText3);

        var objcount = canvas.getObjects().length;
        // -------------------------------
        var group1 = new fabric.Group([lgtmText], {
           left: 200,
           top: 100
        });
        group1.hasControls = group1.hasBorders = true;

        //our properties (not part of fabric)
        group1.XBar = lgtmText;
        group1.XZIndex = objcount++;
        canvas.add(group1);
        bars[group1] = 0;

        canvas.renderAll();

        // -------------------------------
        var group2 = new fabric.Group([lgtmText2], {
           left: 200,
           top: 100
        });
        group2.hasControls = group2.hasBorders = true;

        //our properties (not part of fabric)
        group2.XBar = lgtmText2;
        group2.XZIndex = objcount++;
        canvas.add(group2);
        bars[group2] = 1;

        // -------------------------------
        var group3 = new fabric.Group([lgtmText3], {
           left: 200,
           top: 100
        });

        group3.hasControls = group3.hasBorders = true;

        //our properties (not part of fabric)
        group3.XBar = lgtmText3;
        group3.XZIndex = objcount++;
        canvas.add(group3);
        bars[group3] = 2;

      };  // end of  image.onload()
      image.src = e.target.result;
    }; // end of  imageReader.onload
    imageReader.readAsDataURL(file);
    $download.attr('download/../GitHub', 'AAAMergerick-' + file.name);

  }; // end of   SetImage function()

}); // end of function

