const inputPhrase = document.querySelector('.phrase');
const inputCount = document.querySelector('.count');
const button = document.querySelector('.button');
const form = document.querySelector('form');
const result = document.querySelector('.result');

form.addEventListener("submit", e => {
    e.preventDefault();
} );
button.addEventListener("click", async function () {
    let element = document.querySelector('.result');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    if (!inputPhrase.validity.valueMissing && !inputCount.validity.rangeOverflow && !inputCount.validity.rangeUnderflow) {
        let phrase = inputPhrase.value;
        let count = inputCount.value;
        let offset = Math.round(Math.random()*10);
        let data = await getDataFromServer(phrase, count, offset);

        if (data.length === 0) {
            result.textContent = `Подходящих картинок не найдено( `;
        }
    
        for (const item of data) {
            let url = item.images.downsized.url;
    
            let img = document.createElement('img');
            img.src = url;
            img.alt = `gif`;
            img.width = 480;
            result.append(img);
        }
    }
    inputPhrase.value = '';
});

async function getDataFromServer(phrase, count, offset) {
    try {
        let url = 'https://api.giphy.com/v1/gifs/search?api_key=9kJyx3REMi55Jyi1WhUuAfHWq8iwgzHT&q=' + phrase + '&limit=' + count + '&offset=' + offset + '&rating=g&lang=ru';
        let response = await fetch(url);

        let data = await response.json(); 
        return data.data;
    } catch (error) {
        console.log(error);
    }
}