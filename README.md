# ShopEase - Modern E-commerce Website

A fully functional, responsive e-commerce website built with HTML, CSS, and JavaScript, featuring eSewa payment integration for Nepal.

## 🚀 Features

### Core Features
- **Product Catalog**: Browse products by categories (Electronics, Clothing, Home & Garden, Sports)
- **Shopping Cart**: Add, remove, and manage items with real-time updates
- **Payment Integration**: eSewa payment gateway integration for Nepal
- **User Authentication**: Login and registration system
- **Search & Filtering**: Search products and filter by category/price
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Technical Features
- **Modern UI/UX**: Beautiful animations and smooth interactions
- **Local Storage**: Cart persistence across browser sessions
- **Form Validation**: Comprehensive client-side validation
- **Payment Simulation**: Test mode for development
- **Transaction Logging**: Detailed payment transaction logs
- **Error Handling**: Robust error handling and user feedback

## 🛠️ Setup Instructions

### Prerequisites
- **XAMPP** (or any local server with PHP support)
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)
- **Internet Connection** (for external resources and eSewa integration)

### Installation Steps

1. **Download/Clone the Project**
   ```bash
   # If using git
   git clone <repository-url>
   
   # Or download and extract the ZIP file
   ```

2. **Setup XAMPP**
   - Download and install XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/)
   - Start Apache and MySQL services
   - Place the project folder in `C:\xampp\htdocs\e-commerce\`

3. **Configure eSewa Integration**
   - Open `ESEWA_CONFIG.php`
   - Update the URLs if needed:
     ```php
     const SUCCESS_URL = 'http://localhost/e-commerce/success.php';
     const FAILURE_URL = 'http://localhost/e-commerce/failure.php';
     ```
   - For production, change `ENVIRONMENT` from `'sandbox'` to `'production'`

4. **Test the Setup**
   - Open your browser and go to: `http://localhost/e-commerce/`
   - Use the test page: `http://localhost/e-commerce/test_payment.html`

## 🧪 Testing

### Test Payment Page
Visit `http://localhost/e-commerce/test_payment.html` to:
- Test payment processing
- Verify eSewa integration
- Check form validation
- Test cart functionality
- View system information

### eSewa Test Credentials
For testing eSewa payments, use these credentials:
- **eSewa ID**: 9806800001/2/3/4/5
- **Password**: Nepal@123
- **MPIN**: 1122
- **Token**: 123456

### Payment Simulation
The website includes a payment simulation mode for development:
- Select "Payment Simulation" in checkout
- No real payment is processed
- Perfect for testing the complete flow

## 📁 Project Structure

```
e-commerce/
├── index.html              # Main website
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript
├── test_payment.html       # Test page
├── ESEWA_CONFIG.php        # eSewa configuration
├── ESEWA_Payment.php       # eSewa payment class
├── process_payment.php     # Payment processing endpoint
├── success.php             # Payment success page
├── failure.php             # Payment failure page
├── test_esewa_connection.php # eSewa connection test
├── logs/                   # Transaction logs
│   └── esewa_transactions.log
├── package.json            # Project metadata
└── README.md              # This file
```

## 🔧 Configuration

### eSewa Settings
Edit `ESEWA_CONFIG.php` to configure:

```php
// Environment (sandbox/production)
const ENVIRONMENT = 'sandbox';

// URLs (update for your domain)
const SUCCESS_URL = 'http://localhost/e-commerce/success.php';
const FAILURE_URL = 'http://localhost/e-commerce/failure.php';

// Merchant code (get from eSewa)
const PRODUCTION = [
    'merchant_code' => 'YOUR_MERCHANT_CODE',
    // ... other settings
];
```

### Product Configuration
Edit `script.js` to modify:
- Product catalog
- Categories
- Pricing
- Images and descriptions

## 🚀 Deployment

### Local Development
1. Use XAMPP for local development
2. Access via `http://localhost/e-commerce/`
3. Use payment simulation for testing

### Production Deployment
1. **Update Configuration**:
   - Change `ENVIRONMENT` to `'production'`
   - Update URLs to your domain
   - Add your eSewa merchant code

2. **Server Requirements**:
   - PHP 7.0 or higher
   - cURL extension enabled
   - SSL certificate (HTTPS required for eSewa)

3. **File Permissions**:
   - Ensure `logs/` directory is writable
   - Set proper permissions for PHP files

## 🐛 Troubleshooting

### Common Issues

**1. Payment Not Working**
- Check if XAMPP is running
- Verify eSewa configuration
- Test with payment simulation first
- Check browser console for errors

**2. eSewa Integration Issues**
- Verify merchant code is correct
- Check if URLs are accessible
- Test with sandbox environment
- Review transaction logs

**3. Cart Not Saving**
- Check browser localStorage support
- Clear browser cache
- Try in incognito mode

**4. Styling Issues**
- Check if CSS file is loading
- Verify Font Awesome CDN
- Check browser compatibility

### Debug Tools
- **Browser Console**: Press F12 for developer tools
- **Test Page**: Use `test_payment.html` for diagnostics
- **Transaction Logs**: Check `logs/esewa_transactions.log`
- **eSewa Test**: Use `test_esewa_connection.php`

## 📱 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+

## 🔒 Security Features

- **Input Validation**: Client and server-side validation
- **XSS Protection**: Proper HTML escaping
- **CSRF Protection**: Form token validation
- **Secure Headers**: CORS and security headers
- **Error Logging**: Detailed error tracking

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review transaction logs
3. Test with the provided test page
4. Contact eSewa support for payment issues

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Roadmap

Future enhancements:
- [ ] Database integration
- [ ] User account management
- [ ] Order tracking
- [ ] Email notifications
- [ ] Admin panel
- [ ] Multiple payment gateways
- [ ] Inventory management
- [ ] Analytics dashboard

---

**Happy Shopping! 🛒✨** 