
const canvas = document.createElement('canvas')
const ctx = canvas.getContext("2d");
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = 200);
const particles = [];
const properties = {
  particleColor: `rgba(255, 240, 240, .64)`,
  particleRadius: 3.1,
  particleCount: 70,
  particleMaxVelocity: 0.1,
  lineLengthMax: 100,
  lineLengthMin: 50,
  mousePos: { x: 0, y: 0 },
};
canvas.onmousemove = (event) => {
  properties.mousePos.x =
    event.clientX - canvas.getBoundingClientRect().left;
  properties.mousePos.y =
    event.clientY - canvas.getBoundingClientRect().top;
};



window.onresize = function () {
  w = canvas.width = window.innerWidth;
//   h = canvas.height = window.innerHeight;
};
class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * (h);
    this.radius = Math.random() * 2 + 2;
    this.velocityX =
      Math.random() * (properties.particleMaxVelocity * 2) -
      properties.particleMaxVelocity;
    this.velocityY =
      Math.random() * (properties.particleMaxVelocity * 2) -
      properties.particleMaxVelocity;
  }
  position() {
    (this.x + this.velocityX > w && this.velocityX > 0) ||
    (this.x + this.velocityX < 0 && this.velocityX < 0)
      ? (this.velocityX *= -1)
      : this.velocityX;
    (this.y + this.velocityY > h  && this.velocityY > 0) ||
    (this.y + this.velocityY < 0 && this.velocityY < 0)
      ? (this.velocityY *= -1)
      : this.velocityY;
    let d = getDistanse(this, properties.mousePos);
    if (d.d < 50) {
      if (d.x > 0) {
        this.velocityX = Math.abs(this.velocityX);
      } else {
        this.velocityX = -Math.abs(this.velocityX);
      }
      if (d.y > 0) {
        this.velocityY = Math.abs(this.velocityX);
      } else {
        this.velocityY = -Math.abs(this.velocityX);
      }
    }
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  reDraw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = properties.particleColor;
    ctx.fill();
  }
}
function reDrawBackground() {
  const image = new Image();
  image.src = '././imgs/bg.jpg';
  ctx.drawImage(image, 0, 0, w, h);
}
function drawLines() {
  let x1, y1, x2, y2, length, opacity;
  for (let i in particles) {
    for (let j in particles) {
      x1 = particles[i].x;
      y1 = particles[i].y;
      x2 = particles[j].x;
      y2 = particles[j].y;
      length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      if (
        length <= properties.lineLengthMax &&
        length >= properties.lineLengthMin
      ) {
        opacity = mapDistanceToValue(
          length,
          properties.lineLengthMin,
          properties.lineLengthMax
        );
        ctx.lineWidth = `.1`;
        ctx.strokeStyle = `rgb(255, 36, 231, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
}
function reDrawParticles() {
  for (let i in particles) {
    particles[i].position();
    particles[i].reDraw();
  }
}
function loop() {
    ctx.clearRect(0,0,w,h)
//   reDrawBackground();
  drawLines();
  reDrawParticles();

  requestAnimationFrame(loop);
}
function init() {
  for (let i = 0; i < properties.particleCount; i++) {
    particles.push(new Particle());
  }
  loop();
}
function getDistanse(pointA, piontB) {
  let x1 = pointA.x,
    y1 = pointA.y,
    x2 = piontB.x,
    y2 = piontB.y;
  const d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return { d, x: x1 - x2, y: y1 - y2 };
}
function mapDistanceToValue(distance, minDistance, maxDistance) {
  if (distance < minDistance || distance > maxDistance) {
    return 0;
  }

  if (distance === minDistance || distance === maxDistance) {
    return 1;
  }

  const range = maxDistance - minDistance;
  const normalizedDistance = (distance - minDistance) / range;

  return 1 - Math.abs(normalizedDistance - 0.5) * 2;
}
init();
const lesson1 = {
    title:'',
    html: `<p>JavaScript - це мова програмування, яка використовується для надання взаємодії сторінок веб-сайту та створення динамічного вмісту.</p>

    <h2>Змінні в JavaScript:</h2>
    <p>Змінні використовуються для зберігання даних.</p>
    <p>Створення змінних з використанням <code>var</code>, <code>let</code> та <code>const</code>.</p>
    <p>Приклади іменування змінних:</p>
    <pre>
        <code>
            var name = "John";
            let age = 30;
            const pi = 3.1415;
        </code>
    </pre>

    <h2>Типи даних:</h2>
    <p>Рядки (strings), числа (numbers), булеві значення (booleans), масиви (arrays), об'єкти (objects) та інші.</p>
    <p>Перевірка типу даних з використанням <code>typeof</code>.</p>

    <h2>Оператори та вирази:</h2>
    <p>Арифметичні операції, такі як додавання, віднімання, множення та ділення.</p>
    <p>Оператори порівняння та логічні оператори.</p>
    <p>Змішування операцій для створення виразів.</p>

    <h2>Функції:</h2>
    <p>Створення функцій для групування коду та виконання певних дій.</p>
    <p>Передача параметрів в функції та повернення значень.</p>
    <pre>
        <code>
            function addNumbers(a, b) {
                return a + b;
            }
        </code>
    </pre>

    <h2>Приклади коду:</h2>
    <p>Прості приклади використання змінних, типів даних, операторів та функцій.</p>
    <pre>
        <code>
            var name = "John";
            var age = 30;
            var isStudent = true;

            function greet(name) {
                console.log("Hello, " + name + "!");
            }
        </code>
    </pre>

    <h2>Домашнє завдання:</h2>
    <p>Написати програму, яка обчислює середнє значення двох чисел та виводить його на екран.</p>
    <pre>
        <code>
            var num1 = 10;
            var num2 = 20;
            var average = (num1 + num2) / 2;
            console.log("Середнє значення: " + average);
        </code>
    </pre>`
}

const container = document.querySelector('.canvas-container')
const grid = document.querySelector('.grid')
const cell = document.createElement('div')
cell.classList.add('cell')
for (let i = 0; i < 300; i++) {
    grid.appendChild(cell.cloneNode())
}



function createElement(tag, className){
    const item = document.createElement(tag)
    if(className){
        item.classList.add(className)
    }
    return item
}
function createLesson(lesson){
    const wrapper = createElement('div', 'lesson-wrapper')
    const title = createElement('h1', 'lesson-title')
    title.innerText = lesson.title
    const main = createElement('div', 'lesson')
    main.innerHTML = lesson.html
    wra
}
container.append(canvas)
