<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid request method. Please use the contact form.']);
    exit;
}

// Honeypot check
if (!empty($_POST['honeypot'])) {
    // Likely a bot - redirect to thank you page
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
    echo json_encode(['error' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter a valid email address.']);
    exit;
}

// Initialize PHPMailer
$mail = new PHPMailer(true);

try {
    // Enable debugging (set to 2 for detailed output, 0 for production)
    $mail->SMTPDebug = 2; // Change to 0 in production
    $mail->Debugoutput = 'html';

    // Server settings
    $mail->isSMTP();
    $mail->Host = 'mail.causeofourjoyschool.com'; // Verify with Hostinger
    $mail->SMTPAuth = true;
    $mail->Username = 'noreply@causeofourjoyschool.com';
    $mail->Password = '@a22%17#COUJ'; // Replace with actual password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    // Recipients
    $mail->setFrom('noreply@causeofourjoyschool.com', 'Cause of Our Joy School');
    $mail->addAddress('masendiaaron6@gmail.com', 'School Administrator');
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
    // Log the error
    error_log('Mailer Error: ' . $mail->ErrorInfo);
    
    // Return JSON error for debugging
    http_response_code(500);
    echo json_encode(['error' => 'Message could not be sent. Error: ' . $mail->ErrorInfo]);
}
?>