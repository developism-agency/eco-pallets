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
        user: 'bogdan.tomchuck@gmail.com',
        pass: 'tpwdplkjtplgfzsn'
      }
    });

    // Set up email data
    const mailOptions = {
      from: 'bogdan.tomchuck@gmail.com',
      to: 'developism.agency@gmail.com', // recipient's email
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
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">John Doe</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">john@example.com</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">123-456-7890</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">Electronics</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">Interested in purchasing a new laptop.</td>
        </tr>
        <tr>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">Jane Smith</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">jane@example.com</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">987-654-3210</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">Clothing</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">Inquiry about summer clothing collection.</td>
        </tr>
        <tr>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">Sam Johnson</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">sam@example.com</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">555-123-4567</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">Home Appliances</td>
          <td style="text-align: left; padding: 12px; border: 1px solid #0E0D12;">Question about warranty on kitchen appliances.</td>
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
