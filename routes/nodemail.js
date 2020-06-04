const router = require('express').Router();
const nodemailer  = require("nodemailer");


router.post("/nodemail", (req, res) => {   
  
async function main() {

  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'omari.rice@ethereal.email',
        pass: 'DS3m3PYs4gzzC8d1wM'
    }
});

 
    let info = await transporter.sendMail({
    from: 'Emil',
      to: req.body.email, 
      subject: 'Mail from Emil', 
      text: 'Hello world', 
      html: 'Hello world' 
    });

}
  
main().catch(console.error);

return res.redirect("/nodemail")

});

module.exports = router;