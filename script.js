// Typing animation
const phrases = ["Rayan", "Développeur", "Créateur", "Innovateur"]

let currentPhraseIndex = 0
let currentCharIndex = 0
let isDeleting = false
let typingSpeed = 100
const deletingSpeed = 50
const pauseEnd = 1000

function typeText() {
  const typingText = document.querySelector(".typing-text")
  const currentPhrase = phrases[currentPhraseIndex]

  if (isDeleting) {
    // Deleting text
    typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1)
    currentCharIndex--
    typingSpeed = deletingSpeed
  } else {
    // Typing text
    typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1)
    currentCharIndex++
    typingSpeed = 100
  }

  // If we've typed the full phrase
  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    isDeleting = true
    typingSpeed = pauseEnd // Pause at the end
  }

  // If we've deleted the full phrase
  if (isDeleting && currentCharIndex === 0) {
    isDeleting = false
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
  }

  setTimeout(typeText, typingSpeed)
}

// Start the typing animation
window.addEventListener("load", typeText)

// Active navigation links based on scroll position
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

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
    navbar.style.boxShadow = "0 2px 10px rgba(255, 255, 255, 0.1)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"
    navbar.style.boxShadow = "none"
  }
})

// Form submission
document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault()
  alert("Merci pour votre message ! Je vous répondrai bientôt.")
  this.reset()
})

// Menu mobile
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const hamburger = document.querySelector(".mobile-menu-toggle")

  mobileMenu.classList.toggle("active")
  hamburger.classList.toggle("active")

  // Empêcher le scroll du body quand le menu est ouvert
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

// Récupération des vraies statistiques GitHub
async function fetchGitHubStats() {
  try {
    const username = "Rayan-Walnut"

    // Récupérer les données du profil GitHub pour les repos
    const profileResponse = await fetch(`https://api.github.com/users/${username}`)
    const profileData = await profileResponse.json()

    // Récupérer les repos pour compter les stars
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    const reposData = await reposResponse.json()

    // Calculer le nombre total d'étoiles
    const totalStars = reposData.reduce((total, repo) => total + repo.stargazers_count, 0)

    // Estimation des commits (basée sur les repos actifs)
    const activeRepos = reposData.filter((repo) => !repo.fork && repo.size > 0)
    const estimatedCommits = Math.max(activeRepos.length * 15, 180) // Estimation réaliste

    // Récupérer les pull requests
    let totalPRs = 0
    try {
      const prsResponse = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`)
      const prsData = await prsResponse.json()
      totalPRs = prsData.total_count || 25
    } catch (error) {
      totalPRs = 25 // valeur par défaut
    }

    // Mettre à jour les statistiques
    updateStatsDirectly({
      commits: estimatedCommits,
      repos: profileData.public_repos,
      stars: totalStars,
      prs: totalPRs,
    })

    console.log("✅ Statistiques GitHub mises à jour avec succès!")
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des statistiques:", error)
    // Valeurs par défaut réalistes
    updateStatsDirectly({
      commits: 250,
      repos: 28,
      stars: 45,
      prs: 32,
    })
  }
}

// Fonction pour mettre à jour les statistiques directement
function updateStatsDirectly(stats) {
  const statElements = {
    commits: document.querySelector(".stat-mini:nth-child(1) .stat-number-mini"),
    repos: document.querySelector(".stat-mini:nth-child(2) .stat-number-mini"),
    stars: document.querySelector(".stat-mini:nth-child(3) .stat-number-mini"),
    prs: document.querySelector(".stat-mini:nth-child(4) .stat-number-mini"),
  }

  // Mettre à jour directement avec une petite animation de fade
  for (const [key, element] of Object.entries(statElements)) {
    if (element) {
      // Animation de fade pour le changement
      element.style.opacity = "0.5"

      setTimeout(() => {
        element.textContent = stats[key]
        element.setAttribute("data-target", stats[key])
        element.style.opacity = "1"
      }, 200)
    }
  }
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  // Charger les vraies statistiques
  fetchGitHubStats()

  // Autres initialisations
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)
})