<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
    exit;
}

// Honeypot check
if (!empty($_POST['honeypot'])) {
    // This is likely a bot - just pretend it worked
    header('Location: thank-you.html');
    exit;
}

// Validate and sanitize inputs
$name = filter_var($_POST['name'] ?? '', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$subject = filter_var($_POST['subject'] ?? '', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
$message = filter_var($_POST['message'] ?? '', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);

// Validate required fields
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo "Please fill in all required fields.";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Please enter a valid email address.";
    exit;
}

// Initialize PHPMailer
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'mail.causeofourjoyschool.com'; // Your domain's mail server
    $mail->SMTPAuth = true;
    $mail->Username = 'noreply@causeofourjoyschool.com'; // Your Hostinger email
    $mail->Password = 'your-secure-password'; // Use an app-specific password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    // Recipients
    $mail->setFrom('noreply@causeofourjoyschool.com', 'Cause of Our Joy School');
    $mail->addAddress('causeofourjoykas@gmail.com', 'School Administrator');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = "New Contact: " . htmlspecialchars($subject);
    
    $mail->Body = "
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> " . htmlspecialchars($name) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
        <hr>
        <p>This message was sent from the contact form on your website.</p>
    ";
    
    $mail->AltBody = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

    $mail->send();
    
    // Redirect to thank you page
    header('Location: thank-you.html');
    exit;
    
} catch (Exception $e) {
    // Log the error for your review
    error_log('Mailer Error: ' . $mail->ErrorInfo);
    
    // User-friendly message
    http_response_code(500);
    echo "Message could not be sent. Please try again later or contact us directly at causeofourjoykas@gmail.com";
}
?>