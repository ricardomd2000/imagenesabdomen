/**
 * Abdominal Assessment App Logic
 * Manages Auth, Quiz Flow, Randomization, and Persistence
 */

// --- State Management ---
let currentState = {
    user: null,
    sessionId: null, // Email based ID
    status: 'new', // new, in_progress, completed
    currentQuestionIndex: 0,
    questions: [], 
    answers: [], 
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
    statDiag: document.getElementById('stat-diag'),
    statPath: document.getElementById('stat-path'),
    // Teacher Elements
    passGroup: document.getElementById('pass-group'),
    passwordInput: document.getElementById('password-input'),
    teacherSection: document.getElementById('teacher-section'),
    teacherTableBody: document.getElementById('teacher-table-body'),
    totalStudents: document.getElementById('total-students'),
    avgScore: document.getElementById('avg-score'),
    completedCount: document.getElementById('completed-count'),
    exportBtn: document.getElementById('export-btn'),
    reviewSection: document.getElementById('review-section'),
    reviewStudentEmail: document.getElementById('review-student-email'),
    reviewContent: document.getElementById('review-content'),
    backToDashBtn: document.getElementById('back-to-dash-btn')
};

const TEACHER_EMAIL = "ricardoaldo@unisabana.edu.co";
const TEACHER_PASS = "Anfi2026**";

// --- Initialization ---
window.addEventListener('load', () => {
    setTimeout(() => {
        DOM.loading.style.display = 'none';
    }, 1500);
});

// --- Authentication ---
DOM.loginBtn.addEventListener('click', () => {
    const email = DOM.emailInput.value.trim().toLowerCase();
    
    // Check if it's the teacher
    if (email === TEACHER_EMAIL) {
        if (DOM.passGroup.style.display === 'none') {
            DOM.passGroup.style.display = 'block';
            DOM.emailInput.style.borderColor = 'var(--primary)';
            DOM.passwordInput.focus();
            return;
        }
        
        const pass = DOM.passwordInput.value;
        if (pass === TEACHER_PASS) {
            showTeacherDashboard();
        } else {
            DOM.authError.textContent = "Contraseña incorrecta.";
            DOM.authError.style.display = 'block';
            DOM.passwordInput.style.borderColor = 'var(--error)';
        }
        return;
    }

    const list = window.emailsList || [];
    if (list.includes(email)) {
        handleAuthSuccess(email);
    } else {
        DOM.authError.textContent = "Este correo no está en la lista de estudiantes autorizados.";
        DOM.authError.style.display = 'block';
        DOM.emailInput.style.borderColor = 'var(--error)';
    }
});

