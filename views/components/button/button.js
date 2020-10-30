$(function() {
  var text = '';
  $('#select').text($('.btn-group[data-toggle="select"] .button_primary').first().text());
  $('.btn-group[data-toggle="multiple"] .button_primary').each(function(){
    text += $(this).text() + ' ';
  });

  $('#multiple').text(text);

  $('.btn-group[data-toggle="multiple"] .button_outline, .btn-group[data-toggle="multiple"]  .button_primary').on('click', function () {
    $(this)
      .toggleClass('button_primary')
      .toggleClass('button_outline');
      text = '';
      $('.btn-group[data-toggle="multiple"] .button_primary').each(function(){
        text += $(this).text() + ' ';
      });
      $('#multiple').text(text);
  });
  $('.btn-group[data-toggle="select"] .button_outline, .btn-group[data-toggle="select"]  .button_primary').on('click', function () {
    $(this).siblings()
      .addClass('button_outline')
      .removeClass('button_primary');
    $(this)
      .toggleClass('button_primary')
      .toggleClass('button_outline');
    $('#select').text($(this).text());  
  })
});
