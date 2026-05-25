// Sample past papers data
const pastPapersData = [
    { id: 1, subject: "Mathematics", year: "2023", paper: "Paper 1", downloadUrl: "#", icon: "fas fa-calculator" },
    { id: 2, subject: "Mathematics", year: "2023", paper: "Paper 2", downloadUrl: "#", icon: "fas fa-calculator" },
    { id: 3, subject: "Mathematics", year: "2022", paper: "Paper 1", downloadUrl: "#", icon: "fas fa-calculator" },
    { id: 4, subject: "Physical Sciences", year: "2023", paper: "Paper 1", downloadUrl: "#", icon: "fas fa-flask" },
    { id: 5, subject: "Physical Sciences", year: "2023", paper: "Paper 2", downloadUrl: "#", icon: "fas fa-flask" },
    { id: 6, subject: "Physical Sciences", year: "2022", paper: "Paper 1", downloadUrl: "#", icon: "fas fa-flask" },
    { id: 7, subject: "Life Sciences", year: "2023", paper: "Paper 1", downloadUrl: "#", icon: "fas fa-dna" },
    { id: 8, subject: "Life Sciences", year: "2023", paper: "Paper 2", downloadUrl: "#", icon: "fas fa-dna" },
    { id: 9, subject: "Life Sciences", year: "2022", paper: "Paper 1", downloadUrl: "#", icon: "fas fa-dna" },
    { id: 10, subject: "Geography", year: "2023", paper: "Paper 1", downloadUrl: "#", icon: "fas fa-globe" },
    { id: 11, subject: "Geography", year: "2023", paper: "Paper 2", downloadUrl: "#", icon: "fas fa-globe" },
    { id: 12, subject: "Economics", year: "2023", paper: "Paper 1", downloadUrl: "#", icon: "fas fa-chart-line" },
    { id: 13, subject: "Economics", year: "2023", paper: "Paper 2", downloadUrl: "#", icon: "fas fa-chart-line" },
    { id: 14, subject: "Business Studies", year: "2023", paper: "Paper 1", downloadUrl: "#", icon: "fas fa-briefcase" },
    { id: 15, subject: "Business Studies", year: "2023", paper: "Paper 2", downloadUrl: "#", icon: "fas fa-briefcase" }
];

// Daily motivation quotes
const motivationQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The secret of getting ahead is getting started. - Mark Twain",
    "Your attitude, not your aptitude, will determine your altitude. - Zig Ziglar",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initializePastPapers();
    initializeFilters();
    setDailyMotivation();
});

function initializePastPapers() {
    displayPastPapers(pastPapersData);
}

function displayPastPapers(papers) {
    const papersGrid = document.getElementById('papersGrid');
    papersGrid.innerHTML = '';
    
    papers.forEach(paper => {
        const paperCard = createPaperCard(paper);
        papersGrid.appendChild(paperCard);
    });
}

function createPaperCard(paper) {
    const card = document.createElement('div');
    card.className = 'paper-card';
    card.onclick = () => handlePaperClick(paper);
    
    const header = document.createElement('div');
    header.className = 'paper-header';
    header.innerHTML = `<i class="${paper.icon}"></i>`;
    
    const body = document.createElement('div');
    body.className = 'paper-body';
    body.innerHTML = `
        <div class="paper-subject">${paper.subject}</div>
        <div class="paper-year">${paper.year}</div>
        <div class="paper-name">${paper.paper}</div>
        <button class="download-btn" onclick="event.stopPropagation(); downloadPaper('${paper.downloadUrl}')">
            <i class="fas fa-download"></i> Download
        </button>
    `;
    
    card.appendChild(header);
    card.appendChild(body);
    
    return card;
}

function initializeFilters() {
    const searchInput = document.getElementById('subjectSearch');
    searchInput.addEventListener('input', filterPapers);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterPapers();
        });
    });
}

function filterPapers() {
    const searchTerm = document.getElementById('subjectSearch').value.toLowerCase();
    
    let filteredPapers = pastPapersData;
    
    // Apply subject filter
    if (currentFilter !== 'all') {
        filteredPapers = filteredPapers.filter(paper => 
            paper.subject.toLowerCase() === currentFilter
        );
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredPapers = filteredPapers.filter(paper =>
            paper.subject.toLowerCase().includes(searchTerm) ||
            paper.year.includes(searchTerm)
        );
    }
    
    displayPastPapers(filteredPapers);
}

function handlePaperClick(paper) {
    // Store the subject and create a prompt
    const prompt = `I want to practice with ${paper.subject} ${paper.year} ${paper.paper}. Can you help me with similar questions or explain concepts?`;
    localStorage.setItem('chatPrompt', prompt);
    localStorage.setItem('selectedSubject', paper.subject);
    window.location.href = 'chatbot.html';
}

function downloadPaper(url) {
    // For demo purposes, show alert
    alert('Download functionality would be implemented here. In production, this would download the actual PDF file.');
    // window.open(url, '_blank');
}

function setDailyMotivation() {
    const randomIndex = Math.floor(Math.random() * motivationQuotes.length);
    const motivationText = document.getElementById('motivationText');
    motivationText.textContent = motivationQuotes[randomIndex];
}

// Refresh motivation every hour
setInterval(setDailyMotivation, 3600000);