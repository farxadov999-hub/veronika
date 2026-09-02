document.addEventListener("DOMContentLoaded", () => {
const highScore = localStorage.getItem("ВашеНазвание_highScore");
updateHighScoreDisplay();
});

function toggleMenu() {
const menu = document.getElementById("nav-menu");
menu.classList.toggle("active");
}

function closeMenu() {
const menu = document.getElementById("nav-menu");
menu.classList.remove("active");
}

const lessonDetails = {
computer: {
title: "🖥️ Компьютеры",
text: "Компьютер состоит из ключевых модулей: Процессор (ЦПУ) отвечает за логические операции, Оперативная память (ОЗУ) хранит временные данные, Накопитель (SSD/HDD) сохраняет файлы долгосрочно, а Материнская плата соединяет всё воедино."
},
programming: {
title: "💻 Программирование",
text: "Программирование — это написание понятных для компьютера команд. При помощи языков (Python, JavaScript, C++) разработчики создают веб-сайты, мобильные приложения, игры и даже автопилоты для машин."
},
internet: {
title: "🌐 Интернет и сети",
text: "Глобальная сеть объединяет миллионы устройств. Данные передаются в виде мелких пакетов по кабелям и Wi-Fi при помощи спецпротоколов (HTTP, TCP/IP), обеспечивая моментальную связь по всему миру."
},
security: {
title: "🔐 Кибербезопасность",
text: "Чтобы защитить личные данные: создавай уникальные пароли с символами (например, N7!kP2#xL9), включай двухфакторную аутентификацию (2FA) и не открывай подозрительные ссылки."
},
os: {
title: "🐧 Операционные системы",
text: "ОС — это главная программа-посредник между железом и пользователем. Она распределяет память и ресурсы. Самые популярные: Windows, Linux, macOS, Android и iOS."
},
ai: {
title: "🧠 Искусственный интеллект",
text: "ИИ анализирует гигантские объемы информации, учится на примерах и помогает распознавать голос, генерировать код и решать сложные научные математические задачи."
}
};

function openModal(type) {
const modal = document.getElementById("modal");
const body = document.getElementById("modal-body");
const item = lessonDetails[type];

if (item) {
body.innerHTML = &lt;h2&gt;${item.title}</h2>
<p style="margin-top: 15px; color: #cbd5e1; font-size: 16px;">${item.text}&lt;/p&gt;;
modal.style.display = "block";
}
}

function closeModal() {
document.getElementById("modal").style.display = "none";
}

function closeModalOutside(event) {
if (event.target.id === "modal") {
closeModal();
}
}

const questions = [
{
question: "Что является «мозгом» компьютера?",
answers: ["Монитор", "Процессор", "Клавиатура", "Мышь"],
correct: 1
},
{
question: "Что означает аббревиатура HTML?",
answers: ["Язык разметки", "Антивирус", "Операционная система", "Игра"],
correct: 0
},
{
question: "Что такое интернет?",
answers: ["Одна программа", "Компьютер", "Глобальная сеть", "Файл"],
correct: 2
},
{
question: "Какой пароль считается более безопасным?",
answers: ["123456", "qwerty", "password", "N7!kP2#xL9"],
correct: 3
},
{
question: "Какая операционная система является открытой?",
answers: ["Linux", "Windows", "MS-DOS", "iOS"],
correct: 0
}
];

let currentQuestion = 0;
let score = 0;
let canAnswer = true;

function updateHighScoreDisplay() {
const highScore = localStorage.getItem("infoStudy_highScore");
const display = document.getElementById("high-score");
if (highScore !== null) {
display.innerHTML = ⭐ Твой лучший рекорд: &lt;strong&gt;${highScore} из ${questions.length}&lt;/strong>;
}
}

function startTest() {
currentQuestion = 0;
score = 0;
canAnswer = true;
showQuestion();
}

function showQuestion() {
const quiz = document.getElementById("quiz");
const q = questions[currentQuestion];

quiz.innerHTML = &lt;h3&gt;Вопрос ${currentQuestion + 1} из ${questions.length}&lt;/h3&gt; &lt;p style="margin-top: 10px; font-size: 18px;"&gt;${q.question}</p>
<div class="answers">
${q.answers.map((ans, idx) =&gt;
<button id="btn- {idx})">${ans}&lt;/button&gt;).join("")}
</div>
`;
}

function answerQuestion(index) {
if (!canAnswer) return;
canAnswer = false;

const correctIdx = questions[currentQuestion].correct;
const selectedBtn = document.getElementById(btn-${index}); const correctBtn = document.getElementById(btn-${correctIdx});

if (index === correctIdx) {
score++;
selectedBtn.style.background = "#22c55e";
selectedBtn.style.borderColor = "#22c55e";
} else {
selectedBtn.style.background = "#ef4444";
selectedBtn.style.borderColor = "#ef4444";
correctBtn.style.background = "#22c55e";
correctBtn.style.borderColor = "#22c55e";
}

setTimeout(() => {
currentQuestion++;
canAnswer = true;

if (currentQuestion < questions.length) {
showQuestion();
} else {
showResult();const oldRecord = localStorage.getItem("ВашеНазвание_highScore") || 0;
localStorage.setItem("ВашеНазвание_highScore", score);

}
}, 1000);
}

function showResult() {
const quiz = document.getElementById("quiz");

const oldRecord = localStorage.getItem("infoStudy_highScore") || 0;
if (score > oldRecord) {
localStorage.setItem("infoStudy_highScore", score);
updateHighScoreDisplay();
}

let msg = score === questions.length ? "🏆 Отличный результат!" : score >= 3 ? "👏 Хороший результат!" : "📚 Попробуй пройти ещё раз!";

quiz.innerHTML = &lt;h3&gt;Тест завершён!&lt;/h3&gt; &lt;p style="margin: 15px 0;"&gt;Ты набрал &lt;strong&gt;${score} из  {msg}</p>
<button onclick="startTest()" class="action-btn">Пройти ещё раз</button>
`;
}

function submitForm(event) {
event.preventDefault();
const name = document.getElementById("user-name").value;
const status = document.getElementById("form-status");

status.innerHTML = Спасибо, ${name}! Твоё сообщение отправлено.;
document.getElementById("contact-form").reset();

setTimeout(() => {
status.innerHTML = "";
}, 4000);
}

window.onscroll = function() {
const btn = document.getElementById("scrollTopBtn");
if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
btn.style.display = "block";
} else {
btn.style.display = "none";
}
};

function scrollToTop() {
window.scrollTo({ top: 0, behavior: 'smooth' });
}
