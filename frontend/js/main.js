// External links configuration


const EXTERNAL_LINKS = {
    // Study Guides External Links
    studyGuides: {
        "Mathematics Study Guide": "frontend/assets/TopStudent_Grd12_StudyGuide_Mathematics_MindTheGap_DBE.pdf",
        "Physical Sciences Study Guide": "frontend/assets/TopStudent_Grd12_StudyGuide_Physics_MindTheGap_DBE.pdf",
        "Life Sciences Study Guide": "frontend/assets/TopStudent_Grd12_StudyGuide_LifeSci_MindTheGap_DBE.pdf",
        "Geography Study Guide": "frontend/assets/TopStudent_Grd12_StudyGuide_Geography_MindTheGap_DBE.pdf",
        "Economics Study Guide": "frontend/assets/TopStudent_Grd12_StudyGuide_Economics_MindTheGap_DBE.pdf",
        "Business Studies Study Guide": "frontend/assets/TopStudent_Grd12_StudyGuide_BusinessStudy_P1_DBE.pdf",
        "Accounting Study Guide": "https://mlwxxtvsozhwzjxmsvbg.supabase.co/storage/v1/object/sign/guides/Accounting/TopStudent_Grd12_StudyGuide_Accounting_MindTheGap_DBE.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MzZkM2M4Ny0zNGNiLTRmNTYtODAxYy05NmQ2ZGI5MTZiNzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJndWlkZXMvQWNjb3VudGluZy9Ub3BTdHVkZW50X0dyZDEyX1N0dWR5R3VpZGVfQWNjb3VudGluZ19NaW5kVGhlR2FwX0RCRS5wZGYiLCJpYXQiOjE3NzkzNTE0MTIsImV4cCI6MTc3OTM1NTAxMn0.P8IF4c-xvFgb_rHeVQiIAAtMoGKwuW4iCHOsRaYZ1Hw",
        "History Study Guide": "https://mlwxxtvsozhwzjxmsvbg.supabase.co/storage/v1/object/sign/guides/History/TopStudent_Grd12_StudyGuide_History_P1_DBE.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MzZkM2M4Ny0zNGNiLTRmNTYtODAxYy05NmQ2ZGI5MTZiNzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJndWlkZXMvSGlzdG9yeS9Ub3BTdHVkZW50X0dyZDEyX1N0dWR5R3VpZGVfSGlzdG9yeV9QMV9EQkUucGRmIiwiaWF0IjoxNzc5MzUxNDE2LCJleHAiOjE3NzkzNTUwMTZ9.yJJhHHtoaPnA8vz73UT-UpJQtbU1-DfnbHbc7HuFCzc"
    },
    
    // Subjects External Learning Resources
    subjects: {
        "Mathematics": "https://www.khanacademy.org/math",
        "Physical Sciences": "https://www.khanacademy.org/science/physics",
        "Life Sciences": "https://www.khanacademy.org/science/biology",
        "Geography": "https://www.nationalgeographic.org/education/",
        "Economics": "https://www.khanacademy.org/economics-finance-domain",
        "Business Studies": "https://www.businessstudies.co.za/",
        "Accounting": "https://www.accountingcoach.com/",
        "History": "https://www.history.com/topics",
        "English Home Language": "https://www.english-grammar-lessons.com/",
        "Afrikaans First Additional Language": "https://www.afrikaans.com/resources",
        "IsiXhosa Home Language": "https://www.xhosa.co.za/learning",
        "IsiZulu Home Language": "https://www.zulu.co.za/learning"
    },
    
    // Past Papers External Links
    pastPapers: {
        "Mathematics Past Papers": "https://mlwxxtvsozhwzjxmsvbg.supabase.co/storage/v1/object/public/papers/Mathematics/TopStudent_Mathematics_Grd12_2024_June_P1_QP_DBE.pdf",
        "Physical Sciences Past Papers": "https://www.education.gov.za/Examinations/PastExamPapers/PhysicalSciences.aspx",
        "Life Sciences Past Papers": "https://www.education.gov.za/Examinations/PastExamPapers/LifeSciences.aspx",
        "Geography Past Papers": "https://www.education.gov.za/Examinations/PastExamPapers/Geography.aspx",
        "Economics Past Papers": "https://www.education.gov.za/Examinations/PastExamPapers/Economics.aspx",
        "Business Studies Past Papers": "https://www.education.gov.za/Examinations/PastExamPapers/BusinessStudies.aspx"
    }
};

// CAPS Subjects for Grade 12
const CAPS_SUBJECTS = [
    "Mathematics",
    "Physical Sciences",
    "Life Sciences",
    "Geography",
    "Economics",
    "Business Studies",
    "Accounting",
    "History",
    "English Home Language",
    "Afrikaans First Additional Language",
    "IsiXhosa Home Language",
    "IsiZulu Home Language"
];

// Study Guides
const STUDY_GUIDES = [
    "Mathematics Study Guide",
    "Physical Sciences Study Guide",
    "Life Sciences Study Guide",
    "Geography Study Guide",
    "Economics Study Guide",
    "Business Studies Study Guide",
    "Accounting Study Guide",
    "History Study Guide"
];

// Past Papers categories
const PAST_PAPERS = [
    "Mathematics Past Papers",
    "Physical Sciences Past Papers",
    "Life Sciences Past Papers",
    "Geography Past Papers",
    "Economics Past Papers",
    "Business Studies Past Papers"
];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeFeatureCards();
    initializeEduBotButton();
    initializeModal();
});

