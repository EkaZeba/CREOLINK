<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Services - CREOLINK</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="../index.php">CREOLINK</a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item"><a href="../index.php" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="services.php" class="nav-link active">Services</a></li>
                <li class="nav-item"><a href="about.php" class="nav-link">About</a></li>
                <li class="nav-item"><a href="contact.php" class="nav-link">Contact</a></li>
            </ul>
        </div>
    </nav>

    <main>
        <section class="services-hero">
            <div class="container">
                <h1>Our Services</h1>
                <p>Comprehensive digital solutions for your business</p>
            </div>
        </section>

        <section class="services-grid">
            <div class="container">
                <div class="service-card">
                    <h3>Web Development</h3>
                    <p>Custom websites and web applications built with modern technologies.</p>
                </div>
                <div class="service-card">
                    <h3>Chatbot Integration</h3>
                    <p>AI-powered chatbots to enhance customer engagement and support.</p>
                </div>
                <div class="service-card">
                    <h3>PHP Backend</h3>
                    <p>Robust server-side solutions and API development.</p>
                </div>
            </div>
        </section>
    </main>

    <script src="../script.js"></script>
</body>
</html>