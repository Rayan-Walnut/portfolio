// Navigation active au scroll
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

function setActiveLink() {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", setActiveLink)

// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})

// Navbar background au scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
    navbar.style.boxShadow = "0 2px 10px rgba(0, 212, 255, 0.1)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"
    navbar.style.boxShadow = "none"
  }
})

// Menu mobile
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const hamburger = document.querySelector(".mobile-menu-toggle")

  mobileMenu.classList.toggle("active")
  hamburger.classList.toggle("active")

  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const hamburger = document.querySelector(".mobile-menu-toggle")

  mobileMenu.classList.remove("active")
  hamburger.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Fermer le menu mobile si on clique en dehors
document.addEventListener("click", (event) => {
  const mobileMenu = document.getElementById("mobileMenu")
  const hamburger = document.querySelector(".mobile-menu-toggle")

  if (
    mobileMenu.classList.contains("active") &&
    !hamburger.contains(event.target) &&
    !mobileMenu.contains(event.target)
  ) {
    closeMobileMenu()
  }
})

// Fermer le menu mobile au redimensionnement
window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    closeMobileMenu()
  }
})

// Animation des statistiques au scroll
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number")

  statNumbers.forEach((stat) => {
    const rect = stat.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const finalValue = stat.textContent
      const isPercentage = finalValue.includes("%")
      const numericValue = Number.parseInt(finalValue.replace(/[^\d]/g, ""))

      let currentValue = 0
      const increment = numericValue / 50

      const timer = setInterval(() => {
        currentValue += increment
        if (currentValue >= numericValue) {
          currentValue = numericValue
          clearInterval(timer)
        }

        if (isPercentage) {
          stat.textContent = Math.floor(currentValue) + "%"
        } else if (finalValue.includes("s")) {
          stat.textContent = (currentValue / 10).toFixed(1) + "s"
        } else {
          stat.textContent = Math.floor(currentValue)
        }
      }, 50)
    }
  })
}

// Animation des cartes au scroll
function animateCards() {
  const cards = document.querySelectorAll(".defense-card, .trend-card, .threat-category, .insight")

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    if (rect.top < window.innerHeight - 100) {
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 100)
    }
  })
}

// Initialiser les animations
window.addEventListener("scroll", () => {
  animateStats()
  animateCards()
})

// Animation d'entrée pour les éléments
document.addEventListener("DOMContentLoaded", () => {
  // Masquer initialement les cartes pour l'animation
  const animatedElements = document.querySelectorAll(".defense-card, .trend-card, .threat-category, .insight")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
  })

  // Déclencher les animations après un court délai
  setTimeout(() => {
    animateStats()
    animateCards()
  }, 500)
})

// Effet de parallax léger pour le hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")

  if (hero) {
    const speed = scrolled * 0.5
    hero.style.transform = `translateY(${speed}px)`
  }
})

// Animation des icônes IA et sécurité
document.addEventListener("DOMContentLoaded", () => {
  const aiIcon = document.querySelector(".ai-icon")
  const securityIcon = document.querySelector(".security-icon")

  if (aiIcon && securityIcon) {
    setInterval(() => {
      aiIcon.style.transform = "scale(1.1) rotate(5deg)"
      securityIcon.style.transform = "scale(1.1) rotate(-5deg)"

      setTimeout(() => {
        aiIcon.style.transform = "scale(1) rotate(0deg)"
        securityIcon.style.transform = "scale(1) rotate(0deg)"
      }, 500)
    }, 3000)
  }
})

console.log("🤖 Veille Technologique - IA & Cybersécurité chargée avec succès!")
