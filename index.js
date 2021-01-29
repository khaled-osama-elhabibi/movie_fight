const autoCompleteConfig = {
    async fetchData(searchTerm){
        const response = await axios.get("http://www.omdbapi.com/",{
            params:{
                apikey : "63ea86cb",
                s: searchTerm
            }
        });
        if(response.data.Error) return [];
        return response.data.Search ;
    },
    renderOption(movie){
        const opti = document.createElement('a');
        const img = document.createElement("img");
        const p = document.createElement("p");
        img.src = `${movie.Poster === "N/A" ? '' : movie.Poster}`;
        p.innerText = `${movie.Title}`;
        opti.appendChild(img);
        opti.appendChild(p);
        return opti.innerHTML;
    },
    inputValue(movie){
        return movie.Title;
    }
}
let movieRight , movieLeft ;
const onMovieSelect = async (movie,direction,side) =>{
    const response = await axios.get("http://www.omdbapi.com/",{
        params:{
            apikey : "63ea86cb",
            i: movie.imdbID
        }
    });
    if(side === 'left') {movieLeft = response.data;}
    else if(side === 'right') {movieRight = response.data;}

    document.querySelector(direction).innerHTML=movieTempCreate(response.data);

    if(movieRight && movieLeft){
        runComparison();
    }
}
const runComparison =()=>{
    const leftSideStats = document.querySelectorAll('#summary-left .notification');
    const rightSideStats = document.querySelectorAll('#summary-right .notification');

    leftSideStats.forEach((leftStat , index)=>{
        const leftSideVal = leftStat.dataset.value;
        const rightSideVal = rightSideStats[index].dataset.value;
        console.log(leftSideVal,rightSideVal)
        if(leftSideVal == undefined) {}
        else if(leftSideVal < rightSideVal){
            rightSideStats[index].classList.remove('is-primary');
            rightSideStats[index].classList.add('is-warning');
        }else{
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        }

    })
}
const movieTempCreate = movieDetails => {
    const dollars =parseInt(
        movieDetails.BoxOffice.replace('$','').replace(',','')
    );
    const metaScore = parseInt(movieDetails.Metascore);
    const imdbRating = parseFloat(movieDetails.imdbRating);
    const imdbVotes = parseInt(
        movieDetails.imdbVotes.replace(',','')
    );
    console.log(dollars,metaScore,imdbRating,imdbVotes);

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
    <article class="notification is-primary">
        <p class="title">${movieDetails.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
        <p class="title">${movieDetails.BoxOffice}</p>
        <p class="subtitle">BoxOffice</p>
    </article>
    <article data-value=${metaScore} class="notification is-primary">
        <p class="title">${movieDetails.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
        <p class="title">${movieDetails.imdbRating}</p>
        <p class="subtitle">imdbRating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
        <p class="title">${movieDetails.imdbVotes}</p>
        <p class="subtitle">imdbVotes</p>
    </article>
  `;
}

createAutoCompelete({
    root : document.querySelector("#left-autocomplete"),
    onOptionSelect(movie){
        onMovieSelect(movie,'#summary-left','left');
    },
    ...autoCompleteConfig
})  

createAutoCompelete({
    root : document.querySelector("#right-autocomplete"),
    onOptionSelect(movie){
        onMovieSelect(movie,'#summary-right','right');
    },
    ...autoCompleteConfig
})  
