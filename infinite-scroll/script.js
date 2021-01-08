const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        imageCountToLoad = 30
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

//Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    // Run function for each object in photosArray
    photosArray.forEach((photo) => {

    // Create <a> to link to Unsplash
    const item = document.createElement('a');

    setAttributes(item, {
        href: photo.links.html,
        target: '_ blank',
    });

     // Create <img> for photo
    const img = document.createElement('img');

    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded())
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}


//Unsplash API
let imageCountToLoad = 5;
const apiKey = 'wZy2iIeG_5ouPpfDVLFXhXUe80O6Yg_qxQyT3Zt1BL0';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Get Photos From Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
};


// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready = false;
    }
});


//On Load
getPhotos();