async function handleAuthSuccess(email) {
    currentState.user = { email };
    currentState.sessionId = email;
    DOM.displayEmail.textContent = email;
    
    DOM.loading.style.display = 'flex';
    DOM.loading.querySelector('p').textContent = 'Verificando estado de la evaluación...';

    try {
        const doc = await db.collection('evaluaciones_abdomen').doc(email).get();
        
        if (doc.exists) {
            const data = doc.data();
            currentState.status = data.status;
            currentState.questions = data.questions || [];
            currentState.answers = data.answers || [];
            currentState.currentQuestionIndex = data.currentQuestionIndex || 0;
            currentState.score = data.score || currentState.score;

            if (data.status === 'completed') {
                showResults();
                DOM.authSection.style.display = 'none';
                DOM.header.style.display = 'flex';
            } else {
                // Resume in_progress
                DOM.authSection.style.display = 'none';
                DOM.header.style.display = 'flex';
                DOM.quizSection.style.display = 'flex';
                renderQuestion();
            }
        } else {
            // New user
            DOM.authSection.style.display = 'none';
            DOM.header.style.display = 'flex';
            DOM.introSection.style.display = 'flex';
            prepareQuestions();
        }
    } catch (e) {
        console.error("Error checking session:", e);
        // Fallback for offline/errors
        DOM.authSection.style.display = 'none';
        DOM.header.style.display = 'flex';
        DOM.introSection.style.display = 'flex';
        prepareQuestions();
    }
    
    DOM.loading.style.display = 'none';
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

async function syncSessionWithFirebase() {
    if (!currentState.user) return;
    
    try {
        await db.collection('evaluaciones_abdomen').doc(currentState.sessionId).set({
            email: currentState.user.email,
            status: currentState.status,
            questions: currentState.questions,
            answers: currentState.answers,
            currentQuestionIndex: currentState.currentQuestionIndex,
            score: currentState.score,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (e) {
        console.error("Error syncing session:", e);
    }
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

function isAnswerCorrect(studentInput, correctValue) {
    if (!studentInput || !correctValue) return false;
    const cleanInput = studentInput.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const cleanCorrect = correctValue.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return cleanInput === cleanCorrect;
}

// --- Quiz Flow ---
DOM.startBtn.addEventListener('click', async () => {
    currentState.status = 'in_progress';
    DOM.introSection.style.display = 'none';
    DOM.loading.style.display = 'flex';
    DOM.loading.querySelector('p').textContent = 'Inicializando sesión segura...';
    
    await syncSessionWithFirebase();
    
    DOM.loading.style.display = 'none';
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

DOM.nextBtn.addEventListener('click', async () => {
    if (currentState.currentQuestionIndex < currentState.questions.length - 1) {
        currentState.currentQuestionIndex++;
        // Save progress before rendering next
        syncSessionWithFirebase(); 
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

    currentState.status = 'completed';
    syncSessionWithFirebase().then(() => {
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

// saveToFirebase was replaced by syncSessionWithFirebase for real-time persistence

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

// --- Teacher Dashboard Logic ---
async function showTeacherDashboard() {
    DOM.authSection.style.display = 'none';
    DOM.loading.style.display = 'flex';
    DOM.loading.querySelector('p').textContent = 'Cargando base de datos de estudiantes...';

    try {
        const snapshot = await db.collection('evaluaciones_abdomen').orderBy('lastUpdated', 'desc').get();
        const evaluations = [];
        snapshot.forEach(doc => evaluations.push(doc.data()));

        renderTeacherTable(evaluations);
        updateTeacherStats(evaluations);

        DOM.teacherSection.style.display = 'flex';
        DOM.header.style.display = 'flex';
        DOM.displayEmail.textContent = "MODO EVALUADOR";
        
        DOM.exportBtn.onclick = () => exportToCSV(evaluations);
    } catch (e) {
        console.error("Error loading dashboard:", e);
        alert("Error al cargar datos. Verifica tu conexión.");
    }

    DOM.loading.style.display = 'none';
}

function renderTeacherTable(evaluations) {
    DOM.teacherTableBody.innerHTML = '';
    
    evaluations.forEach(eval => {
        const tr = document.createElement('tr');
        const score = eval.score ? eval.score.total.toFixed(1) : '---';
        const date = eval.lastUpdated ? new Date(eval.lastUpdated.seconds * 1000).toLocaleDateString() : '---';
        const statusBadge = eval.status === 'completed' ? 
            `<span class="badge badge-success">Completado</span>` : 
            `<span class="badge badge-warning">En Progreso</span>`;

        tr.innerHTML = `
            <td style="padding: 1rem;">${eval.email}</td>
            <td style="padding: 1rem;">${statusBadge}</td>
            <td style="padding: 1rem; font-weight: 700;">${score}</td>
            <td style="padding: 1rem;">${date}</td>
            <td style="padding: 1rem;">
                <button class="btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.8rem;" onclick="viewStudentReview('${eval.email}')">Revisar</button>
            </td>
        `;
        DOM.teacherTableBody.appendChild(tr);
    });
}

function updateTeacherStats(evaluations) {
    const total = evaluations.length;
    const completed = evaluations.filter(e => e.status === 'completed');
    const avg = completed.length > 0 ? 
        completed.reduce((acc, curr) => acc + (curr.score ? curr.score.total : 0), 0) / completed.length : 0;

    DOM.totalStudents.textContent = total;
    DOM.completedCount.textContent = completed.length;
    DOM.avgScore.textContent = avg.toFixed(1);
}

async function viewStudentReview(email) {
    DOM.loading.style.display = 'flex';
    try {
        const doc = await db.collection('evaluaciones_abdomen').doc(email).get();
        if (doc.exists) {
            const data = doc.data();
            renderReviewMode(data);
        }
    } catch (e) {
        console.error("Error loading review:", e);
    }
    DOM.loading.style.display = 'none';
}

function renderReviewMode(data) {
    DOM.teacherSection.style.display = 'none';
    DOM.reviewSection.style.display = 'flex';
    DOM.reviewStudentEmail.textContent = `Revisión: ${data.email}`;
    DOM.reviewContent.innerHTML = '';

    data.questions.forEach((q, i) => {
        const studentAns = data.answers[i];
        let isCorrect = false;
        let correctAnswerText = "";
        let studentAnswerText = "";

        if (q.type === 'mc') {
            const correctIdx = q.part === 1 ? q.correct : q.correctIndex;
            isCorrect = studentAns === correctIdx;
            correctAnswerText = q.options[correctIdx];
            studentAnswerText = q.options[studentAns] || "Sin respuesta";
        } else {
            isCorrect = isAnswerCorrect(studentAns, q.answer);
            correctAnswerText = q.answer;
            studentAnswerText = studentAns || "Sin respuesta";
        }

        const item = document.createElement('div');
        item.className = 'review-item';
        
        const imgHtml = q.src ? `<img src="IMAGENES_ABDOMEN/${q.src}" class="review-img-small">` : '';

        item.innerHTML = `
            <div class="review-header">
                <span class="part-indicator" style="margin-bottom:0">Parte ${q.part}</span>
                <span class="${isCorrect ? 'ans-correct' : 'ans-incorrect'}">
                    ${isCorrect ? '✓ Correcto' : '✗ Incorrecto'}
                </span>
            </div>
            <div class="review-body">
                ${imgHtml}
                <div class="review-details">
                    <p style="font-weight: 600; margin-bottom: 0.5rem;">${q.question || 'Identifica la estructura'}</p>
                    <p style="font-size: 0.9rem; color: var(--text-secondary);">Respuesta del alumno: <span class="${isCorrect ? 'ans-correct' : 'ans-incorrect'}">${studentAnswerText}</span></p>
                    <p style="font-size: 0.9rem; color: var(--text-secondary);">Respuesta correcta: <span class="ans-correct">${correctAnswerText}</span></p>
                </div>
            </div>
        `;
        DOM.reviewContent.appendChild(item);
    });
}

DOM.backToDashBtn.onclick = () => {
    DOM.reviewSection.style.display = 'none';
    DOM.teacherSection.style.display = 'flex';
};

function exportToCSV(evaluations) {
    let csv = "Email,Estado,Nota P1,Nota P2,Nota P3,Nota P4,Nota Total,Fecha\n";
    
    evaluations.forEach(e => {
        const score = e.score || { part1: 0, part2: 0, part3: 0, part4: 0, total: 0 };
        const date = e.lastUpdated ? new Date(e.lastUpdated.seconds * 1000).toISOString() : '---';
        csv += `${e.email},${e.status},${score.part1},${score.part2},${score.part3},${score.part4},${score.total.toFixed(2)},${date}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `resultados_abdomen_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Global for table action
window.viewStudentReview = viewStudentReview;
