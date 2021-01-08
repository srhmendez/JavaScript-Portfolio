const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');



function showLoadingSpinner() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    } 
} 

// Get Quote from API
async function getQuote() {
    showLoadingSpinner();
    const proxyURL = 'https://infinite-retreat-10179.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        // If Author is blank, add 'Unknown"
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for longer quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;

    // Stop Loader, Show Quote
        removeLoadingSpinner();

    } catch (error) {
        getQuote();
    }
}


// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');   
}

// Event Listeners
newQuoteButton.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);



// On Load
getQuote();
