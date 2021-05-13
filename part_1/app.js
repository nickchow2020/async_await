/******************************** */
//Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
/******************************** */

async function favoriteNumber(){
    const {data} = await axios.get("http://numbersapi.com/3/?json")
    console.log(data)
}

// favoriteNumber()

/******************************** */
//Figure out how to get data on multiple numbers in a single request. 
//Make that request and when you get the data back, put all of the number facts on the page.
/******************************** */


async function multiFavorNum(){
    const {data} = await axios.get("http://numbersapi.com/3,13,18/?json")
    for( text in data ){
        $("#show_text").append(`<li>${data[text]}</li>`)
    }
}

// multiFavorNum()

/******************************** */
//Use the API to get 4 facts on your favorite number. 
//Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
/******************************** */

async function handleMultiple(){
    const all_result = await Promise.all([
        axios.get("http://numbersapi.com/3/?json"),
        axios.get("http://numbersapi.com/13/?json"),
        axios.get("http://numbersapi.com/18/?json"),
        axios.get("http://numbersapi.com/23/?json"),
    ])

    for( info of all_result){
        const {data} = info
        $("#show_text").append(`<li>${data.text}</li>`)
    }
}

handleMultiple()