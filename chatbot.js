document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChat = document.querySelector('.close-chat');
    const sendButton = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Initialize chatbot if elements exist
    if (chatbotToggle && chatbotContainer && closeChat && sendButton && chatInput && chatMessages) {
        // Toggle chatbot visibility
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.style.display = chatbotContainer.style.display === 'block' ? 'none' : 'block';
        });

        // Close chatbot
        closeChat.addEventListener('click', function() {
            chatbotContainer.style.display = 'none';
        });

        // Send message function
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                addMessage(message, 'user');
                chatInput.value = '';

                // Simulate bot response
                setTimeout(() => {
                    const botResponse = generateBotResponse(message);
                    addMessage(botResponse, 'bot');
                }, 1000);
            }
        }

        // Send message on button click
        sendButton.addEventListener('click', sendMessage);

        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Add message to chat
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}-message`;
            messageDiv.textContent = text;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Generate bot response
        function generateBotResponse(userMessage) {
            const lowerMessage = userMessage.toLowerCase();
            
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                return 'Hello! How can I help you with CREOLINK today?';
            } else if (lowerMessage.includes('service')) {
                return 'We offer web development, chatbot integration, and custom software solutions.';
            } else if (lowerMessage.includes('contact')) {
                return 'You can reach us through the contact form or email us at hello@creolink.com';
            } else if (lowerMessage.includes('thank')) {
                return "You're welcome! Is there anything else I can help with?";
            } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
                return 'Our pricing varies based on project requirements. Please contact us for a detailed quote.';
            } else {
                return 'I understand you said: "' + userMessage + '". How can I assist you further with CREOLINK?';
            }
        }

        // Add welcome message
        addMessage('Hello! Welcome to CREOLINK. How can I assist you today?', 'bot');
    }
});