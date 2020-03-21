
USE flexWork;
DELIMITER |

DROP EVENT IF EXISTS archive_bookings_and_availabilities_at_midnight|

CREATE EVENT archive_bookings_and_availabilities_at_midnight
  ON SCHEDULE
    EVERY 1 DAY
    STARTS '2020-03-19 00:00:00' ON COMPLETION PRESERVE ENABLE 
  DO
  	BEGIN
	    START TRANSACTION;
	    	/*Database assumes that a booking whose end date has passed will have an availability whose end date has passed as well*/

		    /*archive availabilities whose end date has passed*/
		    INSERT INTO archivedAvailability
		    	SELECT * 
		    	FROM availability 
		    	WHERE EndDate < CURDATE();

	    	BEGIN
			    DECLARE CONTINUE HANDLER FOR 1452
				    BEGIN
				     SELECT 'A booking whose end date has passed is associated with an availability whose end date has not passed';
				    END;

		    	/*archive bookings whose end date has passed*/
		    	INSERT INTO archivedBooking
			    	SELECT BookingId, StartDate, EndDate, StaffId, AvailabilityId 
			    	FROM booking 
			    	WHERE EndDate < CURDATE();

				DELETE FROM booking WHERE booking.AvailabilityId IN (SELECT ArchivedAvailabilityId FROM archivedAvailability);
				DELETE FROM availability WHERE EndDate < CURDATE();
			END;
	    
	    COMMIT;
    END|
DELIMITER ;

