const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function complete() {
    quoteContainer.hidden = false
    loader.hidden = true
}

function newQuote() {
    loading()
    const randomIndex = Math.floor(Math.random() * apiQuotes.length)
    const quote = apiQuotes[randomIndex]
    
    if(quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = quote.text
    authorText.textContent = !quote.author ? '(Unknown)' : `(${quote.author})`
    complete()
}

async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'

    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch(error) {
        //Mensagem de erro aqui
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()
