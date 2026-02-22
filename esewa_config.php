<?php
// eSewa Payment Configuration
// This file contains all the configuration settings for eSewa payment integration

// eSewa API Configuration
define('ESEWA_MERCHANT_ID', 'EPAYTEST'); // Your eSewa merchant ID
define('ESEWA_SECRET_KEY', '8gBm/:&EnhH.1/q'); // Your eSewa secret key
define('ESEWA_API_URL', 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'); // eSewa API URL

// Success and Failure URLs
define('ESEWA_SUCCESS_URL', 'http://localhost/e-commerce1/success.php');
define('ESEWA_FAILURE_URL', 'http://localhost/e-commerce1/failure.php');

// Transaction Settings
define('ESEWA_SERVICE_CHARGE', '0.00'); // Service charge amount
define('ESEWA_DELIVERY_CHARGE', '100.00'); // Delivery charge amount
define('ESEWA_VAT_RATE', 0.13); // VAT rate (13%)

// Logging Configuration
define('ESEWA_LOG_TRANSACTIONS', true); // Enable/disable transaction logging
define('ESEWA_LOG_FILE', 'logs/esewa_transactions.log'); // Log file path

// Test Mode Configuration
define('ESEWA_TEST_MODE', true); // Set to false for production
define('ESEWA_TEST_PRODUCT_CODE', 'EPAYTEST'); // Test product code

// Production Configuration (when test mode is false)
define('ESEWA_PRODUCTION_PRODUCT_CODE', 'YOUR_PRODUCTION_CODE'); // Your production product code

/**
 * Get eSewa configuration based on environment
 */
function getEsewaConfig() {
    $config = [
        'merchant_id' => ESEWA_MERCHANT_ID,
        'secret_key' => ESEWA_SECRET_KEY,
        'api_url' => ESEWA_API_URL,
        'success_url' => ESEWA_SUCCESS_URL,
        'failure_url' => ESEWA_FAILURE_URL,
        'service_charge' => ESEWA_SERVICE_CHARGE,
        'delivery_charge' => ESEWA_DELIVERY_CHARGE,
        'vat_rate' => ESEWA_VAT_RATE,
        'test_mode' => ESEWA_TEST_MODE,
        'product_code' => ESEWA_TEST_MODE ? ESEWA_TEST_PRODUCT_CODE : ESEWA_PRODUCTION_PRODUCT_CODE
    ];
    
    return $config;
}

/**
 * Log eSewa transaction
 */
function logEsewaTransaction($status, $data) {
    if (!ESEWA_LOG_TRANSACTIONS) {
        return;
    }
    
    $log_data = [
        'timestamp' => date('Y-m-d H:i:s'),
        'status' => $status,
        'data' => $data
    ];
    
    $log_dir = dirname(ESEWA_LOG_FILE);
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    file_put_contents(ESEWA_LOG_FILE, json_encode($log_data) . "\n", FILE_APPEND);
}

/**
 * Generate eSewa signature
 */
function generateEsewaSignature($totalAmount, $transactionUuid, $productCode) {
    $message = "total_amount={$totalAmount},transaction_uuid={$transactionUuid},product_code={$productCode}";
    $signature = hash_hmac('sha256', $message, ESEWA_SECRET_KEY);
    return base64_encode($signature);
}

/**
 * Validate eSewa response
 */
function validateEsewaResponse($data) {
    $required_fields = ['transaction_uuid', 'total_amount', 'product_code'];
    
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            return false;
        }
    }
    
    return true;
}

/**
 * Calculate total amount with taxes and charges
 */
function calculateTotalAmount($subtotal) {
    $vat = $subtotal * ESEWA_VAT_RATE;
    $delivery = floatval(ESEWA_DELIVERY_CHARGE);
    $service = floatval(ESEWA_SERVICE_CHARGE);
    
    return $subtotal + $vat + $delivery + $service;
}

/**
 * Format amount for eSewa
 */
function formatAmount($amount) {
    return number_format($amount, 2, '.', '');
}
?> 