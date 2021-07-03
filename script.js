const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []; //global variable

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// Show New Quote
function newQuote() {
    showLoadingSpinner()
    // Pick a random quite from apiQuotes array length
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
    // gets the author/text value from the returned object and applies it to the containers
    if (!quote.author) {
        authorText.textContent = 'Uknown'
    } else {
        authorText.textContent = quote.author;
    }
    // checking lenght for styling the font-size
    if (quote.text.length > 40) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set quote, hide loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner()
}
// Get quotes from API
// creating an async function so it doesnt affect the loading of the page
async function getQuotes() {
    showLoadingSpinner() // called here to appear before anything loads
    const apiUrl = 'https://type.fit/api/quotes';
    // make a fetch request by using try/catch so if an error occurs we can use its information and  do something with it
    try {
        // setting the response const only after it has fetched the data
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote() // calls complete() when everything is loaded
    } catch (error) {
        //Catch Error here, if we catch an error and we try to run the same func again we must make a threshhold where we dont end up in a endless loop wich will brake our program
    }
}
// to load data from a local source we just need the
// {function newQuote() on load and link it to the local DB}


//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?${quoteText.textContent} - ${authorText.textContent} `;
    window.open(twitterUrl, '_blank')
    
    // opens a new tab for the tweet with the values given in the URL

}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);



// on load
getQuotes()