// Initialize sidebar sections
function initializeSidebar() {
    const sections = ['study-guides', 'subjects', 'past-papers'];
    
    sections.forEach(section => {
        const sectionItems = document.querySelector(`[data-section="${section}"]`);
        if (sectionItems) {
            let items = [];
            if (section === 'study-guides') items = STUDY_GUIDES;
            else if (section === 'subjects') items = CAPS_SUBJECTS;
            else items = PAST_PAPERS;
            
            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'section-item';
                itemElement.textContent = item;
                itemElement.onclick = () => handleSectionItemClick(section, item);
                sectionItems.appendChild(itemElement);
            });
        }
    });
    
    // Toggle sections on click
    document.querySelectorAll('.section-title').forEach(title => {
        title.addEventListener('click', () => {
            const parent = title.closest('.nav-section');
            parent.classList.toggle('active');
        });
    });
}

// Handle sidebar item clicks - Open external links
function handleSectionItemClick(section, item) {
    let externalUrl = null;
    
    // Get the external URL based on section and item
    if (section === 'study-guides') {
        externalUrl = EXTERNAL_LINKS.studyGuides[item];
    } else if (section === 'subjects') {
        externalUrl = EXTERNAL_LINKS.subjects[item];
    } else if (section === 'past-papers') {
        externalUrl = EXTERNAL_LINKS.pastPapers[item];
    }
    
    // If external URL exists, open in new tab
    if (externalUrl) {
        window.open(externalUrl, '_blank');
    } else {
        // Fallback: Show message and offer to search
        showExternalLinkMessage(item, section);
    }
}

// Show message when link is not configured
function showExternalLinkMessage(item, section) {
    const modal = document.getElementById('subjectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = "External Resource";
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'external-message';
    messageDiv.innerHTML = `
        <p style="color: white; margin-bottom: 1rem;">
            The resource for "${item}" is not yet configured.
        </p>
        <p style="color: rgba(255,255,255,0.7); margin-bottom: 1.5rem;">
            Would you like to search for "${item}" online?
        </p>
        <div style="display: flex; gap: 1rem;">
            <button onclick="searchOnline('${item}', '${section}')" class="search-online-btn">
                Search Online
            </button>
            <button onclick="closeModal()" class="cancel-btn">
                Cancel
            </button>
        </div>
    `;
    
    modalBody.innerHTML = '';
    modalBody.appendChild(messageDiv);
    modal.style.display = 'block';
    
    // Close modal handlers
    document.querySelector('.close').onclick = closeModal;
    window.onclick = (event) => {
        if (event.target === modal) closeModal();
    };
}

// Search online for the resource
function searchOnline(item, section) {
    let searchQuery = item;
    if (section === 'subjects') {
        searchQuery = `${item} Grade 12 CAPS curriculum South Africa`;
    } else if (section === 'study-guides') {
        searchQuery = `${item} Grade 12 South Africa`;
    } else {
        searchQuery = `${item} Grade 12 NSC`;
    }
    
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(searchUrl, '_blank');
    closeModal();
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('subjectModal');
    if (modal) modal.style.display = 'none';
}

// Initialize feature cards
function initializeFeatureCards() {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', () => {
            const type = card.getAttribute('data-card');
            showSubjectModal(type);
        });
    });
}

// Show subject selection modal
function showSubjectModal(type) {
    const modal = document.getElementById('subjectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `Select ${type.replace('-', ' ').toUpperCase()}`;
    
    let items = [];
    if (type === 'study-guides') items = STUDY_GUIDES;
    else if (type === 'subjects') items = CAPS_SUBJECTS;
    else items = PAST_PAPERS;
    
    const subjectList = document.createElement('div');
    subjectList.className = 'subject-list';
    
    items.forEach(item => {
        const subjectItem = document.createElement('div');
        subjectItem.className = 'subject-item';
        subjectItem.textContent = item;
        subjectItem.onclick = () => {
            handleSubjectSelection(type, item);
            modal.style.display = 'none';
        };
        subjectList.appendChild(subjectItem);
    });
    
    modalBody.innerHTML = '';
    modalBody.appendChild(subjectList);
    modal.style.display = 'block';
    
    // Close modal
    document.querySelector('.close').onclick = () => {
        modal.style.display = 'none';
    };
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Handle subject selection - Open external links
function handleSubjectSelection(type, item) {
    let externalUrl = null;
    
    if (type === 'study-guides') {
        externalUrl = EXTERNAL_LINKS.studyGuides[item];
    } else if (type === 'subjects') {
        externalUrl = EXTERNAL_LINKS.subjects[item];
    } else {
        externalUrl = EXTERNAL_LINKS.pastPapers[item];
    }
    
    if (externalUrl) {
        window.open(externalUrl, '_blank');
    } else {
        // Show search option
        showExternalLinkMessage(item, type);
    }
}

// Initialize EduBot button
function initializeEduBotButton() {
    const edubotBtn = document.getElementById('edubotButton');
    if (edubotBtn) {
        edubotBtn.addEventListener('click', () => {
            window.location.href = 'pages/chatbot.html';
        });
    }
}

// Add CSS for external message buttons
const externalStyle = document.createElement('style');
externalStyle.textContent = `
    .external-message {
        text-align: center;
    }
    
    .search-online-btn {
        background: linear-gradient(135deg, #e67e22, #d35400);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
    }
    
    .search-online-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(230, 126, 34, 0.4);
    }
    
    .cancel-btn {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
    }
    
    .cancel-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(externalStyle);