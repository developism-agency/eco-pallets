// netlify/functions/submitForm.js
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const { name, email, phone_number, product_type, message } = JSON.parse(event.body);
  
  // Implement your email sending logic using nodemailer
  try {
    // Create a nodemailer transporter (use your email provider's settings)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
        user: 'ecopallets.tech@gmail.com',
        pass: 'wjunrwdtynuwower'
      }
    });

    // Set up email data
    const mailOptions = {
      from: 'bogdan.tomchuck@gmail.com',
      to: 'ecopalletinternational@gmail.com', // recipient's email
      subject: 'Eco-pallets',
      text: `
        Name: ${name}
        Email: ${email}
        Phone Number: ${phone_number}
        Product Type: ${product_type}
        Message: ${message}
      `,
      html: `
      <table style="border-collapse: collapse; width: 80%; margin: 20px auto; border: 1px solid #0E0D12;">
        <tr>
          <th style="text-align: left; padding: 12px; border: 1px solid #0E0D12; background-color: #f2f2f2; font-size: 18px; font-weight: 700;">Name</th>
          <th style="text-align: left; padding: 12px; border: 1px solid #0E0D12; background-color: #f2f2f2; font-size: 18px; font-weight: 700;">Email</th>
          <th style="text-align: left; padding: 12px; border: 1px solid #0E0D12; background-color: #f2f2f2; font-size: 18px; font-weight: 700;">Phone Number</th>
          <th style="text-align: left; padding: 12px; border: 1px solid #0E0D12; background-color: #f2f2f2; font-size: 18px; font-weight: 700;">Product Type</th>
          <th style="text-align: left; padding: 12px; border: 1px solid #0E0D12; background-color: #f2f2f2; font-size: 18px; font-weight: 700;">Message</th>
        </tr>
        <tr>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">${name}</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">${email}</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">${phone_number}</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">${product_type}</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">${message}</td>
        </tr>
      </table>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An error occurred while submitting the form' })
    };
  }
};
