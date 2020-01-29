// setting up dependecies
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();

// view engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("./layouts/main");
});

app.post("/send", (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.Name}</li>
    <li>Email: ${req.body.Email}</li>
    <li>Phone Number: ${req.body.Phone}</li>
    <li>Guest Number: ${req.body.GuestNumber}</li>
    <li>Menu Option: ${req.body.MenuOptions}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.Message}</p>
  `;
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'sandboxcasanostra@outlook.com', // generated ethereal user
        pass: 'casanostraPizza2007' // generated ethereal password
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Nodemailer Contact" <sandboxcasanostra@outlook.com>', // sender address
      to: "sandboxcasanostra@outlook.com", // list of receivers
      subject: "Node Contact Request", // Subject line
      text: "Hello world?", // plain text body
      html: output // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }
  res.render('./layouts/main', {msg: 'email was sent succefully'})
  main().catch(console.error);
});

app.listen(3000, () => console.log("Server started..."));
