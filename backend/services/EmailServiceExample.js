// How to use EmailService.js

// may need to change path to ../services/EmailService
const EmailService = require("./EmailService");

const emailService = new EmailService();

const booking = { startDate: "2020-02-14", endDate: "2020-02-17", workspaceId: "NV4-08A" };

emailService.sendEmailDeleteBookingBooker("john.hua.zou@gmail.com", booking);
