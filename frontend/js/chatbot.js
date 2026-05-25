const API_URL = '/chatbot';

let conversationHistory = [];
let currentSubject = localStorage.getItem('selectedSubject') || 'General';
let initialPrompt = localStorage.getItem('chatPrompt') || '';

document.addEventListener('DOMContentLoaded', () => {
    initializeChatbot();
    loadInitialPrompt();
});

function initializeChatbot() {
    // Display current subject
    document.getElementById('subjectName').textContent = currentSubject;
    
    // Setup event listeners
    document.getElementById('sendMessage').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize textarea
    const textarea = document.getElementById('messageInput');
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });
}

async function loadInitialPrompt() {
    if (initialPrompt) {
        setTimeout(() => {
            sendInitialMessage(initialPrompt);
            localStorage.removeItem('chatPrompt');
        }, 500);
    }
}

async function sendInitialMessage(message) {
    addMessageToChat(message, 'user');
    await sendToBackend(message);
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessageToChat(message, 'user');
    input.value = '';
    input.style.height = 'auto';
    
    await sendToBackend(message);
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = marked.parse(message);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendToBackend(message) {
    // Show typing indicator
    showTypingIndicator();
    
    const language = document.getElementById('languageSelect').value;
    const difficulty = document.getElementById('difficultySelect').value;
    
    // Add user message to history
    conversationHistory.push({ role: 'user', content: message });
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: conversationHistory,
                language: language,
                difficulty: difficulty,
                userName: 'Student'
            })
        });
        
        const data = await response.json();
        console.log(data.reply);
        console.log(typeof data.reply);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        if (data.reply) {
            addMessageToChat(data.reply, 'bot');
            conversationHistory.push({ role: 'assistant', content: data.reply });
        } else if (data.error) {
            addMessageToChat('Sorry, I encountered an error. Please try again.', 'bot');
        }
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessageToChat('Sorry, I could not connect to the server. Please make sure the backend is running.error message ' + error.message, 'bot');
    }
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(content);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add typing animation CSS
const style = document.createElement('style');
style.textContent = `
    .typing-dots {
        display: flex;
        gap: 4px;
        padding: 8px;
    }
    .typing-dots span {
        width: 8px;
        height: 8px;
        background: #999;
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }
    .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }
    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
        }
        30% {
            transform: translateY(-10px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);