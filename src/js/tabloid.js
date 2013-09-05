(function () {
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

    function updateMonthYear() {                
        $month.html( cal.getMonthName() );
        $year.html( cal.getYear() );
    }


    var $date_cells = $('.fc-date').parent(), i;

    var tabloid = [2, 2, 0, 0, 1, 1, 0, 0],
    	classes = ['tabloid-cell-rest', 'tabloid-cell1', 'tabloid-cell2'],
    	start_date = new Date('2013-09-05');

    for (i = 0, last = $date_cells.length; i < last; i++) {
    	$($date_cells[i]).addClass(classes[tabloid[i % tabloid.length]]);
    }

}());