$(function() {
  $('.pagination .page-item').on('click', function () {
    $(this).siblings
      .removeClass('active')
    $(this)
      .addClass('active')
  });
});
