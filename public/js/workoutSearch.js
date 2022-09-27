const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const searchTerm = document.querySelector('#workout-search').value.trim();
    console.log("SEARCH TERM", searchTerm, searchTerm===true)
    if (searchTerm) {;
        // const response = await getResults(searchTerm);
        // console.log(response.json());
  
    //   if (response.ok) {
        document.location.replace('/');
        console.log("Success!");
    //   } else {
    //     alert('Error');
    //   }
    }
  };
  
  document
    .querySelector('.search-form')
    .addEventListener('submit', loginFormHandler);
  
async function getResults(searchTerm) {
    const fullURL = searchTermToURL(searchTerm);
    const response = await fetch(fullURL, {
        method: 'GET', //GET is the default.
        })
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .catch(function(error) {
            console.log(error);
        });
    return response;
}

// function searchTermToURL(searchTerm) {
//     return ("https://api.edamam.com/api/recipes/v2?type=public&q=" + searchTerm + "&app_id=03f13ddd&app_key=02579918e4ba389d465eaa6dd2ed2a99");
// }





