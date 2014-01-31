secretKey= ['38','38','40','40','37','39','37','39','66','65'];
var input = [];

$(document).keyup(function(e) {
  checkInput(e.which);
});

function checkInput(e) {
  input.push(e)
  for(var i=0; i < input.length; i++) {
    if (input[i] == secretKey[i]) {
      if (input.length == secretKey.length) {
        $('#num_input').css({'border-color':'red'});
        $('.selectbox').css({'border-color':'red'});
        input = [];
      }
    } else {
      input = [];
    }
  }

}
