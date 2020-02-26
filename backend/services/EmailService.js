const sendmail = require("sendmail")();

const FROM = '"ICBC Flex Work" <flexwork@icbc.com>';

/**
 * See EmailServiceExample.js for usage (do not import/require/run it .. it will send an email to me haha)
 */
class EmailService {

  /**
   * Sends an email to notify an employee of a deleted booking, to the owner of the booking
   * 
   * @param {string} bookingOwnerEmailAddress
   * @param {{startDate: string, endDate: string, workspaceId: string}} booking
   */
  sendEmailDeleteBookingBooker(bookingOwnerEmailAddress, booking) {
    console.log(`sendEmilDeleteBooking: recipient: ${bookingOwnerEmailAddress}, booking: ${JSON.stringify(booking)}`);
    sendmail({
      from: FROM,
      to: bookingOwnerEmailAddress,
      subject: "Your booking has been canceled.",
      html: `Hello, this is an automated email to inform you of the canceling of your office booking. (Please do not reply to this email.) If there is an issue, please contact your Facility Administrator.<br><br>`
        + `Office: ${booking.workspaceId}<br> Start Date: ${booking.startDate} <br>End Date: ${booking.endDate}`
    }, function (err, reply) {
      console.log(err && err.stack);
      // UNCOMMENT to see detailed log:
      // console.log(reply);
    });
  }

  /**
   * Sends an email to notify an employee of a deleted booking, to the owner of the availability
   * 
   * @param {string} availabilityOwnerEmailAddress 
   * @param {{startDate: string, endDate: string, workspaceId: string}} booking
   */
  sendEmailDeleteBookingLender(availabilityOwnerEmailAddress, booking) {
    console.log(`sendEmilDeleteBooking: recipient: ${availabilityOwnerEmailAddress}, booking: ${JSON.stringify(booking)}`);
    sendmail({
      from: FROM,
      to: availabilityOwnerEmailAddress,
      subject: "A booking was canceled on a workspace you made available.",
      html: `Hello, this is an automated email to inform you of the canceling of an employee's booking of your office. (Please do not reply to this email.) If there is an issue, please contact your Facility Administrator.<br><br>`
        + `Office: ${booking.workspaceId}<br> Start Date: ${booking.startDate} <br>End Date: ${booking.endDate}`
    }, function (err, reply) {
      console.log(err && err.stack);
      // UNCOMMENT to see detailed log:
      // console.log(reply);
    });
  }
}

module.exports = EmailService;