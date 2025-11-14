<?php
session_start();

// Database configuration 
define('DB_HOST', 'localhost');
define('DB_NAME', 'creolink');
define('DB_USER', 'root');  // Default XAMPP username
define('DB_PASS', '');      // Default XAMPP password (empty)

// Establish database connection
function getDBConnection() {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch(PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['contact_submit'])) {
        handleContactForm();
    } elseif (isset($_POST['chat_message'])) {
        handleChatMessage();
    }
}

function handleContactForm() {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');
    
    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        $_SESSION['contact_error'] = "All fields are required!";
        return;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['contact_error'] = "Please enter a valid email address!";
        return;
    }
    
    // Save to database (you'll need to create the table first)
    $pdo = getDBConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO contact_submissions (name, email, message, created_at) VALUES (?, ?, ?, NOW())");
            $stmt->execute([$name, $email, $message]);
            $_SESSION['contact_success'] = "Thank you for your message! We'll get back to you soon.";
        } catch(PDOException $e) {
            error_log("Contact form error: " . $e->getMessage());
            $_SESSION['contact_error'] = "Sorry, there was an error sending your message. Please try again.";
        }
    }
    
    // Clear form
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

function handleChatMessage() {
    $message = htmlspecialchars($_POST['chat_message'] ?? '');
    $user_id = $_SESSION['user_id'] ?? 'anonymous';
    
    if (!empty($message)) {
        // Save chat message to database
        $pdo = getDBConnection();
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("INSERT INTO chat_messages (user_id, message, is_bot, created_at) VALUES (?, ?, 0, NOW())");
                $stmt->execute([$user_id, $message]);
                
                // Generate bot response
                $botResponse = generateBotResponse($message);
                
                $stmt = $pdo->prepare("INSERT INTO chat_messages (user_id, message, is_bot, created_at) VALUES (?, ?, 1, NOW())");
                $stmt->execute([$user_id, $botResponse]);
                
                echo json_encode(['success' => true, 'bot_response' => $botResponse]);
            } catch(PDOException $e) {
                error_log("Chat message error: " . $e->getMessage());
                echo json_encode(['success' => false, 'error' => 'Message not saved']);
            }
        }
    }
    exit;
}

function generateBotResponse($userMessage) {
    $userMessage = strtolower(trim($userMessage));
    
    $responses = [
        'hello' => 'Hello! How can I help you with CREOLINK today?',
        'hi' => 'Hi there! Welcome to CREOLINK. What can I assist you with?',
        'help' => 'I can help you with information about our services, contact details, or answer general questions about CREOLINK.',
        'services' => 'We offer web development, chatbot integration, and custom software solutions. Which service are you interested in?',
        'contact' => 'You can reach us through the contact form on this page or email us directly.',
        'thanks' => 'You\'re welcome! Is there anything else I can help you with?',
        'thank you' => 'You\'re welcome! Let me know if you need any other assistance.',
        'price' => 'Our pricing varies based on project requirements. Please contact us for a detailed quote.',
        'default' => 'I understand you said: "' . $userMessage . '". How can I assist you further with CREOLINK?'
    ];
    
    foreach ($responses as $keyword => $response) {
        if (strpos($userMessage, $keyword) !== false) {
            return $response;
        }
    }
    
    return $responses['default'];
}

// Get recent chat history
function getChatHistory($limit = 10) {
    $pdo = getDBConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM chat_messages WHERE user_id = ? ORDER BY created_at DESC LIMIT ?");
            $user_id = $_SESSION['user_id'] ?? 'anonymous';
            $stmt->execute([$user_id, $limit]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            error_log("Chat history error: " . $e->getMessage());
            return [];
        }
    }
    return [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CREOLINK - Home</title>
    <link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="chatbot.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="index.php">CREOLINK</a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item"><a href="index.php" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="pages/services.php" class="nav-link">Services</a></li>
                <li class="nav-item"><a href="pages/about.php" class="nav-link">About</a></li>
                <li class="nav-item"><a href="pages/contact.php" class="nav-link">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Main Content -->
    <main>
        <section class="hero">
            <div class="hero-content">
                <h1>Welcome to CREOLINK</h1>
                <p>Your partner in digital innovation and web solutions</p>
                <a href="pages/services.php" class="cta-button">Explore Our Services</a>
            </div>
        </section>

        <!-- Contact Form Section -->
        <section class="contact-section">
            <div class="container">
                <h2>Get In Touch</h2>
                
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
                        <input type="text" name="name" placeholder="Your Name" required value="<?= $_POST['name'] ?? '' ?>">
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Your Email" required value="<?= $_POST['email'] ?? '' ?>">
                    </div>
                    <div class="form-group">
                        <textarea name="message" placeholder="Your Message" rows="5" required><?= $_POST['message'] ?? '' ?></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
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