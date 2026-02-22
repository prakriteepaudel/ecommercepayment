<?php
// eSewa Payment Success Handler
session_start();

// Decode eSewa response data
$transaction_data = [];
if (isset($_GET['data'])) {
    $encoded_data = $_GET['data'];
    $decoded_data = base64_decode($encoded_data);
    $transaction_data = json_decode($decoded_data, true);
}

// Log the success response
$log_data = [
    'timestamp' => date('Y-m-d H:i:s'),
    'status' => 'SUCCESS',
    'raw_data' => $_GET,
    'decoded_data' => $transaction_data
];

file_put_contents('logs/esewa_transactions.log', json_encode($log_data) . "\n", FILE_APPEND);

// Extract transaction details from decoded data
$transaction_uuid = $transaction_data['transaction_uuid'] ?? $transaction_data['transaction_code'] ?? '';
$total_amount = $transaction_data['total_amount'] ?? '';
$product_code = $transaction_data['product_code'] ?? '';
$status = $transaction_data['status'] ?? 'SUCCESS';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful - ShopEase</title>
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
        
        .success-container {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            margin: 2rem;
        }
        
        .success-icon {
            width: 80px;
            height: 80px;
            background: #27ae60;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            color: white;
            font-size: 2rem;
        }
        
        .success-title {
            color: #27ae60;
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .success-message {
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
            color: #27ae60;
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
        }
        
        .btn:hover {
            background: #2980b9;
        }
        
        .btn-secondary {
            background: #95a5a6;
            margin-left: 1rem;
        }
        
        .btn-secondary:hover {
            background: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="success-container">
        <div class="success-icon">
            <i class="fas fa-check"></i>
        </div>
        
        <h1 class="success-title">Payment Successful!</h1>
        
        <p class="success-message">
            Thank you for your purchase! Your payment has been processed successfully.
            You will receive an email confirmation shortly.
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
                <span>Paid</span>
            </div>
        </div>
        
        <div class="button-group">
            <a href="index.html" class="btn">Continue Shopping</a>
            <a href="#" class="btn btn-secondary" onclick="window.print()">Print Receipt</a>
        </div>
    </div>
    
    <script>
        // Clear cart from localStorage
        localStorage.removeItem('shoppingCart');
        
        // Show success notification
        setTimeout(() => {
            alert('Payment successful! Your order has been confirmed.');
        }, 1000);
    </script>
</body>
</html> 