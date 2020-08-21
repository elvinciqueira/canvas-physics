const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
// c.globalCompositeOperation = 'destination-over'

const edge = 140
let drawing = false

const mouse = {
  x: null,
  y: null
}

const colors = [
  '#f6d1fb',
  '#601b91',
  '#3b0954',
  '#411470',
  '#3c4a94',
  "#0952BD",
  "#A5BFF0",
  "#118CD6",
  "#1AAEE8",
  "#F2E8C9"
]

window.addEventListener('mousemove', event => {
  mouse.x = event.x
  mouse.y = event.y

})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

window.addEventListener('mousemove', () => {
  // c.fillStyle = 'rgba(255, 255, 255, 0.03)'
  // c.fillRect(0, 0, canvas.width, canvas.height)
  init()
})

window.addEventListener('mousedown', () => {
  drawing = true
})

window.addEventListener('mouseup', () => {
  drawing = false
})

class Particle {
  constructor(x, y, color, centerX, centerY) {
    this.x = x
    this.y = y
    this.color = color
    this.speedX = 0
    this.speedY = 0
    this.centerX = centerX
    this.centerY = centerY
  }

  update() {
    this.speedX += (Math.random() - 0.5) / 2
    this.speedY += (Math.random() - 0.5) / 2
    this.x += this.speedX
    this.y += this.speedY

    const distanceX = this.x - this.centerX
    const distanceY = this.y - this.centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    const radius = (-distance / edge + 1) * edge / 10

    if (radius > 0) {
      requestAnimationFrame(this.update.bind(this))

      c.beginPath()
      c.arc(this.x, this.y, radius, 0, 2 * Math.PI)
      c.fillStyle = this.color
      c.fill()
      c.strokeStyle = 'black'
      c.stroke()
    }
  }
}

function init() {
  if (drawing === true) {
    const centerX = mouse.x
    const centerY = mouse.y

    for (let i = 0; i < 3; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]

      const particle = new Particle(mouse.x, mouse.y, color, centerX, centerY)
      particle.update()
    }
  }
}