const sendmail = require("sendmail")();

const FROM = '"ICBC Flex Work" <flexwork@icbc.com>';

class EmailService {

  sendEmailDeleteBooking(recipient, booking) {
    console.log(`sendEmilDeleteBooking: recipient: ${recipient}, booking: ${JSON.stringify(booking)}`);
    sendmail({
      from: FROM,
      to: recipient,
      subject: "Your booking has been canceled.",
      html: `Hello, this is an automated email to inform you of the canceling of your office booking. (Please do not reply to this email.) If there is an issue, please contact your Facility Administrator.<br><br>`
        + `Office: ${booking.workspaceId}<br> Start Date: ${booking.startDate} <br>End Date: ${booking.endDate}`
    }, function (err, reply) {
      console.log(err && err.stack);
      // UNCOMMENT to see detailed log:
      // console.log(reply);
    });
  }
}

module.exports = EmailService;