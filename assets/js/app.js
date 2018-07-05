
$(initialize);

function initialize(){
    configureMask();
}


function configureMask() {
  $('input[data-mask]').each(function() {
    var input = $(this);
    input.setMask(input.data('mask'));
  });
}






