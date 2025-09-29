// Global variables
let chatbotData = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadChatbotData();
    initializeTabs();
    addWelcomeMessage();
});

// Load chatbot data from embedded data
function loadChatbotData() {
    try {
        // Data is already loaded from embedded script in HTML
        if (typeof window.chatbotData !== 'undefined') {
            chatbotData = window.chatbotData;
            loadQuizzes();
            console.log('Chatbot data loaded successfully');
        } else {
            console.error('window.chatbotData not found');
            appendMessage('bot', 'Sorry, I had trouble loading my knowledge base. Please refresh the page.');
        }
    } catch (error) {
        console.error('Error loading chatbot data:', error);
        appendMessage('bot', 'Sorry, I had trouble loading my knowledge base. Please refresh the page.');
    }
}

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add active class to the matching tab button (no reliance on event)
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const attr = btn.getAttribute('onclick') || '';
        if (attr.includes("'" + tabName + "'")) {
            btn.classList.add('active');
        }
    });
}

// Initialize tabs
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const match = (this.getAttribute('onclick') || '').match(/'([^']+)'/);
            const tabName = match ? match[1] : 'chat';
            switchTab(tabName);
        });
    });
}

// Add welcome message
function addWelcomeMessage() {
    setTimeout(() => {
        appendMessage('bot', 'مرحبًا! أنا سمير، مساعدك الذكي للتوعية بالمناخ وإعادة التدوير. يمكنني مساعدتك في فهم المخاطر التي تواجه الإسكندرية وحلول الاستدامة. اضغط على الأزرار أدناه أو اسألني مباشرة!');
    }, 500);
}

// Chat functionality
function appendMessage(sender, text) {
    const messagesDiv = document.getElementById('messages');
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.textContent = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const msg = userInput.value.trim();
    if (!msg) return;
    
    appendMessage('user', msg);
    userInput.value = '';
    
    // Process the message
    const response = processMessage(msg);
    setTimeout(() => {
        appendMessage('bot', response);
    }, 500);
}

function sendTopicMessage(topic) {
    // Clear previous messages
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    
    // Add the new topic message
    appendMessage('user', topic);
    
    // Process the topic message
    const response = processMessage(topic);
    setTimeout(() => {
        appendMessage('bot', response);
    }, 500);
}

