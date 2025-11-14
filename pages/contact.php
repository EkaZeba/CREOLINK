<?php
require_once('../index.php');
// Include the database functions from index.php
require_once('../index.php');

// Handle contact form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['contact_submit'])) {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $subject = htmlspecialchars($_POST['subject'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');
    
    // Basic validation
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $_SESSION['contact_error'] = "All fields are required!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['contact_error'] = "Please enter a valid email address!";
    } else {
        // Save to database
        $pdo = getDBConnection();
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("INSERT INTO contact_submissions (name, email, message, subject, created_at) VALUES (?, ?, ?, ?, NOW())");
                $stmt->execute([$name, $email, $message, $subject]);
                $_SESSION['contact_success'] = "Thank you for your message! We'll get back to you within 24 hours.";
                
                // Clear form
                $_POST = array();
            } catch(PDOException $e) {
                error_log("Contact form error: " . $e->getMessage());
                $_SESSION['contact_error'] = "Sorry, there was an error sending your message. Please try again.";
            }
        } else {
            $_SESSION['contact_error'] = "Database connection failed. Please try again later.";
        }
    }
    
    // Redirect to prevent form resubmission
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - CREOLINK</title>
    <link rel="stylesheet" href="/CREOLINK/styles.css">
<link rel="stylesheet" href="/CREOLINK/chatbot.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="../index.php">CREOLINK</a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item"><a href="../index.php" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="services.php" class="nav-link">Services</a></li>
                <li class="nav-item"><a href="about.php" class="nav-link">About</a></li>
                <li class="nav-item"><a href="contact.php" class="nav-link active">Contact</a></li>
            </ul>
        </div>
    </nav>

    <main>
        <section class="contact-hero">
            <div class="container">
                <h1>Contact Us</h1>
                <p>Get in touch with our team</p>
            </div>
        </section>

        <section class="contact-content">
            <div class="container">
                <div class="contact-grid">
                    <div class="contact-info">
                        <h2>Get In Touch</h2>
                        <div class="contact-item">
                            <h3>📍 Address</h3>
                            <p>123 Business District<br>City, State 10001</p>
                        </div>
                        <div class="contact-item">
                            <h3>📞 Phone</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div class="contact-item">
                            <h3>✉️ Email</h3>
                            <p>hello@creolink.com</p>
                        </div>
                        <div class="contact-item">
                            <h3>🕒 Business Hours</h3>
                            <p>Monday - Friday: 9:00 AM - 6:00 PM<br>
                               Saturday: 10:00 AM - 4:00 PM<br>
                               Sunday: Closed</p>
                        </div>
                    </div>

                    <div class="contact-form-section">
                        <h2>Send us a Message</h2>
                        
                        <?php if (isset($_SESSION['contact_success'])): ?>
                            <div class="alert alert-success">
                                <?= $_SESSION['contact_success']; ?>
                                <?php unset($_SESSION['contact_success']); ?>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (isset($_SESSION['contact_error'])): ?>
                            <div class="alert alert-error">
                                <?= $_SESSION['contact_error']; ?>
                                <?php unset($_SESSION['contact_error']); ?>
                            </div>
                        <?php endif; ?>
                        
                        <form method="POST" class="contact-form">
                            <input type="hidden" name="contact_submit" value="1">
                            <div class="form-group">
                                <input type="text" name="name" placeholder="Your Full Name" required 
                                       value="<?= htmlspecialchars($_POST['name'] ?? '') ?>">
                            </div>
                            <div class="form-group">
                                <input type="email" name="email" placeholder="Your Email Address" required 
                                       value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
                            </div>
                            <div class="form-group">
                                <input type="text" name="subject" placeholder="Subject" required 
                                       value="<?= htmlspecialchars($_POST['subject'] ?? '') ?>">
                            </div>
                            <div class="form-group">
                                <textarea name="message" placeholder="Your Message" rows="6" required><?= htmlspecialchars($_POST['message'] ?? '') ?></textarea>
                            </div>
                            <button type="submit" class="submit-btn">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <section class="map-section">
            <div class="container">
                <h2>Find Us</h2>
                <div class="map-placeholder">
                    <!-- You can replace this with a Google Maps embed -->
                    <div style="background: #f0f0f0; height: 300px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                        <p>Map Location - Business District Area</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Chatbot Widget -->
    <div class="chatbot-widget">
        <div class="chatbot-toggle">💬</div>
        <div class="chatbot-container">
            <div class="chatbot-header">
                <h3>CREOLINK Assistant</h3>
                <span class="close-chat">×</span>
            </div>
            <div class="chatbot-messages" id="chatMessages">
                <!-- Chat messages will appear here -->
            </div>
            <div class="chatbot-input">
                <input type="text" id="chatInput" placeholder="Type your message...">
                <button id="sendMessage">Send</button>
            </div>
        </div>
    </div>

    <script src="/CREOLINK/script.js"></script>
<script src="/CREOLINK/chatbot.js"></script>
</body>
</html>