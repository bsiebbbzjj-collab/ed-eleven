// ==================== DOM Ready ====================
document.addEventListener("DOMContentLoaded", () => {
  initBackground()
  initNavigation()
  initScrollAnimations()
  initBackButton()
  initFAQ()
})

// ==================== Background Animations ====================
function initBackground() {
  const cyberBg = document.querySelector(".cyber-bg")
  if (!cyberBg) return

  // Check if mobile or low performance device
  const isMobile = window.innerWidth <= 768
  const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

  const particleCount = isMobile || isLowPerformance ? 8 : 25
  const particlesContainer = cyberBg.querySelector(".particles")

  if (particlesContainer) {
    const colors = ["", "purple", "blue"] // empty string for default cyan
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = `particle ${colors[i % 3]}`
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 8 + "s"
      particle.style.animationDuration = 5 + Math.random() * 5 + "s"
      particlesContainer.appendChild(particle)
    }
  }

  // Skip heavy animations on mobile/low performance devices
  if (isMobile || isLowPerformance) return

  for (let i = 0; i < 4; i++) {
    const arm = document.createElement("div")
    arm.className = i % 2 === 0 ? "robot-arm" : "robot-arm secondary"
    arm.style.top = 15 + i * 20 + "%"
    arm.style.right = i % 2 === 0 ? "0" : "auto"
    arm.style.left = i % 2 === 0 ? "auto" : "0"
    arm.style.transformOrigin = i % 2 === 0 ? "right center" : "left center"
    arm.style.animationDelay = i * 1.5 + "s"
    cyberBg.appendChild(arm)
  }

  for (let i = 0; i < 6; i++) {
    const circuit = document.createElement("div")
    circuit.className = "circuit-line"
    circuit.style.top = Math.random() * 100 + "%"
    circuit.style.left = Math.random() * 50 + "%"
    circuit.style.animationDelay = Math.random() * 3 + "s"
    cyberBg.appendChild(circuit)
  }

  for (let i = 0; i < 4; i++) {
    const ring = document.createElement("div")
    ring.className = "hologram-ring"
    const size = 80 + i * 80
    ring.style.width = size + "px"
    ring.style.height = size + "px"
    ring.style.left = "50%"
    ring.style.top = "50%"
    ring.style.transform = "translate(-50%, -50%)"
    ring.style.animationDelay = i * 0.5 + "s"
    cyberBg.appendChild(ring)
  }

  for (let i = 0; i < 8; i++) {
    const rain = document.createElement("div")
    rain.className = "digital-rain"
    rain.style.left = i * 12.5 + Math.random() * 10 + "%"
    rain.style.animationDelay = Math.random() * 2 + "s"
    rain.style.animationDuration = 2 + Math.random() * 2 + "s"
    cyberBg.appendChild(rain)
  }

  const laser = document.createElement("div")
  laser.className = "scanning-laser"
  cyberBg.appendChild(laser)

  const gearPositions = [
    { top: "10%", left: "5%", size: 60 },
    { top: "70%", right: "10%", size: 80 },
    { bottom: "20%", left: "15%", size: 50 },
  ]

  gearPositions.forEach((pos, i) => {
    const gear = document.createElement("div")
    gear.className = "mech-gear"
    gear.style.width = pos.size + "px"
    gear.style.height = pos.size + "px"
    if (pos.top) gear.style.top = pos.top
    if (pos.bottom) gear.style.bottom = pos.bottom
    if (pos.left) gear.style.left = pos.left
    if (pos.right) gear.style.right = pos.right
    gear.style.animationDirection = i % 2 === 0 ? "normal" : "reverse"
    cyberBg.appendChild(gear)
  })
}

// ==================== Navigation ====================
function initNavigation() {
  const header = document.querySelector(".header")
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header?.classList.add("scrolled")
    } else {
      header?.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  menuToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("active")
    menuToggle.classList.toggle("active")
  })

  // Close menu on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("active")
      menuToggle?.classList.remove("active")
    })
  })

  // Set active nav link
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })
}

// ==================== Scroll Animations ====================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-right, .slide-in-left, .pop-in")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animatedElements.forEach((el) => observer.observe(el))
}

// ==================== Back Button ====================
function initBackButton() {
  const backBtn = document.querySelector(".back-btn")
  backBtn?.addEventListener("click", () => {
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
      window.history.back()
    } else {
      window.location.href = "index.html"
    }
  })
}

// ==================== Quiz Functions ====================
let quizAnswers = {}
const correctAnswers = {}

function selectOption(questionId, optionIndex) {
  quizAnswers[questionId] = optionIndex

  const question = document.querySelector(`[data-question="${questionId}"]`)
  if (question) {
    question.querySelectorAll(".quiz-option").forEach((opt, idx) => {
      opt.classList.remove("selected")
      if (idx === optionIndex) {
        opt.classList.add("selected")
      }
    })
  }
}

