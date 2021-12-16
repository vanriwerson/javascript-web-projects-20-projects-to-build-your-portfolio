const button = document.getElementById('button')
const audioElement = document.getElementById('audio')
const jokeText = document.getElementById('joke-text')
let APIjoke = ''

function toggleButton() {
    button.disabled = !button.disabled
}

function passTextToVoice() {
    VoiceRSS.speech({
        key: '12477dfb0ee54520a060e32359e6ee3a',
        src: `${APIjoke}`,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}

async function getJokeFromApi() {
    const API_URL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,political,racist,sexist'
    try {
        const response = await fetch(API_URL)
        const data = await response.json()

        if(data.setup) {
            APIjoke = `${data.setup} ${data.delivery}`
        } else {
            APIjoke = `${data.joke}`
        }

        jokeText.innerText = `${APIjoke}`
        passTextToVoice()
        toggleButton()
    } catch(error) {
        console.log('Whoops', error)
    }
}

button.addEventListener('click', getJokeFromApi)
audioElement.addEventListener('ended', toggleButton)