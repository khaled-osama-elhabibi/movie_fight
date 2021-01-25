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
        resultsWrapper.appendChild(option);
    }
}
input.addEventListener("input",debounce(onTime));
document.addEventListener("click", event =>{
    if(!root.contains(event.target))  dropdown.classList.remove("is-active");
})