function submitQuiz() {
  let score = 0
  const total = Object.keys(correctAnswers).length

  Object.keys(correctAnswers).forEach((questionId) => {
    const question = document.querySelector(`[data-question="${questionId}"]`)
    if (question) {
      const options = question.querySelectorAll(".quiz-option")
      options.forEach((opt, idx) => {
        opt.classList.remove("selected", "correct", "wrong")
        if (idx === correctAnswers[questionId]) {
          opt.classList.add("correct")
        } else if (quizAnswers[questionId] === idx) {
          opt.classList.add("wrong")
        }
      })

      if (quizAnswers[questionId] === correctAnswers[questionId]) {
        score++
      }
    }
  })

  const resultDiv = document.getElementById("quiz-result")
  if (resultDiv) {
    resultDiv.style.display = "block"
    resultDiv.innerHTML = `
      <h3>نتيجتك</h3>
      <div class="result-score">${score}/${total}</div>
      <p style="color: var(--text-secondary); margin-top: 1rem;">
        ${
          score === total
            ? "🎉 ممتاز! إجابات صحيحة بالكامل!"
            : score >= total * 0.7
              ? "👏 أداء جيد جداً!"
              : score >= total * 0.5
                ? "💪 جيد، استمر في التعلم!"
                : "📚 تحتاج لمزيد من المراجعة"
        }
      </p>
      <button class="btn btn-primary" onclick="resetQuiz()" style="margin-top: 1.5rem;">
        إعادة الاختبار
      </button>
    `
    resultDiv.scrollIntoView({ behavior: "smooth" })
  }
}

function resetQuiz() {
  quizAnswers = {}
  document.querySelectorAll(".quiz-option").forEach((opt) => {
    opt.classList.remove("selected", "correct", "wrong")
  })
  const resultDiv = document.getElementById("quiz-result")
  if (resultDiv) {
    resultDiv.style.display = "none"
  }
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// ==================== Course Functions ====================
function toggleCourse(courseId) {
  const videosSection = document.getElementById(`videos-${courseId}`)
  if (videosSection) {
    videosSection.classList.toggle("active")
    const btn = videosSection.previousElementSibling?.querySelector(".course-toggle-btn")
    if (btn) {
      btn.textContent = videosSection.classList.contains("active") ? "إغلاق الكورس" : "دخول الكورس"
    }
  }
}

function playVideo(courseId, videoNum) {
  const playerContainer = document.getElementById(`player-${courseId}`)
  const videoPlayer = document.getElementById(`video-${courseId}`)

  if (playerContainer && videoPlayer) {
    playerContainer.classList.add("active")

    // Map course IDs to folder names
    const folderMap = {
      bigdata: "bigdata",
      analysis: "analysis",
      python: "python",
      html: "html",
      hardware: "hardware",
    }

    const folder = folderMap[courseId] || courseId
    videoPlayer.src = `assets/videos/${folder}/${videoNum}.mp4`
    videoPlayer.play().catch(() => {
      // Video not found, show placeholder message
      console.log(`Video placeholder: assets/videos/${folder}/${videoNum}.mp4`)
    })
  }
}

// ==================== Calculator Functions ====================
let calcDisplay = ""

function openCalculator() {
  const modal = document.getElementById("calculator-modal")
  if (modal) {
    modal.classList.add("active")
    calcDisplay = ""
    updateCalcDisplay()
  }
}

function closeCalculator() {
  const modal = document.getElementById("calculator-modal")
  if (modal) {
    modal.classList.remove("active")
  }
}

function calcInput(value) {
  if (value === "C") {
    calcDisplay = ""
  } else if (value === "=") {
    try {
      calcDisplay = eval(calcDisplay).toString()
    } catch {
      calcDisplay = "Error"
    }
  } else if (value === "⌫") {
    calcDisplay = calcDisplay.slice(0, -1)
  } else {
    calcDisplay += value
  }
  updateCalcDisplay()
}

function updateCalcDisplay() {
  const display = document.getElementById("calc-display")
  if (display) {
    display.value = calcDisplay || "0"
  }
}

// Close modal on overlay click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("active")
  }
})

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

// ==================== FAQ Accordion ====================
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    if (question) {
      question.addEventListener("click", () => {
        // Close other items
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove("active")
          }
        })
        // Toggle current item
        item.classList.toggle("active")
      })
    }
  })
}

// Make functions globally available
window.toggleCourse = toggleCourse
window.playVideo = playVideo
window.selectOption = selectOption
window.submitQuiz = submitQuiz
window.resetQuiz = resetQuiz
window.openCalculator = openCalculator
window.closeCalculator = closeCalculator
window.calcInput = calcInput
