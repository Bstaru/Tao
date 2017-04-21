$(function() {

  function commasNumber(yourNumber) {
      var n= yourNumber.toString().split(".");
      n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return n.join(".");
  }

  var weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var loanAmount  = 1850;
  var loanTime    = 15.0;
  var amountStep  = 50;
  var timeStep    = 1;
  var dailyInterestRate  = 0.0116;
  var transactionFee = 0;
  var iva = 0.16;
  var minAmount = 100;
  var maxAmount = 9000.0;
  var minPeriod = 15;
  var maxPeriod = 15.0;

  $("#submitButton").on("click", function()
  {
    var click = $("#isLeavingInput").val(false);
  });

  $(window).on('beforeunload', function()
  {
    if ($("#isLeavingInput").val() == "true") {
      var postData = "action_post_url=" + $("#mainForm").attr("action") + "&" + $("#mainForm").serialize();
      var post_form = $.post("/aplicar/beforeunload", postData );
    }
  });

  $( '#slider-loan-amount' ).slider({
    range: "min",
    value: minAmount,
    animate: 1200,
    step: 10,
    min: minAmount,
    max: maxAmount,
    slide: function( event, ui ) {
      loanAmount = ui.value;
      reassign();
      Ostigator.alreadyLoanMoved = true;
    },
    create: function( event, ui ) {
      var handle  = $( '#' + event.target.lastChild.id ),
          parentTag = $('<div class="inner-handler-wrap"><div class="handler-inner"><span id="input-loan-amount"></span></div></div>');

      handle.addClass('tooltip').append(parentTag);
    }
  });

  function isNotWeekend( day, date ) {
    var temporalDate = new Date( date.getFullYear(), date.getMonth(), day);
    if ( temporalDate.getDay() != 0 && temporalDate.getDay() != 6 ) {
      return true;
    } else {
      return false;
    }
  }

  function bestDayForPayment( flag ) {
    if ( flag ) {
      $( '.best-day' ).addClass('active');
      $('#slider-loan-period-handle').addClass('quincena-handler');
    } else {
      $( '.best-day' ).removeClass('active');
      $('#slider-loan-period-handle').removeClass('quincena-handler');
    }
  }

  function uniqueDate( day, date) {
    return isNotWeekend(day, date ) ? false : true;
  }

  $( '#slider-loan-period' ).slider({
    range: "min",
    value: minPeriod,
    animate: 1200,
    min: minPeriod,
    max: maxPeriod,
    slide: function( event, ui ) {
      var tempTime      = ui.value;
      var today         = new Date();
      var tempDate      = new Date( today.getTime() + ( tempTime * 24 * 60 * 60 * 1000 ) );
      var numberOfDays  = new Date( tempDate.getFullYear(), tempDate.getMonth() + 1, 0 ).getDate();

      if ( !isNotWeekend(tempDate.getDate(), tempDate) ) {
        return false;
      };

      if ( numberOfDays == 31 && tempDate.getDate() == 31 && isNotWeekend(tempDate.getDate(), tempDate) ) {
        bestDayForPayment(true);

      } else if ( numberOfDays == 31 && tempDate.getDate() == 30 && isNotWeekend(tempDate.getDate(), tempDate) && uniqueDate(31, tempDate) ) {
        bestDayForPayment(true);

      } else if ( numberOfDays == 31 && tempDate.getDate() == 29 && isNotWeekend(tempDate.getDate(), tempDate) && uniqueDate(30, tempDate) && uniqueDate(31, tempDate) ) {
        bestDayForPayment(true);

      } else if ( numberOfDays == 30 && tempDate.getDate() == 30 && isNotWeekend(tempDate.getDate(), tempDate) ) {
        bestDayForPayment(true);

      } else if ( numberOfDays == 30 && tempDate.getDate() == 29 && isNotWeekend(tempDate.getDate(), tempDate) && uniqueDate(30, tempDate) ) {
        bestDayForPayment(true);

      } else if ( numberOfDays == 28 && tempDate.getDate() == 28 && isNotWeekend(tempDate.getDate(), tempDate) ) {
        bestDayForPayment(true);

      } else if ( numberOfDays == 28 && tempDate.getDate() == 27 && isNotWeekend(tempDate.getDate(), tempDate) && uniqueDate(28, tempDate) ) {
        bestDayForPayment(true);

      } else if ( tempDate.getDate() == 15 && isNotWeekend(tempDate.getDate(), tempDate) ) {
        bestDayForPayment(true);

      } else if ( tempDate.getDate() == 14 && isNotWeekend(tempDate.getDate(), tempDate) && uniqueDate(15, tempDate) ) {
        bestDayForPayment(true);

      } else {
        bestDayForPayment(false);
      };

      loanTime = ui.value;
      reassign();
      Ostigator.alreadyPeriodMoved = true;
    },
    create: function( event, ui ) {
      var handle  = $( '#' + event.target.lastChild.id ),
          parentTag = $('<div class="inner-handler-wrap"><div class="calc-tooltip"> Move the slider in order to select the date to repay your loan. </div><div class="handler-inner"><span id="input-loan-period"></span></div></div>');

      handle.append(parentTag);
    }
  });

  var input_Loan_Amount     = $( "#input-loan-amount" ),
    slider_Loan_Amount      = $( "#slider-loan-amount" ),
    MAX_slider_Loan_Amount  = slider_Loan_Amount.slider( "option" , "max"),
    MIN_slider_Loan_Amount  = slider_Loan_Amount.slider( "option" , "min"),
    input_Loan_Period       = $( "#input-loan-period" ),
    slider_Loan_Period      = $( "#slider-loan-period" ),
    loan_overview           = $( "#loan" ),
    interest_overview       = $( "#interest"),
    your_commission         = $( "#your_commission"),
    total_overview          = $( "#total" ),
    postAmount              = $( "#inputPostAmount" ),
    postTime                = $( "#inputPostPeriod" ),
    postTransactionFee      = $( "#inputPostTransactionFee" ),
    postInterestRate        = $( "#inputPostInterestRate" ),
    MAX_slider_Loan_Period  = slider_Loan_Period.slider( "option" , "max"),
    MIN_slider_Loan_Period  = slider_Loan_Period.slider( "option" , "min"),
    dOloanAmount            = $( '#dOloanAmount' ),
    paymentDateOverview     = $( "#paymentDate" ),
    totalAnnualCost         = $( "#totalAnnualCost" ),
    postMinMoney            = $( "input[name='min_possible_requested_money']"),
    postMaxMoney            = $( "input[name='max_possible_requested_money']"),
    postMinTime             = $( "input[name='min_possible_requested_time']"),
    postMaxTime             = $( "input[name='max_possible_requested_time']"),
    inputLogBehavior        = $( "#inputLogBehavior" );

  function reassign()
  {
    var interest;
    var total;
    var cat;
    var interestWithIva;
    var today;
    var paymentDate;
    var paymentText;

    input_Loan_Amount.text( "$" + commasNumber(loanAmount) );
    input_Loan_Period.text( loanTime + " Days" );   
    dOloanAmount.text( "$" + loanAmount );

    postAmount.val( "" + loanAmount );
    postTime.val( "" + loanTime );
    postTransactionFee.val( "" + transactionFee );
    postInterestRate.val( "" + dailyInterestRate );
    postMinMoney.val( "" + minAmount );
    postMaxMoney.val( "" + maxAmount );
    postMinTime.val( "" + minPeriod );
    postMaxTime.val( "" + maxPeriod );

    today = new Date();
    paymentDate = new Date( today.getTime() + ( loanTime * 24 * 60 * 60 * 1000 ) );
    paymentText = "" + weekDay[paymentDate.getDay()] + " " + paymentDate.getDate() + " de " + month[ paymentDate.getMonth() ] + " " + paymentDate.getFullYear();
    paymentDateOverview.text( paymentText );

    //interest = dailyInterestRate * loanAmount * loanTime ;
    //total = loanAmount + ( interest + transactionFee ) * ( 1 + iva ) ;
    //interestWithIva = interest * ( 1 + iva );
    //interest_overview.text( "$" + commasNumber(interestWithIva.toFixed( 2 )) );
    var eight_percent_commission = ((8*loanAmount)/100);
    var sixteen_percent_taxon_commission = ((16*eight_percent_commission)/100);
	eight_percent_commission = eight_percent_commission.toFixed( 2 );
	sixteen_percent_taxon_commission = sixteen_percent_taxon_commission.toFixed( 2 );
    interest_overview.text( "$" + eight_percent_commission + " + " + "$" + sixteen_percent_taxon_commission);
    your_commission.text( "$" + eight_percent_commission);
    
	var total_to_pay;
    total_to_pay = Number(loanAmount) + Number(eight_percent_commission) + Number(sixteen_percent_taxon_commission);
	total_to_pay = Number(total_to_pay).toFixed( 2 );
    total_overview.text( "$" + commasNumber(total_to_pay) );
    loan_overview.text( "$" + commasNumber(loanAmount) );

    cat = ( Math.pow ( ( ( loanAmount + interest + transactionFee ) / loanAmount ), 360.0 / loanTime )  - 1.0 ) * 100.0;
    totalAnnualCost.text( "" + cat.toFixed (2) + "%");  

    if (typeof timeStampZero != 'undefined')
    {
      logString = "vc#" + loanAmount + "&" + loanTime + "@" + ($.now() - timeStampZero) + ".";
      inputLogBehavior.val( inputLogBehavior.val() + logString );
    }

    //forcing a redraw in the screen, IE doesn't redraw correctly all times
    $('body').addClass('fakeClass').removeClass('fakeClass');
  }

  $('#sla-decrease').click(function() 
  {
    loanAmount -= amountStep;
    if (loanAmount < MIN_slider_Loan_Amount)
      loanAmount = MIN_slider_Loan_Amount;

    reassign();
  });

  $('#sla-increase').click(function() 
  {
    loanAmount += amountStep;
    if (loanAmount > MAX_slider_Loan_Amount) 
      loanAmount = MAX_slider_Loan_Amount;

    reassign();
  });

  $('#slp-decrease').click( function() 
  {
    loanTime -= timeStep;
    if( loanTime < MIN_slider_Loan_Period )
      loanTime = MIN_slider_Loan_Period;

    reassign();
  });

  $('#slp-increase').click( function() 
  {
    loanTime += timeStep;
    if( loanTime > MAX_slider_Loan_Period )
      loanTime = MAX_slider_Loan_Period;

    reassign();
  });

  function slideAnimation()
  {

    var itrst     = 21.46,
        itrstToGo = 429.20,
        catStart  = 3494.96,
        catToGo   = 2562.33,
        totalStart  = 1011.60,
        totalToGo   = 2279.20;

      $({value: minAmount}).animate({value: loanAmount}, {
        duration: 1200,
        easing:'swing',
        step: function() {
          loan_overview.text('$' + commasNumber(this.value.toFixed( 0 )));
          input_Loan_Amount.text('$' + commasNumber(this.value.toFixed( 0 )));
        }
      });

      $({value: minPeriod}).animate({value: loanTime}, {
        duration: 1200,
        easing:'swing',
        step: function() {
          input_Loan_Period.text(Math.round(this.value) + ' Dias');
        }
      });

      $({ value: itrst }).animate({ value: itrstToGo }, {
        duration: 1200,
        easing:'swing',
        step: function() {
          //interest_overview.text('$' + commasNumber(this.value.toFixed( 2 )));
          interest_overview.text('$' + commasNumber(this.value.toFixed( 2 )) + ' + ' + '$' + commasNumber(this.value.toFixed( 2 )));
        }
      });

      $({ value: catStart }).animate({ value: catToGo }, {
        duration: 1200,
        easing:'swing',
        step: function() {
          totalAnnualCost.text(this.value.toFixed( 2 ) + '%');
        }
      });

      $({ value: totalStart }).animate({ value: totalToGo }, {
        duration: 1200,
        easing:'swing',
        step: function() {
          total_overview.text( '$' + commasNumber(this.value.toFixed( 2 )));
        }
      });


      $( '#slider-loan-amount' ).slider( "value", loanAmount );
      $( '#slider-loan-period' ).slider( "value", loanTime );

      setTimeout(function() {
        reassign();
        Ostigator.init();
      }, 1200);
  };

  slideAnimation();
});