function processMessage(message) {
    if (!chatbotData) return 'I\'m still loading my knowledge base. Please wait a moment.';
    
    const lowerMessage = message.toLowerCase();
    const isArabic = /[\u0600-\u06FF]/.test(message);
    
    // Check for keyword-based responses
    if (lowerMessage.includes('الاسكندرية') || lowerMessage.includes('اسكندرية') || lowerMessage.includes('الإسكندرية')) {
        return 'الإسكندرية هي مدينة مصرية ساحلية مهددة بيئياً بسبب مخاطر ارتفاع مستوى البحر والتغيرات المناخية الناجمة عن تلوث البيئة. تواجه المدينة تحديات كبيرة تشمل:\n\n• ارتفاع مستوى سطح البحر الذي قد يؤدي لفقدان أجزاء واسعة من المدينة\n• التغيرات المناخية التي تهدد المواقع الأثرية والثقافية\n• التلوث البلاستيكي الذي يؤثر على البيئة البحرية والصحة العامة\n• المعالم المهددة مثل قلعة قايتباي ومقابر الشاطبي والأنفوشي\n\nهذه المخاطر تتطلب حلولاً شاملة ومستدامة لحماية تراثنا وبيئتنا.';
    }
    
    if (lowerMessage.includes('إعادة التدوير') || lowerMessage.includes('تدوير') || lowerMessage.includes('إعادة تدوير')) {
        return 'أهمية إعادة التدوير:\n\n• حماية البيئة: تقليل النفايات والتلوث\n• توفير الموارد: استخدام المواد مرة أخرى بدلاً من استخراج مواد جديدة\n• دعم الاقتصاد: خلق فرص عمل في صناعة إعادة التدوير\n• حماية الصحة: تقليل المخاطر الصحية من التلوث البلاستيكي\n• الاستدامة: ضمان موارد للأجيال القادمة\n\nمشروع سمير يحفز إعادة التدوير عبر نظام النقاط الذي يربط الأسر بشركات إعادة التدوير المعتمدة.';
    }
    
    if (lowerMessage.includes('المناطق') || lowerMessage.includes('منطقة') || lowerMessage.includes('اهتمام') || lowerMessage.includes('اهتمام')) {
        return 'المناطق التي تحتاج اهتمام خاص:\n\n• المناطق الساحلية: الأكثر عرضة لارتفاع مستوى البحر\n• المواقع الأثرية: قلعة قايتباي، مقابر الشاطبي والأنفوشي\n• المناطق الصناعية: مصادر التلوث البلاستيكي\n• الأحياء السكنية: لتعزيز الوعي والمشاركة المجتمعية\n• الموانئ والمرافئ: نقاط تجمع النفايات البحرية\n\nالخريطة التفاعلية في مشروع سمير تبرز هذه المناطق بالألوان لتسهيل فهم المخاطر.';
    }
    
    if (lowerMessage.includes('البلاستيك') || lowerMessage.includes('بلاستيك') || lowerMessage.includes('أضرار') || lowerMessage.includes('ضرر')) {
        return 'أضرار البلاستيك على البيئة والصحة:\n\nالبيئة:\n• لا يتحلل بسهولة، يتحول لميكروبلاستيك\n• يدخل في التربة والأنهار والبحار\n• يضر بالنظام البيئي والكائنات البحرية\n\nالصحة:\n• يزيد معدلات السرطان خاصة في الجهاز الهضمي والكبد\n• يسبب مشاكل رئوية مثل الالتهابات المزمنة والربو\n• يؤثر على الجهاز العصبي للأطفال\n• يعزز تراكم البكتيريا في الزجاجات المعاد استخدامها\n\nلذلك نحتاج لحلول آمنة لإعادة التدوير.';
    }
    
    if (lowerMessage.includes('سمير') || lowerMessage.includes('مشروع سمير')) {
        return 'سمير هو مشروع ذكي للتوعية بالمناخ وإعادة التدوير:\n\nالأدوات:\n• الخريطة التفاعلية: تظهر المناطق المعرضة للفيضانات\n• المساعد الذكي: يجيب على الأسئلة ويقدم نصائح عملية\n• آلة النقاط: تحول الزجاجات الفارغة لنقاط قابلة للاستبدال\n\nالأهداف:\n• ربط المعرفة الأكاديمية بالعمل الشعبي\n• تحفيز المشاركة المجتمعية\n• دعم السياحة البيئية\n• حماية التراث من المخاطر المناخية\n\nسمير يهدف لجعل مصر نموذجاً رائداً في المنطقة للاستدامة.';
    }
    
    if (lowerMessage.includes('النقاط') || lowerMessage.includes('نقاط') || lowerMessage.includes('استبدال') || lowerMessage.includes('احتساب')) {
        return 'نظام النقاط في مشروع سمير:\n\nكيفية العمل:\n• ضع الزجاجة الفارغة في آلة النقاط\n• امسح QR Code المطبوع على الزجاجة\n• احصل على نقاط حسب نوع وحجم الزجاجة\n• استبدل النقاط في السوبرماركت والمولات\n\nالفوائد:\n• تحفيز إعادة التدوير\n• ربط مباشر بشركات إعادة التدوير المعتمدة\n• ضمان إعادة تدوير آمنة وصحية\n• دعم الاقتصاد المحلي\n\nالنقاط قابلة للاستبدال بمنتجات أو خصومات في المتاجر المشاركة.';
    }
    
    if (lowerMessage.includes('التنمية المستدامة') || lowerMessage.includes('مستدامة') || lowerMessage.includes('استدامة')) {
        return 'التنمية المستدامة:\n\nالتعريف:\nالتنمية التي تلبي احتياجات الحاضر دون المساس بقدرة الأجيال القادمة على تلبية احتياجاتها.\n\nالأبعاد:\n• البيئي: حماية الموارد الطبيعية والتنوع البيولوجي\n• الاقتصادي: نمو اقتصادي عادل ومستدام\n• الاجتماعي: عدالة اجتماعية ورفاهية الإنسان\n\nفي مشروع سمير:\n• حماية البيئة من التلوث البلاستيكي\n• دعم الاقتصاد عبر صناعة إعادة التدوير\n• تعزيز الوعي المجتمعي والمشاركة\n• الحفاظ على التراث الثقافي\n\nالهدف: جعل مصر نموذجاً رائداً في المنطقة.';
    }
    
    if (lowerMessage.includes('من نحن') || lowerMessage.includes('فريق') || lowerMessage.includes('نحن')) {
        return 'من نحن:\n\nنحن فريق مخصص لحماية الإسكندرية وتراثها من المخاطر المناخية والبيئية.\n\nرؤيتنا:\nجعل مصر نموذجاً رائداً في المنطقة للاستدامة وحماية التراث.\n\nمهمتنا:\n• ربط المعرفة الأكاديمية بالعمل الشعبي\n• تطوير حلول عملية للتحديات البيئية\n• تعزيز الوعي المجتمعي\n• دعم الاقتصاد الأخضر\n\nمشروع سمير:\nهو أداة ذكية تجمع بين التكنولوجيا والبيئة والتراث لخدمة المجتمع وضمان مستقبل مستدام.\n\nنؤمن أن الحلول البسيطة والذكية يمكن أن تحدث فرقاً كبيراً.';
    }
    
    // Check for greetings
    if (
        lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') ||
        (isArabic && (lowerMessage.includes('مرحبا') || lowerMessage.includes('مرحبًا') || lowerMessage.includes('اهلا') || lowerMessage.includes('أهلا') || lowerMessage.includes('السلام عليكم')))
    ) {
        return getRandomResponse(chatbotData.responses.greetings);
    }
    
    // Check for help requests
    if (
        lowerMessage.includes('help') || lowerMessage.includes('what can you do') ||
        (isArabic && (lowerMessage.includes('مساعدة') || lowerMessage.includes('تساعدني') || lowerMessage.includes('ماذا تفعل') || lowerMessage.includes('كيف تعمل')))
    ) {
        return getRandomResponse(chatbotData.responses.help);
    }
    
    // Check for quiz requests
    if (
        lowerMessage.includes('quiz') || lowerMessage.includes('test') ||
        (isArabic && (lowerMessage.includes('اختبار') || lowerMessage.includes('امتحان') || lowerMessage.includes('كويز')))
    ) {
        return 'يمكنني مساعدتك في الاختبارات! اذهب إلى تبويب Quiz لرؤية الاختبارات المتاحة. يمكنك خوض اختبارات حول الرياضيات أو العلوم أو الإسكندرية والمناخ.';
    }
    
    // Search for relevant text content
    for (const text of chatbotData.texts) {
        for (const keyword of text.keywords) {
            if (lowerMessage.includes(keyword)) {
                return `إليك ما أعرفه عن ${text.title}:\n\n${text.content}`;
            }
        }
    }
    
    // Default response
    return getRandomResponse(chatbotData.responses.unknown);
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Quiz functionality
function loadQuizzes() {
    if (!chatbotData) return;
    
    const quizList = document.getElementById('quiz-list');
    quizList.innerHTML = '';
    
    chatbotData.quizzes.forEach(quiz => {
        const quizItem = document.createElement('div');
        quizItem.className = 'quiz-item';
        quizItem.innerHTML = `
            <h4>${quiz.title}</h4>
            <p>${quiz.questions.length} questions</p>
        `;
        quizItem.onclick = () => startQuiz(quiz);
        quizList.appendChild(quizItem);
    });
}

function startQuiz(quiz) {
    currentQuiz = quiz;
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    
    document.getElementById('quiz-selection').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    
    document.getElementById('quiz-title').textContent = quiz.title;
    document.getElementById('total-questions').textContent = quiz.questions.length;
    
    showQuestion();
}

function showQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('quiz-question').textContent = question.question;
    
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option';
        optionButton.textContent = option;
        optionButton.onclick = () => selectOption(index);
        optionsDiv.appendChild(optionButton);
    });
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').style.display = currentQuestionIndex < currentQuiz.questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('submit-btn').style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'inline-block' : 'none';
}

