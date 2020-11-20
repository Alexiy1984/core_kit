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
//// Input group card inputs actions -->

$(function() {
  var cardnumber_opts = {
    mask: [
      {
        mask: '0000 000000 00000',
        regex: '^3[47]\\d{0,13}',
        cardtype: 'american express'
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
        cardtype: 'discover'
      },
      {
        mask: '0000 000000 0000',
        regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
        cardtype: 'diners'
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
        cardtype: 'mastercard'
      },
      {
        mask: '0000-0000-0000-0000',
        regex: '^(5019|4175|4571)\\d{0,12}',
        cardtype: 'dankort'
      },
      {
        mask: '0000-0000-0000-0000',
        regex: '^63[7-9]\\d{0,13}',
        cardtype: 'instapayment'
      },
      {
        mask: '0000 000000 00000',
        regex: '^(?:2131|1800)\\d{0,11}',
        cardtype: 'jcb15'
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^(?:35\\d{0,2})\\d{0,12}',
        cardtype: 'jcb'
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
        cardtype: 'maestro'
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^220[0-4]\\d{0,12}',
        cardtype: 'mir'
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^4\\d{0,15}',
        cardtype: 'visa'
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^62\\d{0,14}',
        cardtype: 'unionpay'
      },
      {
        mask: '0000 0000 0000 0000',
        cardtype: 'Unknown'
      }
   ],
   dispatch: function (appended, dynamicMasked) {
    var number = (dynamicMasked.value + appended).replace(/\D/g, '');

    for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
        let re = new RegExp(dynamicMasked.compiledMasks[i].regex);
        if (number.match(re) != null) {
            return dynamicMasked.compiledMasks[i];
        }
    }
  }
  };

  $('.input-group_card .input-group_card__crd').each(function() {
    var cardnumber = this;
    //Mask the Credit Card Number Input
    var cardnumber_mask = new IMask(cardnumber, cardnumber_opts);

    cardnumber_mask.on("accept", function () {
      console.log(cardnumber_mask.masked.currentMask.cardtype);
    });
  
    cardnumber_mask.on('accept', function () {
      if (cardnumber_mask.value.length == 0) {    
      } else { 
      }
    });
  })
  
 
  // const expirationdate = document.getElementById('expirationdate');
  // const securitycode = document.getElementById('securitycode');

  if (cardnumber) {
    

  // //Mask the Expiration Date
  // var expirationdate_mask = new IMask(expirationdate, {
  //     mask: 'MM{/}YY',
  //     groups: {
  //         YY: new IMask.MaskedPattern.Group.Range([0, 99]),
  //         MM: new IMask.MaskedPattern.Group.Range([1, 12]),
  //     }
  // });

  // //Mask the security code
  // var securitycode_mask = new IMask(securitycode, {
  //     mask: '0000',
  // });

  //pop in the appropriate card icon when detected
  

  // expirationdate_mask.on('accept', function () {
  //     if (expirationdate_mask.value.length == 0) {
  //     } else {
  //     }
  // });

  // securitycode_mask.on('accept', function () {
  //     if (securitycode_mask.value.length == 0) {
  //     } else {
  //     }
  // });
  }
});  
//// Input group card inputs actions <--
// Input group Component scripts <--
