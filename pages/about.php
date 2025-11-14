<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - CREOLINK</title>
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
                <li class="nav-item"><a href="about.php" class="nav-link active">About</a></li>
                <li class="nav-item"><a href="contact.php" class="nav-link">Contact</a></li>
            </ul>
        </div>
    </nav>

    <main>
        <section class="about-hero">
            <div class="container">
                <h1>About CREOLINK</h1>
                <p>Driving digital innovation since 2024</p>
            </div>
        </section>

        <section class="about-content">
            <div class="container">
                <div class="about-text">
                    <h2>Our Story</h2>
                    <p>CREOLINK was founded with a vision to bridge the gap between businesses and cutting-edge digital solutions. We specialize in creating responsive websites, intelligent chatbots, and robust backend systems that drive growth and efficiency.</p>
                    
                    <h2>Our Mission</h2>
                    <p>To empower businesses with innovative web technologies that enhance user experience, streamline operations, and foster meaningful connections with their audience.</p>
                    
                    <h2>Our Values</h2>
                    <div class="values-grid">
                        <div class="value-item">
                            <h3>Innovation</h3>
                            <p>Staying ahead with the latest technologies and trends</p>
                        </div>
                        <div class="value-item">
                            <h3>Quality</h3>
                            <p>Delivering exceptional, bug-free code and designs</p>
                        </div>
                        <div class="value-item">
                            <h3>Support</h3>
                            <p>Providing ongoing maintenance and customer support</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="team-section">
            <div class="container">
                <h2>Our Team</h2>
                <div class="team-grid">
                    <div class="team-member">
                        <h3>John Depp</h3>
                        <p>Founder & Lead Developer</p>
                        <p>Specializing in PHP, JavaScript, and full-stack development</p>
                    </div>
                    <div class="team-member">
                        <h3>CREOLINK Team</h3>
                        <p>Development Experts</p>
                        <p>Dedicated professionals committed to delivering excellence</p>
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