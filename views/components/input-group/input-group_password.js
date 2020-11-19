jQuery.fn.togglePasswordVisibility = function() {
  if($(this).val()) {
    $(this).attr('type', function(_, attr) { return attr == 'password' ? 'text' : 'password'; });
  }
};

jQuery.fn.togglePasswordIcon = function() {
  if ($(this).attr('data-iconset')) {
    var iconset = $(this).attr('data-iconset').split(',');
    if (iconset.length > 1) {
      var used_icon = $('use', this).attr('xlink:href').split('#');
      var change_icon = used_icon[1] == iconset[0] ? iconset[1]: iconset[0];
      $('use', this).attr('xlink:href', `${used_icon[0]}#${change_icon}`);
    }
  }
};

$(function() {
  $('.show-password').on('click', function() {
    if ($(this).hasClass('input-group-append') && $(this).prev().val()) {
      $(this).prev('input').togglePasswordVisibility();
      $('svg', this).togglePasswordIcon();
    } else if ($(this).hasClass('input-group-prepend') && $(this).next().val()) {
      $(this).next('input').togglePasswordVisibility();
      $('svg', this).togglePasswordIcon();
    }
  });
});