function are_loan_values_set() {
  var all_set = true;
  var checks = ['#inputPostAmount', '#inputPostPeriod', '#inputPostTransactionFee', '#inputPostInterestRate'];
  $.each(checks, function(index, key) {
    var value = $(key).val();
    if (typeof value != "string" || value.length == 0) all_set = false;
  });
  return all_set;
}

Ostigator = {
  alreadyLoanMoved: false,
  alreadyPeriodMoved: false,
  init: function(){
    this.bindEvents();
    this.loanOstigator();
    this.periodOstigator();
  },
  bindEvents: function() {
    var self = this;
    $('#slider-loan-amount-handle').hover(function() {
      $(this).find('.handler-inner').removeClass('ostigator-active');
      $(this).find('.calc-tooltip').fadeOut(300);
    }, function() {
      self.loanOstigator();
    });
    $('#slider-loan-period-handle').hover(function() {
      $(this).find('.handler-inner').removeClass('ostigator-active');
      $(this).find('.calc-tooltip').fadeOut(300);
    }, function() {
      self.periodOstigator();
    });
  },
  loanOstigator: function( isHover ) {
    var sliderLoan = $('#slider-loan-amount-handle'),
        handler = sliderLoan.find('.handler-inner'),
        tooltip = sliderLoan.find('.calc-tooltip');


    if ( ! this.alreadyLoanMoved ) {
      handler.addClass('ostigator-active');
      setTimeout(function() { tooltip.fadeIn(300); }, 1000);
    } else {
      tooltip.fadeOut(300);
      handler.removeClass('ostigator-active');
    };
  },
  periodOstigator: function() {
    var sliderPeriod = $('#slider-loan-period-handle'),
        handlerPeriod = sliderPeriod.find('.handler-inner'),
        tooltip = sliderPeriod.find('.calc-tooltip');

    if ( ! this.alreadyPeriodMoved ) {
      handlerPeriod.addClass('ostigator-active');
      setTimeout(function() { tooltip.fadeIn(300); }, 1000);
    } else {
      tooltip.fadeOut(300);
      handlerPeriod.removeClass('ostigator-active');
    };
  }
};