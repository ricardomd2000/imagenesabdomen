/**
 * Abdominal Assessment App Logic
 * Manages Auth, Quiz Flow, Randomization, and Persistence
 */

// --- State Management ---
let currentState = {
    user: null,
    currentPart: 1, // 1, 2, or 3
    currentQuestionIndex: 0,
    questions: [], // Selected questions for the session
    answers: [], // User's answers
    score: {
        part1: 0,
        part2: 0,
        part3: 0,
        part4: 0,
        total: 0
    }
};

// --- DOM Elements ---
const DOM = {
    loading: document.getElementById('loading-overlay'),
    header: document.getElementById('app-header'),
    authSection: document.getElementById('auth-section'),
    introSection: document.getElementById('intro-section'),
    quizSection: document.getElementById('quiz-section'),
    resultsSection: document.getElementById('results-section'),
    emailInput: document.getElementById('email-input'),
    loginBtn: document.getElementById('login-btn'),
    authError: document.getElementById('auth-error'),
    displayEmail: document.getElementById('display-email'),
    startBtn: document.getElementById('start-btn'),
    nextBtn: document.getElementById('next-btn'),
    progressFill: document.getElementById('progress-fill'),
    partName: document.getElementById('part-name'),
    questionTitle: document.getElementById('question-title'),
    imageArea: document.getElementById('image-area'),
    questionImage: document.getElementById('question-image'),
    optionsArea: document.getElementById('options-area'),
    openAnswerArea: document.getElementById('open-answer-area'),
    openAnswerInput: document.getElementById('open-answer-input'),
    questionCounter: document.getElementById('question-counter'),
    finalScore: document.getElementById('final-score'),
    scoreProgress: document.getElementById('score-progress'),
    feedbackMessage: document.getElementById('feedback-message'),
    statTheory: document.getElementById('stat-theory'),
    statAnatomy: document.getElementById('stat-anatomy'),
    statDiag: document.getElementById('stat-diag'),
    statPath: document.getElementById('stat-path')
};

// --- Initialization ---
window.addEventListener('load', () => {
    setTimeout(() => {
        DOM.loading.style.display = 'none';
    }, 1500);
});

// --- Authentication ---
DOM.loginBtn.addEventListener('click', () => {
    const email = DOM.emailInput.value.trim().toLowerCase();
    
    const list = window.emailsList || [];
    if (list.includes(email)) {
        handleAuthSuccess(email);
    } else {
        DOM.authError.style.display = 'block';
        DOM.emailInput.style.borderColor = 'var(--error)';
    }
});

function handleAuthSuccess(email) {
    currentState.user = { email };
    DOM.displayEmail.textContent = email;
    DOM.authSection.style.display = 'none';
    DOM.header.style.display = 'flex';
    DOM.introSection.style.display = 'flex';
    
    prepareQuestions();
}

