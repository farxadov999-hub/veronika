// Данные для модальных окон уроков
const lessonDetails = {
    computer: {
        title: "🖥️ Компьютеры",
        text: "Компьютер состоит из процессора (CPU), оперативной памяти (RAM), накопителя (SSD/HDD) и материнской платы. Процессор выполняет вычисления, а память хранит временные данные."
    },
    programming: {
        title: "💻 Программирование",
        text: "Программирование — это процесс создания инструкций для компьютера. Популярные языки: Python, JavaScript, C++, Java. Главное в коде — логика и алгоритмы."
    },
    internet: {
        title: "🌐 Интернет и сети",
        text: "Сеть — это объединение устройств. Данные передаются по протоколам TCP/IP пакетным способом. У каждого устройства в сети есть уникальный IP-адрес."
    },
    security: {
        title: "🔐 Кибербезопасность",
        text: "Основа безопасности — надежные пароли, двухфакторная аутентификация (2FA) и осторожность с подозрительными ссылками (защита от фишинга)."
    },
    os: {
        title: "🐧 Операционные системы",
        text: "ОС (Windows, Linux, macOS) управляет аппаратными ресурсами ПК и предоставляет интерфейс для взаимодействия с пользователем."
    },
    ai: {
        title: "🧠 Искусственный интеллект",
        text: "ИИ и машинное обучение позволяют компьютерам анализировать огромные объемы данных, распознавать речи и генерировать текст или изображения."
    }
};

// Данные для теста
const questions = [
    {
        q: "Что является 'мозгом' компьютера?",
        options: ["Жесткий диск", "Процессор (CPU)", "Монитор", "Блок питания"],
        correct: 1
    },
    {
        q: "Какая система отвечает за управление файлами и программами?",
        options: ["Операционная система", "Браузер", "Антивирус", "Текстовый редактор"],
        correct: 0
    },
    {
        q: "Что такое IP-адрес?",
        options: ["Имя компьютера", "Уникальный сетевой адрес устройства", "Пароль от Wi-Fi", "Модель видеокарты"],
        correct: 1
    }
];

let currentQ = 0;
let score = 0;

// Управление меню (гамбургер)
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    if (menu) menu.classList.toggle('active');
}

function closeMenu() {
    const menu = document.getElementById('nav-menu');
    if (menu) menu.classList.remove('active');
}

// Модальные окна уроков
function openModal(key) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    if (lessonDetails[key] && modal && modalBody) {
        modalBody.innerHTML = `
            <h3>${lessonDetails[key].title}</h3>
            <p style="margin-top:15px; color:#cbd5e1; line-height:1.6;">${lessonDetails[key].text}</p>
        `;
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
}

function closeModalOutside(e) {
    if (e.target.id === 'modal') {
        closeModal();
    }
}

// Логика Теста
function startTest() {
    currentQ = 0;
    score = 0;
    renderQuestion();
}

function renderQuestion() {
    const quizBox = document.getElementById('quiz');
    if (!quizBox) return;

    if (currentQ >= questions.length) {
        quizBox.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <h3>🎉 Тест завершён!</h3>
                <p style="margin:15px 0;">Ваш результат: <strong>${score} из ${questions.length}</strong></p>
                <button onclick="startTest()" class="action-btn">Пройти снова</button>
            </div>
        `;
        return;
    }

    const qData = questions[currentQ];
    let optionsHTML = '';
    qData.options.forEach((opt, idx) => {
        optionsHTML += `
            <button onclick="checkAnswer(${idx})" class="action-btn" style="display:block; width:100%; margin:8px 0; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); text-align:left;">
                ${opt}
            </button>
        `;
    });

    quizBox.innerHTML = `
        <div style="margin-top:20px;">
            <h4>Вопрос ${currentQ + 1} из ${questions.length}</h4>
            <p style="font-size:18px; margin:15px 0;">${qData.q}</p>
            ${optionsHTML}
        </div>
    `;
}

function checkAnswer(selectedIdx) {
    if (selectedIdx === questions[currentQ].correct) {
        score++;
    }
    currentQ++;
    renderQuestion();
}

// Форма контактов
function submitForm(e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    if (status) {
        status.innerHTML = `<p style="color:#4ade80; margin-top:15px;">✅ Сообщение успешно отправлено!</p>`;
        document.getElementById('contact-form').reset();
    }
}

// Кнопка наверх
window.onscroll = function() {
    const btn = document.getElementById('scrollTopBtn');
    if (btn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
