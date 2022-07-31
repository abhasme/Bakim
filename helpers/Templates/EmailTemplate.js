const resetPasswordEmailTemplate = (link) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <style>
              .email_container {
              display: block;
              width: 75%;
              padding: 25px;
              border: 1px solid #ccc;
              }
  
              p {
              color: rgb(105, 105, 105);
              position: relative;
              width: 100%;
              }
  
              a {
              font-size: 16px;
              font-weight: 600;
              color: orange;
              text-decoration: none;
              }
  
              a:hover {
              color: #000;
              text-decoration: underline;
              }
  
              span {
                  fontsize : 14px;
                  color: #5c5c5c;
                  font-weight : 500;
              }
          </style>
      </head>
          <body>
              <div class="email_container">
                  <h2>Welcome to Bakim Randevu</h2>
                  <div>Don't worry about your password.</div>
                  <p>Please click below link to reset your password. this link is valid upto 24 hours.${link}</p>
              </div>
          </body>
      </html>
      `;
};

const sendOtpEmailTemplate = (otp) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <style>
              .email_container {
              display: block;
              width: 75%;
              padding: 25px;
              border: 1px solid #ccc;
              }
  
              p {
              color: rgb(105, 105, 105);
              position: relative;
              width: 100%;
              }
  
              a {
              font-size: 16px;
              font-weight: 600;
              color: orange;
              text-decoration: none;
              }
  
              a:hover {
              color: #000;
              text-decoration: underline;
              }
  
              span {
                  fontsize : 14px;
                  color: #5c5c5c;
                  font-weight : 500;
              }
          </style>
      </head>
          <body>
              <div class="email_container">
                  <h2>Welcome to Bakim Randevu</h2>
                  <div>Don't worry about your password.</div>
                  <p>Please click below link to reset your password. this link is valid upto 24 hours. ${otp}</p>
              </div>
          </body>
      </html>
      `;
};

const welComeEmailTemplate = (otp) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <style>
              .email_container {
              display: block;
              width: 75%;
              padding: 25px;
              border: 1px solid #ccc;
              }
  
              p {
              color: rgb(105, 105, 105);
              position: relative;
              width: 100%;
              }
  
              a {
              font-size: 16px;
              font-weight: 600;
              color: orange;
              text-decoration: none;
              }
  
              a:hover {
              color: #000;
              text-decoration: underline;
              }
  
              span {
                  fontsize : 14px;
                  color: #5c5c5c;
                  font-weight : 500;
              }
          </style>
      </head>
          <body>
              <div class="email_container">
                  <h2>Welcome to Bakim Randevu</h2>
                  <div>Don't worry about your password.</div>
                  <p>Please click below link to reset your password. this link is valid upto 24 hours. ${otp}</p>
              </div>
          </body>
      </html>
      `;
};

const emailVerificationEmailTemplate = (link) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <style>
              .email_container {
              display: block;
              width: 75%;
              padding: 25px;
              border: 1px solid #ccc;
              }
  
              p {
              color: rgb(105, 105, 105);
              position: relative;
              width: 100%;
              }
  
              a {
              font-size: 16px;
              font-weight: 600;
              color: orange;
              text-decoration: none;
              }
  
              a:hover {
              color: #000;
              text-decoration: underline;
              }
  
              span {
                  fontsize : 14px;
                  color: #5c5c5c;
                  font-weight : 500;
              }
          </style>
      </head>
          <body>
              <div class="email_container">
                  <h2>Welcome to Bakim Randevu</h2>
                  <div>Don't worry about your password.</div>
                  <p>Please click below link to reset your password. this link is valid upto 24 hours.</p>
                  <a href="${link}" target="_blank">Verify Email</a>
              </div>
          </body>
      </html>
      `;
};

const salonOnbordedEmailTemplate = (data) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <style>
              .email_container {
              display: block;
              width: 75%;
              padding: 25px;
              border: 1px solid #ccc;
              }
  
              p {
              color: rgb(105, 105, 105);
              position: relative;
              width: 100%;
              }
  
              a {
              font-size: 16px;
              font-weight: 600;
              color: orange;
              text-decoration: none;
              }
  
              a:hover {
              color: #000;
              text-decoration: underline;
              }
  
              span {
                  fontsize : 14px;
                  color: #5c5c5c;
                  font-weight : 500;
              }
          </style>
      </head>
          <body>
              <div class="email_container">
                  <h2>Welcome to Bakim Randevu</h2>
                  <div>Salon onborded successfully</div>
                  <p>Please click below link to reset your password. this link is valid upto 24 hours.</p>
              </div>
          </body>
      </html>
      `;
};

module.exports = {
    resetPasswordEmailTemplate,
    sendOtpEmailTemplate,
    welComeEmailTemplate,
    emailVerificationEmailTemplate,
    salonOnbordedEmailTemplate
};