// --- Question Preparation ---
function prepareQuestions() {
    // Part 1: 6 random theory questions
    const p1 = shuffleArray([...questionsData.part1]).slice(0, 6).map(q => ({...q, part: 1, type: 'mc'}));
    
    // Part 2: 3 random anatomage images
    const p2 = shuffleArray([...questionsData.part2]).slice(0, 3).map(q => ({...q, part: 2, type: 'open'}));
    
    // Part 3: 10 random diagnostic images (Normal or Anatomage)
    const p3Pool = [
        ...questionsData.part2, 
        ...questionsData.part3.filter(item => item.src.includes('IMNORMAL'))
    ];
    const p3 = shuffleArray([...p3Pool]).slice(0, 10).map(q => {
        const options = generateDistractors(q.answer, p3Pool.map(item => item.answer));
        return {
            ...q,
            part: 3,
            type: 'mc',
            question: "¿Qué estructura se observa en la imagen?",
            options: options.shuffled,
            correctIndex: options.correctIndex
        };
    });

    // Part 4: 5 random pathological images (Identify affected organ)
    const p4Pool = questionsData.part3.filter(item => item.src.includes('IMPATOLOGICA'));
    const p4 = shuffleArray([...p4Pool]).slice(0, 5).map(q => ({
        ...q,
        part: 4,
        type: 'open',
        question: "¿Cuál es el principal órgano o estructura afectado en esta imagen?",
        answer: q.organ // Check against the organ field
    }));

    currentState.questions = [...p1, ...p2, ...p3, ...p4];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateDistractors(correctAnswer, allAnswers) {
    const uniqueAnswers = [...new Set(allAnswers)].filter(a => a !== correctAnswer);
    const distractors = shuffleArray(uniqueAnswers).slice(0, 3);
    const combined = shuffleArray([...distractors, correctAnswer]);
    return {
        shuffled: combined,
        correctIndex: combined.indexOf(correctAnswer)
    };
}

// --- Quiz Flow ---
DOM.startBtn.addEventListener('click', () => {
    DOM.introSection.style.display = 'none';
    DOM.quizSection.style.display = 'flex';
    renderQuestion();
});

function renderQuestion() {
    const q = currentState.questions[currentState.currentQuestionIndex];
    const totalQ = currentState.questions.length;
    
    // Update progress
    const progress = ((currentState.currentQuestionIndex) / totalQ) * 100;
    DOM.progressFill.style.width = `${progress}%`;
    DOM.questionCounter.textContent = `Pregunta ${currentState.currentQuestionIndex + 1} de ${totalQ}`;
    
    // Update Part Header
    const partNames = ["", "Parte 1: Teoría", "Parte 2: Anatomage", "Parte 3: Normal/Anat", "Parte 4: Patología"];
    DOM.partName.textContent = partNames[q.part];
    
    // Clear previous
    DOM.optionsArea.innerHTML = '';
    DOM.openAnswerInput.value = '';
    DOM.imageArea.style.display = 'none';
    DOM.optionsArea.style.display = 'none';
    DOM.openAnswerArea.style.display = 'none';
    
    // Render Title
    DOM.questionTitle.textContent = q.question || "Identifica la estructura marcada";

    // Render Image if applicable
    if (q.src) {
        DOM.imageArea.style.display = 'flex';
        DOM.questionImage.src = `IMAGENES_ABDOMEN/${q.src}`;
    }

    // Render Answer Input/Options
    if (q.type === 'mc') {
        DOM.optionsArea.style.display = 'grid';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + idx)}</span> ${opt}`;
            btn.onclick = () => selectOption(idx);
            DOM.optionsArea.appendChild(btn);
        });
    } else {
        DOM.openAnswerArea.style.display = 'block';
    }

    // Reset Next button
    DOM.nextBtn.disabled = true;
    DOM.nextBtn.style.opacity = '0.5';
}

function selectOption(index) {
    const btns = DOM.optionsArea.querySelectorAll('.option-btn');
    btns.forEach(b => b.classList.remove('selected'));
    btns[index].classList.add('selected');
    
    currentState.answers[currentState.currentQuestionIndex] = index;
    DOM.nextBtn.disabled = false;
    DOM.nextBtn.style.opacity = '1';
}

DOM.openAnswerInput.addEventListener('input', () => {
    const val = DOM.openAnswerInput.value.trim();
    currentState.answers[currentState.currentQuestionIndex] = val;
    DOM.nextBtn.disabled = val.length === 0;
    DOM.nextBtn.style.opacity = val.length === 0 ? '0.5' : '1';
});

DOM.nextBtn.addEventListener('click', () => {
    if (currentState.currentQuestionIndex < currentState.questions.length - 1) {
        currentState.currentQuestionIndex++;
        renderQuestion();
    } else {
        finishAssessment();
    }
});

// --- Results Calculation ---
function finishAssessment() {
    DOM.quizSection.style.display = 'none';
    DOM.loading.style.display = 'flex';
    DOM.loading.querySelector('p').textContent = 'Calculando resultados y guardando en sistema...';

    // Calculate Scores
    let p1Correct = 0;
    let p2Correct = 0;
    let p3Correct = 0;
    let p4Correct = 0;

    currentState.questions.forEach((q, i) => {
        const userAns = currentState.answers[i];
        if (q.part === 1) {
            if (userAns === q.correct) p1Correct++;
        } else if (q.part === 2) {
            if (isAnswerCorrect(userAns, q.answer)) p2Correct++;
        } else if (q.part === 3) {
            if (userAns === q.correctIndex) p3Correct++;
        } else if (q.part === 4) {
            if (isAnswerCorrect(userAns, q.answer)) p4Correct++;
        }
    });

    currentState.score = {
        part1: p1Correct,
        part2: p2Correct,
        part3: p3Correct,
        part4: p4Correct,
        total: ((p1Correct + p2Correct + p3Correct + p4Correct) / currentState.questions.length) * 5.0
    };

    saveToFirebase().then(() => {
        showResults();
        DOM.loading.style.display = 'none';
    });
}

function isAnswerCorrect(user, correct) {
    if (!user) return false;
    const u = user.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const c = correct.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    
    // Check for exact match or inclusion
    return u === c || c.includes(u) && u.length > 3;
}

async function saveToFirebase() {
    try {
        await db.collection('resultados_abdomen').add({
            email: currentState.user.email,
            score: currentState.score,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            answers: currentState.answers
        });
    } catch (e) {
        console.error("Error saving to Firebase: ", e);
        // Fallback for local testing if FB not configured
    }
}

function showResults() {
    DOM.resultsSection.style.display = 'flex';
    
    // Animate Score
    const score = currentState.score.total.toFixed(1);
    DOM.finalScore.textContent = score;
    
    const percentage = (currentState.score.total / 5.0) * 100;
    const offset = 502 - (502 * percentage) / 100;
    DOM.scoreProgress.style.strokeDashoffset = offset;

    // Feedback
    if (score >= 4.5) DOM.feedbackMessage.textContent = "¡Excelente nivel! Dominas la anatomía abdominal.";
    else if (score >= 3.5) DOM.feedbackMessage.textContent = "Buen trabajo, tienes bases sólidas.";
    else DOM.feedbackMessage.textContent = "Necesitas repasar algunos conceptos de segmentación e imagenología.";

    // Stats
    DOM.statTheory.textContent = `${currentState.score.part1}/6`;
    DOM.statAnatomy.textContent = `${currentState.score.part2}/3`;
    DOM.statDiag.textContent = `${currentState.score.part3}/10`;
    DOM.statPath.textContent = `${currentState.score.part4}/5`;
}
