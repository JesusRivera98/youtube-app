const API_KEY = "AIzaSyB211GCQ04ra3nq3084bUW7lCl4aNqQSds";

function fetchVideos(searchTerm, token){
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=${API_KEY}&q=${searchTerm}&pageToken=${token}`;

    let settings = {
        method : 'GET'
    };
    console.log( url );
    fetch(url, settings)
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            displayResults(responseJSON);
        })
        .catch( err => {
            console.log(err);
        });
}

function displayResults(data){
    let results = document.querySelector( '.results' );
console.log(data);
    results.innerHTML = "";

    for( let i = 0; i < data.items.length; i ++ ){
      results.innerHTML += `
      <div>  
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}">
            <h2>
                ${data.items[i].snippet.title}
            </h2>
        </a>
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}">
            <img src=${data.items[i].snippet.thumbnails.medium.url}>
        </a>
            
      </div>
      `
    }
    results.innerHTML += `      
        <div>
            <button id="backButton">
                Back
            </button>
            <button id="nextButton">
                Next
            </button>
        </div>
      `
    let next = document.querySelector( '#nextButton' );    
    nextButton.addEventListener( 'click', ( event ) => {
        fetchVideos( searchTerm, data.nextPageToken);
    });
    let back= document.querySelector( '#backButton' );
    backButton.addEventListener( 'click', ( event ) => {
        fetchVideos( searchTerm, data.prevPageToken);
    });
}

function watchForm(){
    let submitButtton = document.querySelector( '.submitButtton' );

    submitButtton.addEventListener( 'click', ( event ) => {
        event.preventDefault();
        let searchTerm = document.querySelector( '#searchTerm' ).value;

        fetchVideos( searchTerm,"");
    });
}

function init(){
    watchForm();
}

init();