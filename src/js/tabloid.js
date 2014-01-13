(function () {
	// $.mobile.defaultPageTransition   = 'none';
	// $.mobile.defaultDialogTransition = 'none';
	// $.mobile.buttonMarkup.hoverDelay = 0;

	$.mobile.loadingMessage = false;

	var tabloid = [1, 1, 0, 0, 2, 2, 0, 0],
		startDate = new Date(2012, 4, 1, 10), // May 01, 2012 (month starts from 0)
		secondsInDay = 60 * 60 * 24;

    var $calendar = $( '#calendar' ),
	    cal = $calendar.calendario( {
	          		displayWeekAbbr : true
	        } ),
	        $month = $( '#custom-month' ).html( cal.getMonthName() ),
	        $year = $( '#custom-year' ).html( cal.getYear() );

	    $( '#custom-next' ).on( 'click', function() {
	        cal.gotoNextMonth( updateMonthYear );
	    } );
	    $( '#custom-prev' ).on( 'click', function() {
	        cal.gotoPreviousMonth( updateMonthYear );
	    } );

	function getSmena(year, month, day) {
		var curDate = new Date(year, month, day, 10);

			// The number of milliseconds in one day
		var ONE_DAY = 1000 * 60 * 60 * 24;

		// Convert both dates to milliseconds
		var date1_ms = curDate.getTime();
		var date2_ms = startDate.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = Math.abs(date1_ms - date2_ms);

		console.log('curDate: ' + curDate + '\nstartDate: ' + startDate + '\ndiff days: ' + Math.round(difference_ms/ONE_DAY) + '\nindex: ' + Math.round(difference_ms/ONE_DAY) % tabloid.length);

		// Convert back to days and return
		return Math.round(difference_ms/ONE_DAY) % tabloid.length;
	}

    function updateMonthYear() {                
        $month.html( cal.getMonthName() );
        $year.html( cal.getYear() );
        updateTabloid(getSmena(cal.getYear(), cal.getMonth() - 1, 1));
    }

    function updateTabloid(delta) {
	    var $date_cells = $('.fc-date').parent(), i;

	    var classes = ['tabloid-cell-rest', 'tabloid-cell1', 'tabloid-cell2'];

	    for (i = 0, last = $date_cells.length; i < last; i++) {
	    	var tabloid_ind = (i + delta) % tabloid.length;
	    	$($date_cells[i]).addClass(classes[tabloid[tabloid_ind]]);
    	}
    }

	$(document.body).swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount) {
        	setTimeout(function() {
          		if (direction == 'left') cal.gotoNextMonth( updateMonthYear );
          		if (direction == 'right') cal.gotoPreviousMonth( updateMonthYear );
          		if (direction == 'down') cal.gotoNextYear( updateMonthYear );
          		if (direction == 'up') cal.gotoPreviousYear( updateMonthYear );
          	}, 200);
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:30
    });

    $(document).on('appResumed', function() {
    	var today = new Date();
    	alert('urraaa');
    	updateTabloid(getSmena(today.getFullYear(), today.getMonth(), 1, 10));
    });

    updateTabloid(getSmena(cal.getYear(), cal.getMonth() - 1, 1, 10));
}());
