document.addEventListener('DOMContentLoaded', function() {
            // Chatbot elements
            const chatbotIcon = document.getElementById('chatbot-icon');
            const chatbotWindow = document.getElementById('chatbot-window');
            const chatbotClose = document.getElementById('chatbot-close');
            const chatbotMessages = document.getElementById('chatbot-messages');
            const chatbotInput = document.getElementById('chatbot-input');
            const chatbotSend = document.getElementById('chatbot-send');
            
            // Toggle chatbot window
            chatbotIcon.addEventListener('click', function() {
                chatbotWindow.style.display = 'flex';
                // Add initial message if this is the first time opening
                if (chatbotMessages.children.length === 0) {
                    setTimeout(() => {
                        addMessage("Hello! I'm your HR Assistant. I'm here to help answer your questions while our HR team is preparing to assist you. How can I help you today?", 'bot');
                    }, 500);
                }
            });
            
            // Close chatbot window
            chatbotClose.addEventListener('click', function() {
                chatbotWindow.style.display = 'none';
            });
            
            // Send message on button click
            chatbotSend.addEventListener('click', sendMessage);
            
            // Send message on Enter key
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            function sendMessage() {
                const message = chatbotInput.value.trim();
                if (message === '') return;
                
                addMessage(message, 'user');
                chatbotInput.value = '';
                
                // Show typing indicator
                showTypingIndicator();
                
                // Simulate bot response after a delay
                setTimeout(() => {
                    removeTypingIndicator();
                    const response = getBotResponse(message);
                    addMessage(response, 'bot');
                }, 1500);
            }
            
            function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
                messageDiv.textContent = text;
                
                chatbotMessages.appendChild(messageDiv);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
            
            function showTypingIndicator() {
                const typingDiv = document.createElement('div');
                typingDiv.classList.add('typing-indicator');
                typingDiv.id = 'typingIndicator';
                
                for (let i = 0; i < 3; i++) {
                    const dot = document.createElement('span');
                    dot.classList.add('typing-dot');
                    typingDiv.appendChild(dot);
                }
                
                chatbotMessages.appendChild(typingDiv);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
            
            function removeTypingIndicator() {
                const typingIndicator = document.getElementById('typingIndicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
            }
            
            function getBotResponse(userMessage) {
                const message = userMessage.toLowerCase();
                
                if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
                    return "Hello! Thanks for reaching out. How can I assist you today?";
                } else if (message.includes('hour') || message.includes('open') || message.includes('time')) {
                    return "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. Our HR team is available during these hours to assist you.";
                } else if (message.includes('job') || message.includes('apply') || message.includes('career')) {
                    return "To apply for a job, please visit our careers page and submit your application through our online portal. You can also upload your resume there.";
                } else if (message.includes('benefit')) {
                    return "We offer a comprehensive benefits package including health insurance, retirement plans, paid time off, professional development opportunities, and flexible work arrangements.";
                } else if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
                    return "You can reach our HR department at hr@yourcompany.com or call (555) 123-4567 during business hours. Someone will get back to you as soon as possible.";
                } else if (message.includes('thank')) {
                    return "You're welcome! Is there anything else I can help you with while you wait for our HR team?";
                } else if (message.includes('wait') || message.includes('long')) {
                    return "Our HR team is currently preparing to assist you. The expected wait time is approximately 5-10 minutes. Thank you for your patience!";
                } else {
                    return "Thank you for your question. Our HR team will be able to provide more detailed assistance shortly. In the meantime, is there anything specific about our HR policies or procedures you'd like to know?";
                }
            }
        });