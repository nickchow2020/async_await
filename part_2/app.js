$( document ).ready(function(){
    getDeskId()
})

let desk_id;

/************************************ */
//Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
//Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
/************************************ */

async function makeCardRequest(){
    const {data} = await axios.get("https://deckofcardsapi.com/api/deck/new/draw")
    const result = {
        value: data.cards[0].value,
        suit: data.cards[0].suit
    }

    console.log(result)
}

// makeCardRequest()


/************************************ */
//Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
//Once you have the card, make a request to the same API to get one more card from the same deck.
/************************************ */
const new_draw_url = "https://deckofcardsapi.com/api/deck/new/shuffle"
const deck_url = "https://deckofcardsapi.com/api/deck"


async function handleDeckCard(){
    const {data: deskId} = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle")
    const desk_id = deskId.deck_id
    await axios.get(`https://deckofcardsapi.com/api/deck/${desk_id}/shuffle/`)
    const {data:card1} = await axios.get(`https://deckofcardsapi.com/api/deck/${desk_id}/draw`)
    const {data:card2 } = await axios.get(`https://deckofcardsapi.com/api/deck/${desk_id}/draw`)

    const result = {
        card1:{
            value: card1.cards[0].value,
            suit: card1.cards[0].suit
        },
        card2:{
            value: card2.cards[0].value,
            suit: card2.cards[0].suit
        }
    }

    console.log(result)
}

// handleDeckCard()


/************************************ */
// Build an HTML page that lets you draw cards from a deck. 
// When the page loads, go to the Deck of Cards API to create a new deck,
// and show a button on the page that will let you draw a card. Every time you click the button, 
// display a new card, until there are no cards left in the deck.
/************************************ */

$("#addCard").on("click",getDeskCard)

async function getDeskCard(){
    const {data:card} = await axios.get(`https://deckofcardsapi.com/api/deck/${desk_id}/draw`)
    $("#show_card").append(`<image src=${card.cards[0].image} />`)
}

async function getDeskId(){
    const {data} = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle") 
    desk_id = data.deck_id
}


