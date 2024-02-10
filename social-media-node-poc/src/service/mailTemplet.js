const config = require("../config/config");
module.exports.signupOtpMailTemplate = function (otp) {
  var response = {};
  response.subject = "Sending Email using Node.js";
  response.text = "That easy way.";
  response.html = `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
            <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Your Brand Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
            </div>
        </div>
    </div>
    `;
  return response;
};

module.exports.signupMailTemplate = function (targetEmail, token) {
  var respones = {};
  respones.subject = "Sending Email using Node.js";
  respones.text = "That easy way.";
  respones.html = `
        <div class="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">

            <div class="mail__wrapper max-w-md mx-auto">
        
            <div class="mail__content bg-white p-8 shadow-md">
        
                <div class="content__header text-center tracking-wide border-b">
                <div class="text-red text-sm font-bold">WebOsmotic</div>
                <h1 class="text-3xl h-48 flex items-center justify-center">E-mail Confirmation</h1>
                </div>
        
                <div class="content__body py-8 border-b">
                <p>
                    Hey, <br><br>It looks like you just signed up for The App, that’s awesome! Can we ask you for email confirmation? Just click the link bellow.
                </p>
                <a href=${
                  config.baseUrl +
                  "api/v1/auth/verify-email" +
                  `?token=${token}&email=${targetEmail}`
                }><button class="text-white text-sm tracking-wide bg-red rounded w-full my-8 p-4 ">Verify your Email</button></a>
                
                <p class="text-sm">
                    Keep Rockin'!<br> Your The App team
                </p>
                </div>
        
                <div class="content__footer mt-8 text-center text-grey-darker">
                <h3 class="text-base sm:text-lg mb-4">Thanks for using The App!</h3>
                <p>https://webosmotic.com/</p>
                </div>
        
            </div>
        
            </div>
        
        </div>
    `;
  return respones;
};
