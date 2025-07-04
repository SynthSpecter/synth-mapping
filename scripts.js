// Initialisation de la carte centrée sur Thiers
var map = L.map('map').setView([45.85, 3.55], 14) // Notez le point-virgule ajouté ici

// Tuile de la carte avec un style sombre
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

// Points d'intérêt - maintenant un tableau avec un premier élément
var pointsDInteret = [
  {
    lat: 45.85,
    lng: 3.55,
    name: 'Centre Ville de Thiers',
    description: 'Le cœur historique de Thiers',
    category: 'tourisme',
    website: '#',
  },
  // Ajoutez ici vos autres points d'intérêt
  // Exemple :
  {
    lat: 45.851, // Coordonnées à ajuster
    lng: 3.551, // Coordonnées à ajuster
    name: 'Mon Commerce',
    description: 'Description de mon commerce',
    category: 'boutique',
    website: 'https://monsite.com',
  },
]

// Icône synthwave pour les marqueurs par défaut
var synthwaveIcon = L.divIcon({
  className: 'synthwave-marker',
  html: '<div style="background-color: #ff00ff; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 10px #ff00ff;"></div>',
  iconSize: [20, 20],
})

// Ajout d'un marqueur de référence à Thiers
L.marker([45.85, 3.55], { icon: synthwaveIcon })
  .addTo(map)
  .bindPopup(
    '<div class="neon-text">Bienvenue à Thiers en mode Synthwave !</div>'
  )
  .openPopup()

// Fonction pour ajouter les points d'intérêt
function ajouterPointsDInteret() {
  pointsDInteret.forEach(function (point) {
    // Choix de la couleur en fonction de la catégorie
    var color
    switch (point.category) {
      case 'restaurant':
        color = '#00ff9d' // Vert néon
        break
      case 'boutique':
        color = '#00a2ff' // Bleu néon
        break
      case 'tourisme':
        color = '#ff00ff' // Rose néon
        break
      case 'service':
        color = '#ffee00' // Jaune néon
        break
      default:
        color = '#ff00ff' // Rose par défaut
    }

    // Création d'un icône personnalisé pour ce point
    var customIcon = L.divIcon({
      className: 'synthwave-marker',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 10px ${color};"></div>`,
      iconSize: [20, 20],
    })

    L.marker([point.lat, point.lng], { icon: customIcon }).addTo(
      map
    ).bindPopup(`
                <div class="neon-text" style="color: ${color}">
                    <b>${point.name}</b><br>
                    ${point.description}<br>
                    ${
                      point.website
                        ? `<a href="${point.website}" target="_blank">Visiter le site</a>`
                        : ''
                    }
                </div>
            `)
  })
}

// Ajouter les points d'intérêt à la carte
ajouterPointsDInteret()

// Ajout d'une grille synthwave
var gridCanvas = document.getElementById('grid')
gridCanvas.width = window.innerWidth
gridCanvas.height = window.innerHeight
var ctx = gridCanvas.getContext('2d')

function drawGrid() {
  ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height)
  ctx.strokeStyle = 'rgba(255, 0, 255, 0.1)'
  ctx.lineWidth = 1
  var size = 50
  for (var x = 0; x < gridCanvas.width; x += size) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, gridCanvas.height)
    ctx.stroke()
  }
  for (var y = 0; y < gridCanvas.height; y += size) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(gridCanvas.width, y)
    ctx.stroke()
  }
}

drawGrid()
window.addEventListener('resize', function () {
  gridCanvas.width = window.innerWidth
  gridCanvas.height = window.innerHeight
  drawGrid()
})

// Ajout d'un effet de scanline
var scanlineCanvas = document.createElement('canvas')
scanlineCanvas.style.position = 'absolute'
scanlineCanvas.style.top = '0'
scanlineCanvas.style.left = '0'
scanlineCanvas.style.pointerEvents = 'none'
scanlineCanvas.style.zIndex = '1001'
scanlineCanvas.width = window.innerWidth
scanlineCanvas.height = window.innerHeight
document.body.appendChild(scanlineCanvas)

var scanlineCtx = scanlineCanvas.getContext('2d')
function drawScanlines() {
  scanlineCtx.clearRect(0, 0, scanlineCanvas.width, scanlineCanvas.height)
  scanlineCtx.fillStyle = 'rgba(255, 0, 255, 0.05)'
  for (var y = 0; y < scanlineCanvas.height; y += 2) {
    scanlineCtx.fillRect(0, y, scanlineCanvas.width, 1)
  }
}

drawScanlines()
window.addEventListener('resize', function () {
  scanlineCanvas.width = window.innerWidth
  scanlineCanvas.height = window.innerHeight
  drawScanlines()
})
