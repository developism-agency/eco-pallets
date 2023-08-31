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
      <div>
        <table>
          <tr>
            <th>Ім'я</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Тип продукту</th>
            <th>Повідомлення</th>
          </tr>
          <tr>
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone_number}</td>
            <td>${product_type}</td>
            <td>${message}</td>
          </tr>
        </table>
        <style>
          table {
            border-collapse: collapse;
            width: 80%;
            margin: 20px auto;
            border: 1px solid #0E0D12;
          }
        
          th, td {
            text-align: left;
            padding: 12px;
            border: 1px solid #0E0D12;
          }
        
          th {
            background-color: #f2f2f2;
            font-size: 18px;
            font-weight: 700;
          }
        
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
        </style>
      </div>
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
