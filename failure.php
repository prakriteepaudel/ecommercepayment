<?php
// eSewa Payment Failure Handler
session_start();

// Decode eSewa response data
$transaction_data = [];
if (isset($_GET['data'])) {
    $encoded_data = $_GET['data'];
    $decoded_data = base64_decode($encoded_data);
    $transaction_data = json_decode($decoded_data, true);
}

// Log the failure response
$log_data = [
    'timestamp' => date('Y-m-d H:i:s'),
    'status' => 'FAILURE',
    'raw_data' => $_GET,
    'decoded_data' => $transaction_data
];

file_put_contents('logs/esewa_transactions.log', json_encode($log_data) . "\n", FILE_APPEND);

// Extract transaction details from decoded data
$transaction_uuid = $transaction_data['transaction_uuid'] ?? $transaction_data['transaction_code'] ?? '';
$total_amount = $transaction_data['total_amount'] ?? '';
$product_code = $transaction_data['product_code'] ?? '';
$status = $transaction_data['status'] ?? 'FAILED';
$error_message = $transaction_data['error_message'] ?? 'Payment was cancelled or failed';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Failed - ShopEase</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .failure-container {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            margin: 2rem;
        }
        
        .failure-icon {
            width: 80px;
            height: 80px;
            background: #e74c3c;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            color: white;
            font-size: 2rem;
        }
        
        .failure-title {
            color: #e74c3c;
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .failure-message {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .transaction-details {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            text-align: left;
        }
        
        .transaction-details h3 {
            color: #333;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }
        
        .detail-row:last-child {
            border-bottom: none;
            font-weight: 600;
            color: #e74c3c;
        }
        
        .btn {
            background: #3498db;
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: background 0.3s ease;
            margin: 0.5rem;
        }
        
        .btn:hover {
            background: #2980b9;
        }
        
        .btn-secondary {
            background: #95a5a6;
        }
        
        .btn-secondary:hover {
            background: #7f8c8d;
        }
        
        .btn-danger {
            background: #e74c3c;
        }
        
        .btn-danger:hover {
            background: #c0392b;
        }
        
        .help-section {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 10px;
            padding: 1.5rem;
            margin-top: 2rem;
            text-align: left;
        }
        
        .help-section h4 {
            color: #856404;
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
        
        .help-section ul {
            color: #856404;
            margin: 0;
            padding-left: 1.5rem;
        }
        
        .help-section li {
            margin-bottom: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="failure-container">
        <div class="failure-icon">
            <i class="fas fa-times"></i>
        </div>
        
        <h1 class="failure-title">Payment Failed</h1>
        
        <p class="failure-message">
            We're sorry, but your payment could not be processed. 
            This could be due to insufficient funds, network issues, or payment cancellation.
        </p>
        
        <div class="transaction-details">
            <h3>Transaction Details</h3>
            <div class="detail-row">
                <span>Transaction ID:</span>
                <span><?php echo htmlspecialchars($transaction_uuid); ?></span>
            </div>
            <div class="detail-row">
                <span>Amount:</span>
                <span>Rs. <?php echo htmlspecialchars($total_amount); ?></span>
            </div>
            <div class="detail-row">
                <span>Product Code:</span>
                <span><?php echo htmlspecialchars($product_code); ?></span>
            </div>
            <div class="detail-row">
                <span>Status:</span>
                <span>Failed</span>
            </div>
        </div>
        
        <div class="help-section">
            <h4><i class="fas fa-question-circle"></i> Need Help?</h4>
            <ul>
                <li>Check your eSewa account balance</li>
                <li>Ensure you have a stable internet connection</li>
                <li>Try using a different payment method</li>
                <li>Contact our support team if the issue persists</li>
            </ul>
        </div>
        
        <div class="button-group">
            <a href="index.html" class="btn">Continue Shopping</a>
            <a href="index.html#products" class="btn btn-secondary">Try Again</a>
            <a href="mailto:support@shopease.com" class="btn btn-danger">Contact Support</a>
        </div>
    </div>
    
    <script>
        // Show failure notification
        setTimeout(() => {
            alert('Payment failed. Please try again or contact support if the issue persists.');
        }, 1000);
    </script>
</body>
</html> 