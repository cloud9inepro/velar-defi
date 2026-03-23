import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ─── Custom Cursor ────────────────────────────────────────
const cursor = document.createElement('div')
cursor.classList.add('cursor')
document.body.appendChild(cursor)

const cursorRing = document.createElement('div')
cursorRing.classList.add('cursor-ring')
document.body.appendChild(cursorRing)

let mouseX = 0, mouseY = 0
let ringX = 0, ringY = 0

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  cursor.style.left = `${mouseX}px`
  cursor.style.top = `${mouseY}px`
})

// Ring follows with slight lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12
  ringY += (mouseY - ringY) * 0.12
  cursorRing.style.left = `${ringX}px`
  cursorRing.style.top = `${ringY}px`
  requestAnimationFrame(animateRing)
}
animateRing()

// Hover effect on interactive elements
document.addEventListener('mouseover', (e) => {
  if (e.target.closest('button, a, [data-cursor-hover]')) {
    cursor.classList.add('hover')
    cursorRing.classList.add('hover')
  }
})

document.addEventListener('mouseout', (e) => {
  if (e.target.closest('button, a, [data-cursor-hover]')) {
    cursor.classList.remove('hover')
    cursorRing.classList.remove('hover')
  }
})

// ─── Mount App ────────────────────────────────────────────
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)