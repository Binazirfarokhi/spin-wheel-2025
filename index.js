const sectors = [
  { color: '#F15A22', label: 'PEN' },        // Langara Orange
  { color: '#0082C9', label: 'Note book' },   // Secondary Blue
  { color: '#F1C500', label: 'USB' },         // Accent Yellow
  { color: '#E03C31', label: 'Pencil' },         // Deep Red (another secondary)
  { color: '#7A9A01', label: 'Tatto' },       // Olive Green
  // { color: '#7A7A7C', label: 'nothing' }      // Charcoal Grey
]

  
  const rand = (m, M) => Math.random() * (M - m) + m
  const tot = sectors.length
  const spinEl = document.querySelector('#spin')
  const ctx = document.querySelector('#wheel').getContext('2d')
  const dia = ctx.canvas.width
  const rad = dia / 2
  const PI = Math.PI
  const TAU = 2 * PI
  const arc = TAU / sectors.length
  
  const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=hard
  let angVel = 0 // Angular velocity
  let ang = 0 // Angle in radians
  
  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot
  
  function drawSector(sector, i) {
    const ang = arc * i
    ctx.save()
    // scale the wheel smaller 
    ctx.translate(rad, rad)
    ctx.scale(1, 1) // <<<<< 60% size
    ctx.translate(-rad, -rad)
    // COLOR
    ctx.beginPath()
    ctx.fillStyle = sector.color
    ctx.moveTo(rad, rad)
    ctx.arc(rad, rad, rad, ang, ang + arc)
    ctx.lineTo(rad, rad)
    ctx.fill()
    // TEXT
    ctx.translate(rad, rad)
    ctx.rotate(ang + arc / 2)
    ctx.textAlign = 'right'
    ctx.fillStyle = 'black'
    ctx.font = 'bold 30px sans-serif'
    ctx.fillText(sector.label, rad - 50, 10)
    //
    ctx.restore()
  }
  
  function rotate() {
    const sector = sectors[getIndex()]
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
    spinEl.textContent = !angVel ? 'SPIN' : sector.label
    spinEl.style.background = '#000'
  }
  
  function frame() {
    if (!angVel) return
    angVel *= friction // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0 // Bring to stop
    ang += angVel // Update angle
    ang %= TAU // Normalize angle
    rotate()
  }
  
  function engine() {
    frame()
    requestAnimationFrame(engine)
  }
  
  function init() {
    sectors.forEach(drawSector)
    rotate() // Initial rotation
    engine() // Start engine
    spinEl.addEventListener('click', () => {
      if (!angVel) angVel = rand(0.25, 0.45)
    })
  }
  
  init()
  