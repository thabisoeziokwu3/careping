<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['full_name'];
    $clinic = $_POST['clinic_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    
    // Your email where you want to receive notifications
    $to = "hello@careping.com";
    
    // Email subject
    $subject = "New Demo Request from $name - CarePing";
    
    // Email body (HTML format)
    $body = "
    <!DOCTYPE html>
    <html>
    <head>
        <title>New CarePing Demo Request</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #075E54; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #075E54; }
            .value { margin-top: 5px; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Demo Request</h2>
                <p>CarePing Website</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Full Name:</div>
                    <div class='value'>$name</div>
                </div>
                <div class='field'>
                    <div class='label'>Clinic/Practice Name:</div>
                    <div class='value'>$clinic</div>
                </div>
                <div class='field'>
                    <div class='label'>Email Address:</div>
                    <div class='value'>$email</div>
                </div>
                <div class='field'>
                    <div class='label'>WhatsApp Number:</div>
                    <div class='value'>$phone</div>
                </div>";
    
    if (!empty($message)) {
        $body .= "
                <div class='field'>
                    <div class='label'>Message/Questions:</div>
                    <div class='value'>$message</div>
                </div>";
    }
    
    $body .= "
            </div>
            <div class='footer'>
                <p>This request came from the CarePing website contact form.</p>
                <p>You can reply directly to $email to follow up.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if(mail($to, $subject, $body, $headers)) {
        // Success - redirect back with success message
        header("Location: index.html?success=1#contact");
        exit();
    } else {
        // Error - redirect back with error message
        header("Location: index.html?error=1#contact");
        exit();
    }
} else {
    // If someone tries to access this file directly
    header("Location: index.html");
    exit();
}
?>