  var totalSeconds = 30;


  $( "#num_input" ).keypress(function(e) {
    if (e.keyCode == '13') {
      e.preventDefault();
      setCustomNum($( "#num_input" ).val());
    }
  });

  function setCustomNum(num) {
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
      location.reload();
      return;
    }
  };


  displayTime();
  window.setTimeout('Tick()', 1000);