function selectOption(optionIndex) {
    // Remove previous selection and feedback
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Add selection to clicked option
    const selectedOption = document.querySelectorAll('.option')[optionIndex];
    selectedOption.classList.add('selected');
    
    // Show feedback immediately
    const question = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = optionIndex === question.correct;
    
    if (isCorrect) {
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
        // Also highlight the correct answer
        document.querySelectorAll('.option')[question.correct].classList.add('correct');
    }
    
    // Store the answer
    userAnswers[currentQuestionIndex] = optionIndex;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function submitQuiz() {
    // Calculate score
    let correctAnswers = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctAnswers++;
        }
    });
    
    quizScore = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
    
    // Show results
    showQuizResults();
}

function showQuizResults() {
    const resultsDiv = document.getElementById('quiz-results');
    const performance = quizScore >= 70 ? 'ممتاز!' : quizScore >= 50 ? 'جيد!' : 'يحتاج تحسين!';
    const emoji = quizScore >= 70 ? '🎉' : quizScore >= 50 ? '👏' : '💪';
    
    resultsDiv.innerHTML = `
        <div class="score">${emoji} Good Job! ${emoji}</div>
        <div class="score">نقاطك: ${quizScore}%</div>
        <p>${performance}</p>
        <button onclick="restartQuiz()" class="quiz-controls" style="margin-top: 20px;">Take Another Quiz / اختبار آخر</button>
    `;
    resultsDiv.style.display = 'block';
    
    // Show quiz results instead of hiding quiz content
    document.getElementById('quiz-content').style.display = 'block';
}

function restartQuiz() {
    document.getElementById('quiz-selection').style.display = 'block';
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';
}

