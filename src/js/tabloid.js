(function () {
	var tabloid = [2, 2, 0, 0, 1, 1, 0, 0],
		start_date = new Date('2013-09-05');

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
        updateTabloid(4);
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

    updateTabloid(4);

}());
