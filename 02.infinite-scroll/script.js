let imagesCount = 5
const API_KEY = 'X96JZoBOhhjmVnXq2fkW-22xYdeB76U9MhHPYFYIltI'
let API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${imagesCount}`

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []
let initialLoad = true

function imageLoaded() {
    imagesLoaded++
    
    if(imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        initialLoad = false
    }
}

async function getPhotosFromAPI() {
    try {
        const response = await fetch(API_URL)
        photosArray = await response.json()
        
        insertImages()
    } catch(error) {
        window.alert('Sorry! Something goes wrong.')
    }
}

function insertImages() {
    imagesLoaded = 0
    totalImages = photosArray.length
    
    photosArray.forEach((photo => {
        const imgEl = document.createElement('a')
        imgEl.href = `${photo.links.html}`
        imgEl.target = '_blank'
        imgEl.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}">`

        imgEl.addEventListener('load', imageLoaded())

        imageContainer.appendChild(imgEl)
    }))
}

window.addEventListener('scroll', () => {
    if(!initialLoad) {
        imagesCount = 30
        API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${imagesCount}`
    }
    
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotosFromAPI()
    }
})

getPhotosFromAPI()