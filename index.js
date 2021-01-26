const root = document.querySelector('.auto-complete');
root.innerHTML = `
    <label><b>Search for a movie</b></label><br>
    <input class = "input" />
    <div class = "dropdown">
    <div class = "dropdown-menu">
    <div class = "dropdown-content results"></div>
    </div>
    </div>
    `;
    const input = document.querySelector(".input");
    const dropdown = document.querySelector(".dropdown");
    const resultsWrapper = document.querySelector(".results");
    const movieTempCreate = movieDetails => {
        return`
        <article class="media">
        <figure class="media-left">
          <p class="image">
            <img src="${movieDetails.Poster}"/>
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h1>${movieDetails.Title}</h1>
            <h4>${movieDetails.Genre}</h4>
            <p>${movieDetails.Plot}</p>
          </div>
        </div>
      </article>
      `;
    }
    const onMovieSelect = async movie =>{
        console.log(movie)
        const response = await axios.get("http://www.omdbapi.com/",{
            params:{
                apikey : "63ea86cb",
                i: movie.imdbID
            }
        });
        document.querySelector('#summary').innerHTML=movieTempCreate(response.data);
    }
    const fetchData = async searchTerm =>{
        const response = await axios.get("http://www.omdbapi.com/",{
            params:{
                apikey : "63ea86cb",
                s: searchTerm
            }
        });
        if(response.data.Error) return [];
        return response.data.Search ;
    }
    const onTime = async event =>{ 
        let movies = await fetchData(event.target.value);
    if(movies.length === 0) {
        dropdown.classList.remove("is-active");
        return;
    }
    resultsWrapper.innerHTML = " ";
    dropdown.classList.add("is-active");
    for(let movie of movies){
        
        const img = document.createElement("img");
        img.src = `${movie.Poster === "N/A" ? '' : movie.Poster}`;
        
        const p = document.createElement("p");
        p.innerText = `${movie.Title}`;
        
        const option = document.createElement("a");
        option.appendChild(img);
        option.appendChild(p);
        option.classList.add("dropdown-item")
        option.addEventListener("click",()=>{
            dropdown.classList.remove("is-active");
            input.value = movie.Title;
            onMovieSelect(movie);
        })
        
        resultsWrapper.appendChild(option);
    }
}
input.addEventListener("input",debounce(onTime));
document.addEventListener("click", event =>{
    if(!root.contains(event.target))  dropdown.classList.remove("is-active");
})
    /*const row = document.createElement('div');
    const col = document.createElement('div');
    const moviePoster = document.createElement('img');
    const movieName = document.createElement('h1');
    const movieGenre = document.createElement('h4');
    const moviePlot = document.createElement('p');

    moviePoster.src = movieDetails.Poster;
    movieName.innerText = movieDetails.Title;
    movieGenre.innerText = movieDetails.Genre;
    moviePlot.innerText = movieDetails.Plot; 
    
    row.classList.add('col-span');
    col.classList.add('row-span');
    artical.classList.add('row-span');
    
    col.appendChild(movieName);
    col.appendChild(movieGenre);

    row.appendChild(moviePoster);
    row.appendChild(col);

    artical.appendChild(row);
    artical.appendChild(moviePlot);

    return artical;*/