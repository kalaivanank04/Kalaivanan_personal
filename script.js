const root = document.documentElement
const toggle = document.getElementById('themeToggle')
const year = document.getElementById('year')
if (year) year.textContent = String(new Date().getFullYear())
function setTheme(mode) {
  if (mode === 'light') {
    root.classList.add('light')
  } else {
    root.classList.remove('light')
  }
  localStorage.setItem('theme', mode)
}
const saved = localStorage.getItem('theme')
if (saved) {
  setTheme(saved)
} else {
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
  setTheme(prefersLight ? 'light' : 'dark')
}
if (toggle) {
  toggle.addEventListener('click', () => {
    const isLight = root.classList.contains('light')
    setTheme(isLight ? 'dark' : 'light')
  })
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href')
    if (!href) return
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 64, behavior: 'smooth' })
  })
})
const resumeBtn = document.getElementById('resumeBtn')
if (resumeBtn) {
  fetch('resume.pdf', { method: 'HEAD' })
    .then(r => { if (!r.ok) resumeBtn.style.display = 'none' })
    .catch(() => { resumeBtn.style.display = 'none' })
}
