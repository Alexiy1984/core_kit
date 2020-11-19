// Input group Component scripts -->
//// Input group password input actions -->
jQuery.fn.togglePasswordVisibility = function() {
  if($(this).val()) {
    $(this).attr('type', function(_, attr) { return attr == 'password' ? 'text' : 'password'; });
  }
};

jQuery.fn.togglePasswordIcon = function(to_inint = false) {
  if ($(this).attr('data-iconset')) {
    var iconset = $(this).attr('data-iconset').split(',');
    if (iconset.length > 1) {
      var used_icon = $('use', this).attr('xlink:href').split('#');
      if (!to_inint) {
        var change_icon = used_icon[1] == iconset[0] ? iconset[1]: iconset[0];
      } else {
        var change_icon = iconset[0];
      }
      $('use', this).attr('xlink:href', `${used_icon[0]}#${change_icon}`);
    }
  }
};

$(function() {
  $('.show-password').on('click', function() {
    if ($(this).hasClass('input-group-append') && $(this).prev().val()) {
      $(this).prev('input').togglePasswordVisibility();
      $('svg', this).togglePasswordIcon();
      $(this).parent().find('svg').not($('svg', this)).togglePasswordIcon();
    } else if ($(this).hasClass('input-group-prepend') && $(this).next().val()) {
      $(this).next('input').togglePasswordVisibility();
      $('svg', this).togglePasswordIcon();
      $(this).parent().find('svg').not($('svg', this)).togglePasswordIcon();
    }
  });
  $('.show-password').prev('input').on('change', function(){
    if(!$(this).val()) {
      $(this).next('.show-password').find('svg').togglePasswordIcon(true);
      $(this).attr('type', 'password');
    }
  });
  $('.show-password').next('input').on('change', function(){
    if(!$(this).val()) {
      $(this).prev('.show-password').find('svg').togglePasswordIcon(true);
      $(this).attr('type', 'password');
    }
  });
});
//// Input group password input actions <--
// Input group Component scripts <--

