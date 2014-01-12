  var totalSeconds = 30;
  $( "#num_input" ).keyup(function(e) {
    if (e.keyCode == '13') {
      setCustomNum($( "#num_input" ).val());
    }
  })

  function setCustomNum(num) {
    console.log(num)
    if (parseInt(num)) {
      totalSeconds = parseInt(num);
    }
    $("#num_input").val('');
  };



  function displayTime() {
    $( "#counter" ).html(totalSeconds);
  };

  function Tick(num) {
    totalSeconds --;
    displayTime();

    if (totalSeconds > 0) {
    window.setTimeout('Tick()', 1000);
    } else {
      setCustomNum();
      location.reload();
      return;
    }
  };


  displayTime();
  window.setTimeout('Tick()', 1000);
