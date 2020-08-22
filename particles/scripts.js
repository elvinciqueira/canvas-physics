const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particlesArray

const mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove', event => {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('resize', event => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  mouse.radius = ((canvas.height / 80) * (canvas.width / 80))

  init()
})

window.addEventListener('mouseout', () => {
  mouse.x = undefined
  mouse.y = undefined
})

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.size = size
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    c.fillStyle = '#FFF'
    c.fill()
  }

  //check the particle position, check the mouse position, move the particle, draw the particle
  update() {
    // check if the particle is still within canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX
    }

    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY
    }

    //check colision detection - mouse position / particle position
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10
      }

      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10
      }

      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10
      }

      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10
      }
    }

    //move particle
    this.x += this.directionX
    this.y += this.directionY

    this.draw()
  }
}

// check if the particles are lose enough to draw line between them
function connect() {
  let opacity = 1

  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x)) +
        ((particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y))

      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacity = 1 - (distance / 20000)
        c.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        c.lineWidth = 1
        c.beginPath()
        c.moveTo(particlesArray[a].x, particlesArray[a].y)
        c.lineTo(particlesArray[b].x, particlesArray[b].y)
        c.stroke()
      }
    }
  }
}

function init() {
  particlesArray = []
  const numberOfParticles = (canvas.height * canvas.width) / 9000

  for (let i = 0; i < numberOfParticles; i++) {
    const size = (Math.random() * 5) + 1
    const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
    const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
    const directionX = (Math.random() * 5) - 2.5
    const directionY = (Math.random() * 5) - 2.5
    const color = ''

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
  }
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
  }

  connect()
}



init()
animate()