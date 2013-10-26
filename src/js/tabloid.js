(function () {
	var tabloid = [1, 1, 0, 0, 2, 2, 0, 0],
		startDate = new Date(2012, 3, 30),
		secondsInDay = 60 * 60 * 24;

    var $calendar = $( '#calendar' ),
	    cal = $calendar.calendario( {
	            onDayClick : function( $el, $contentEl, dateProperties ) {

	                if( $contentEl.length > 0 ) {
	                    showEvents( $contentEl, dateProperties );
	                }

	            },
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
		var curDate = new Date(year, month, day);

			// The number of milliseconds in one day
		var ONE_DAY = 1000 * 60 * 60 * 24;

		// Convert both dates to milliseconds
		var date1_ms = curDate.getTime();
		var date2_ms = startDate.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = Math.abs(date1_ms - date2_ms);

		// Convert back to days and return
		return Math.round(difference_ms/ONE_DAY) % tabloid.length;
	}

    function updateMonthYear() {                
        $month.html( cal.getMonthName() );
        $year.html( cal.getYear() );
        updateTabloid(getSmena(cal.getYear(), cal.getMonth(), 1));
    }

    function updateTabloid(delta) {
	    var $date_cells = $('.fc-date').parent(), i;

	    var classes = ['tabloid-cell-rest', 'tabloid-cell1', 'tabloid-cell2'],	    	
	    	month_delta = delta;

	    for (i = 0, last = $date_cells.length; i < last; i++) {
	    	var tabloid_ind = (i + month_delta) % tabloid.length;
	    	$($date_cells[i]).addClass(classes[tabloid[tabloid_ind]]);
    	}
    }

    $(document).on('screenSwipeLeft', function() {
    	cal.gotoNextMonth( updateMonthYear );
    });
    $(document).on('screenSwipeRight', function() {
    	cal.gotoPreviousMonth( updateMonthYear );
    });

    var today = new Date();
    updateTabloid(getSmena(today.getFullYear(), today.getMonth(), 1));

}());
