const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function hideLoadingSpinner() {
    quoteContainer.hidden = false
    loader.hidden = true
}

function newQuote() {
    showLoadingSpinner()
    const randomIndex = Math.floor(Math.random() * apiQuotes.length)
    const quote = apiQuotes[randomIndex]
    
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = quote.text
    authorText.textContent = !quote.author ? '(Unknown)' : `(${quote.author})`
    hideLoadingSpinner()
}

async function getQuotesFromAPI() {
    showLoadingSpinner()
    const apiUrl = 'https://type.fit/api/quotes'

    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch(error) {
        window.alert('Sorry! Something goes wrong.')
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuotesFromAPI()
