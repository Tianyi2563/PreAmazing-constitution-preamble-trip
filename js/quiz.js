/* 知识闯关页交互逻辑 */
document.addEventListener('DOMContentLoaded', function() {
    let questions = [];
    let currentQuestionIndex = 0;
    let selectedAnswer = null;
    let score = 0;
    let timer = null;
    let timeLeft = 300;
    let quizQuestions = [];

    initQuizPage();

    async function initQuizPage() {
        try {
            await loadQuestions();
            bindEvents();
        } catch (error) {
            console.error('闯关页初始化失败:', error);
        }
    }

    async function loadQuestions() {
        try {
            const response = await fetch('data/questions.json');
            if (!response.ok) throw new Error('题目加载失败');
            const data = await response.json();
            questions = data.questions;
        } catch (err) {
            console.error(err);
            questions = getFallbackQuestions();
        }
    }

    function getFallbackQuestions() {
        return [
            { id: 1, type: 'choice', difficulty: 'easy', question: '中国是世界上历史最悠久的国家之一，中国各族人民共同创造了光辉灿烂的文化，具有光荣的____传统。', options: ['历史', '文化', '革命', '民族'], answer: 2, source: '宪法序言第一段' },
            { id: 2, type: 'choice', difficulty: 'easy', question: '____年以后，封建的中国逐渐变成半殖民地、半封建的国家。', options: ['一八三○', '一八四○', '一八五○', '一九○○'], answer: 1, source: '宪法序言第二段' },
            { id: 3, type: 'choice', difficulty: 'medium', question: '____年孙中山先生领导的辛亥革命，废除了封建帝制，创立了中华民国。', options: ['一九○五', '一九一一', '一九一二', '一九二一'], answer: 1, source: '宪法序言第四段' },
            { id: 4, type: 'choice', difficulty: 'medium', question: '____年，以毛泽东主席为领袖的中国共产党领导中国各族人民，取得了新民主主义革命的伟大胜利。', options: ['一九四五', '一九四八', '一九四九', '一九五○'], answer: 2, source: '宪法序言第五段' },
            { id: 5, type: 'choice', difficulty: 'medium', question: '中华人民共和国成立以后，我国社会逐步实现了由____到社会主义的过渡。', options: ['封建主义', '资本主义', '新民主主义', '社会主义初级阶段'], answer: 2, source: '宪法序言第六段' },
            { id: 6, type: 'choice', difficulty: 'medium', question: '工人阶级领导的、以工农联盟为基础的____，实质上即无产阶级专政。', options: ['人民代表大会制度', '人民民主专政', '民主集中制', '社会主义制度'], answer: 1, source: '宪法序言第六段' },
            { id: 7, type: 'choice', difficulty: 'medium', question: '我国将长期处于____阶段。', options: ['社会主义', '社会主义初级', '共产主义', '新民主主义'], answer: 1, source: '宪法序言第七段' },
            { id: 8, type: 'choice', difficulty: 'medium', question: '中国各族人民将继续在中国共产党领导下，在马克思列宁主义、毛泽东思想、____指引下。', options: ['邓小平理论', '邓小平理论、"三个代表"重要思想', '邓小平理论、"三个代表"重要思想、科学发展观', '邓小平理论、"三个代表"重要思想、科学发展观、习近平新时代中国特色社会主义思想'], answer: 3, source: '宪法序言第七段' },
            { id: 9, type: 'choice', difficulty: 'easy', question: '台湾是中华人民共和国的____的一部分。', options: ['重要领土', '神圣领土', '固有领土', '不可分割'], answer: 1, source: '宪法序言第九段' },
            { id: 10, type: 'choice', difficulty: 'medium', question: '社会主义的建设事业必须依靠____。', options: ['工人和农民', '工人、农民和知识分子', '工人阶级', '全体人民'], answer: 1, source: '宪法序言第十段' },
            { id: 11, type: 'choice', difficulty: 'medium', question: '中国人民政治协商会议是有广泛代表性的____组织。', options: ['政治协商', '民主协商', '统一战线', '人民团体'], answer: 2, source: '宪法序言第十段' },
            { id: 12, type: 'choice', difficulty: 'easy', question: '____的社会主义民族关系已经确立，并将继续加强。', options: ['平等、团结、互助', '平等、互助、和谐', '平等团结互助和谐', '团结、友爱、互助'], answer: 2, source: '宪法序言第十一段' },
            { id: 13, type: 'choice', difficulty: 'medium', question: '在维护民族团结的斗争中，要反对大民族主义，主要是____。', options: ['大汉族主义', '大藏族主义', '大维吾尔族主义', '大蒙古族主义'], answer: 0, source: '宪法序言第十一段' },
            { id: 14, type: 'choice', difficulty: 'medium', question: '中国坚持独立自主的对外政策，坚持____的五项原则。', options: ['和平共处', '互相尊重主权和领土完整、互不侵犯、互不干涉内政、平等互利、和平共处', '独立自主、平等互利', '不结盟、不对抗、不针对第三方'], answer: 1, source: '宪法序言第十二段' },
            { id: 15, type: 'choice', difficulty: 'medium', question: '中国坚持和平发展道路，坚持____开放战略。', options: ['互利共赢', '合作共赢', '共同发展', '对外开放'], answer: 0, source: '宪法序言第十二段' },
            { id: 16, type: 'choice', difficulty: 'hard', question: '中国推动构建____。', options: ['人类命运共同体', '和谐世界', '新型国际关系', '人类共同价值'], answer: 0, source: '宪法序言第十二段' },
            { id: 17, type: 'choice', difficulty: 'easy', question: '本宪法是国家的____，具有最高的法律效力。', options: ['基本法', '根本法', '最高法', '母法'], answer: 1, source: '宪法序言第十三段' },
            { id: 18, type: 'choice', difficulty: 'hard', question: '要把我国建设成为____的社会主义现代化强国。', options: ['富强民主文明和谐', '富强民主文明和谐美丽', '富强、民主、文明、和谐', '文明和谐美丽'], answer: 1, source: '宪法序言第七段' },
            { id: 19, type: 'choice', difficulty: 'hard', question: '在____前增写了"贯彻新发展理念"。', options: ['自力更生，艰苦奋斗', '坚持改革开放', '健全社会主义法治', '推动物质文明'], answer: 0, source: '宪法序言第七段' },
            { id: 20, type: 'choice', difficulty: 'hard', question: '爱国统一战线包括"致力于____的爱国者"。', options: ['维护民族团结', '维护国家统一', '中华民族伟大复兴', '坚持改革开放'], answer: 2, source: '宪法序言第十段' },
            { id: 21, type: 'fill', difficulty: 'easy', question: '中国是世界上____的国家之一。', answer: '历史最悠久', source: '宪法序言第一段' },
            { id: 22, type: 'fill', difficulty: 'easy', question: '一八四○年以后，封建的中国逐渐变成____、半封建的国家。', answer: '半殖民地', source: '宪法序言第二段' },
            { id: 23, type: 'fill', difficulty: 'medium', question: '一九一一年孙中山先生领导的____，废除了封建帝制。', answer: '辛亥革命', source: '宪法序言第四段' },
            { id: 24, type: 'fill', difficulty: 'medium', question: '一九四九年，以____为领袖的中国共产党领导中国各族人民。', answer: '毛泽东主席', source: '宪法序言第五段' },
            { id: 25, type: 'fill', difficulty: 'medium', question: '我国社会逐步实现了由新民主主义到____的过渡。', answer: '社会主义', source: '宪法序言第六段' },
            { id: 26, type: 'fill', difficulty: 'medium', question: '台湾是中华人民共和国的____的一部分。', answer: '神圣领土', source: '宪法序言第九段' },
            { id: 27, type: 'fill', difficulty: 'medium', question: '在维护民族团结的斗争中，要反对大民族主义，主要是____。', answer: '大汉族主义', source: '宪法序言第十一段' },
            { id: 28, type: 'fill', difficulty: 'medium', question: '本宪法是国家的____，具有最高的法律效力。', answer: '根本法', source: '宪法序言第十三段' },
            { id: 29, type: 'fill', difficulty: 'hard', question: '中国坚持____道路，坚持互利共赢开放战略。', answer: '和平发展', source: '宪法序言第十二段' },
            { id: 30, type: 'fill', difficulty: 'hard', question: '中国推动构建____。', answer: '人类命运共同体', source: '宪法序言第十二段' }
        ];
    }

    function bindEvents() {
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', startQuiz);
        }

        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', submitAnswer);
        }

        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', goToNext);
        }

        const retryBtn = document.getElementById('retryBtn');
        if (retryBtn) {
            retryBtn.addEventListener('click', startQuiz);
        }
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        selectedAnswer = null;
        score = 0;
        timeLeft = 300;
        
        shuffleQuestions();
        
        showSection('quizPlay');
        
        document.getElementById('currentScore').textContent = '0';
        
        renderQuestion();
        startTimer();
    }

    function shuffleQuestions() {
        quizQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
    }

    function showSection(sectionId) {
        const sections = ['quizStart', 'quizPlay', 'quizResult'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.add('hidden');
            }
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            const timerEl = document.getElementById('timerValue');
            if (timerEl) {
                timerEl.textContent = timeLeft;
            }

            const timerContainer = document.querySelector('.quiz-timer');
            if (timeLeft <= 60) {
                timerContainer?.classList.add('warning');
            }

            if (timeLeft <= 0) {
                clearInterval(timer);
                showResult();
            }
        }, 1000);
    }

    function renderQuestion() {
        const question = quizQuestions[currentQuestionIndex];
        if (!question) return;

        updateProgress();
        
        const difficultyTag = document.getElementById('difficultyTag');
        difficultyTag.textContent = getDifficultyLabel(question.difficulty);
        difficultyTag.className = 'question-difficulty ' + question.difficulty;
        
        document.getElementById('questionText').textContent = question.question;
        
        if (question.type === 'choice') {
            renderOptions(question);
            document.getElementById('optionsContainer').classList.remove('hidden');
            document.getElementById('fillContainer').classList.add('hidden');
        } else {
            renderFillInput(question);
            document.getElementById('optionsContainer').classList.add('hidden');
            document.getElementById('fillContainer').classList.remove('hidden');
        }

        document.getElementById('submitBtn').classList.remove('hidden');
        document.getElementById('nextBtn').classList.add('hidden');
        document.getElementById('answerFeedback').classList.add('hidden');
        
        selectedAnswer = null;
    }

    function getDifficultyLabel(difficulty) {
        const labels = { easy: '简单', medium: '中等', hard: '困难' };
        return labels[difficulty] || difficulty;
    }

    function renderOptions(question) {
        const container = document.getElementById('optionsContainer');
        container.innerHTML = question.options.map((option, index) => `
            <button class="option-btn" data-index="${index}">${option}</button>
        `).join('');

        container.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                clearSelectedStyle(container);
                btn.classList.add('selected');
                selectedAnswer = parseInt(btn.dataset.index);
            });
        });
    }

        function clearSelectedStyle(container) {
        container.querySelectorAll('.option-btn').forEach(b => {
            b.classList.remove('selected', 'correct', 'wrong');
        });
    }

    function renderFillInput(question) {
        const input = document.getElementById('fillInput');
        input.value = '';
        input.classList.remove('correct', 'wrong');
    }

    function updateProgress() {
        const currentQ = document.getElementById('currentQ');
        const totalQ = document.getElementById('totalQ');
        const progressFill = document.getElementById('progressFill');
        
        currentQ.textContent = currentQuestionIndex + 1;
        totalQ.textContent = quizQuestions.length;
        
        const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    function submitAnswer() {
        const question = quizQuestions[currentQuestionIndex];
        let isCorrect = false;

        if (question.type === 'choice') {
            if (selectedAnswer !== null) {
                isCorrect = selectedAnswer === question.answer;
            }
        } else {
            const input = document.getElementById('fillInput');
            const userAnswer = input.value.trim();
            isCorrect = userAnswer === question.answer;
        }

        if (isCorrect) {
            score += 10;
            document.getElementById('currentScore').textContent = score;
        }

        showAnswerFeedback(question, isCorrect);

        const container = document.getElementById('optionsContainer');
        if (question.type === 'choice') {
            const options = container.querySelectorAll('.option-btn');
            options.forEach((btn, index) => {
                if (index === question.answer) {
                    btn.classList.add('correct');
                } else if (index === selectedAnswer && !isCorrect) {
                    btn.classList.add('wrong');
                }
            });
        } else {
            const input = document.getElementById('fillInput');
            input.classList.add(isCorrect ? 'correct' : 'wrong');
        }

        document.getElementById('submitBtn').classList.add('hidden');
        document.getElementById('nextBtn').classList.remove('hidden');
    }

    function showAnswerFeedback(question, isCorrect) {
        const feedback = document.getElementById('answerFeedback');
        feedback.innerHTML = `
            <div class="feedback-title">${isCorrect ? '✅ 回答正确！' : '❌ 回答错误！'}</div>
            <div class="feedback-answer">正确答案：${question.type === 'choice' ? question.options[question.answer] : question.answer}</div>
            <div class="feedback-answer">来源：${question.source}</div>
        `;
        feedback.className = 'answer-feedback ' + (isCorrect ? 'correct' : 'wrong');
        feedback.classList.remove('hidden');
    }

    function goToNext() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            renderQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        clearInterval(timer);
        showSection('quizResult');
        
        const finalScore = document.getElementById('finalScore');
        finalScore.textContent = score;
        
        const correctCount = Math.floor(score / 10);
        document.getElementById('correctCount').textContent = correctCount;
        
        const accuracy = Math.round((correctCount / quizQuestions.length) * 100);
        document.getElementById('accuracy').textContent = `${accuracy}%`;

        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        
        if (accuracy >= 80) {
            resultIcon.className = 'result-icon success';
            resultTitle.textContent = '优秀！';
        } else if (accuracy >= 60) {
            resultIcon.className = 'result-icon neutral';
            resultTitle.textContent = '良好！';
        } else {
            resultIcon.className = 'result-icon failure';
            resultTitle.textContent = '继续加油！';
        }
    }
});