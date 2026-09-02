document.addEventListener('DOMContentLoaded', () => {
    // Данные для тестов
    const quizData = [
        {
            question: "Что из перечисленного является устройством ввода?",
            options: ["Монитор", "Клавиатура", "Принтер", "Динамик"],
            correct: 1
        },
        {
            question: "Какая система отвечает за управление ресурсами компьютера?",
            options: ["Операционная система", "Текстовый редактор", "Браузер", "Антивирус"],
            correct: 0
        },
        {
            question: "Что означает аббревиатура HTML?",
            options: [
                "HyperText Markup Language",
                "HighTech Modern Language",
                "HyperTransfer Text Mode",
                "Home Tool Markup Logic"
            ],
            correct: 0
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const nextBtn = document.getElementById('quiz-next-btn');
    const resultEl = document.getElementById('quiz-result');

    function loadQuestion() {
        if (!questionEl || !optionsEl) return;
        
        const data = quizData[currentQuestion];
        questionEl.textContent = `${currentQuestion + 1}. ${data.question}`;
        optionsEl.innerHTML = '';

        data.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.textContent = opt;
            btn.style.cssText = `
                display: block;
                width: 100%;
                margin: 8px 0;
                padding: 12px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background: #f9f9f9;
                cursor: pointer;
                text-align: left;
                font-size: 15px;
            `;
            btn.onclick = () => selectOption(idx, btn);
            optionsEl.appendChild(btn);
        });

        if (nextBtn) nextBtn.style.display = 'none';
    }

    function selectOption(index, button) {
        const data = quizData[currentQuestion];
        const buttons = optionsEl.querySelectorAll('button');
        
        buttons.forEach(b => b.disabled = true);

        if (index === data.correct) {
            button.style.background = '#d4edda';
            button.style.borderColor = '#c3e6cb';
            button.style.color = '#155724';
            score++;
        } else {
            button.style.background = '#f8d7da';
            button.style.borderColor = '#f5c6cb';
            button.style.color = '#721c24';
            buttons[data.correct].style.background = '#d4edda';
        }

        if (nextBtn) nextBtn.style.display = 'block';
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                showResult();
            }
        };
    }

    function showResult() {
        questionEl.style.display = 'none';
        optionsEl.style.display = 'none';
        nextBtn.style.display = 'none';
        
        if (resultEl) {
            resultEl.style.display = 'block';
            resultEl.innerHTML = `
                <h3>Тест завершён!</h3>
                <p>Ваш результат: <strong>${score} из ${quizData.length}</strong></p>
                <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 10px; cursor: pointer;">Пройти снова</button>
            `;
        }
    }

    // Инициализация
    loadQuestion();
});
