const createAutoCompelete = ({ root, renderOption , onOptionSelect , inputValue , fetchData }) => {
    /* Creating & Selecting the Essential & Frequently Used HTML Elements */
    root.innerHTML = `
    <label><b>Search</b></label><br>
    <input class = "input" />
    <div class = "dropdown">
    <div class = "dropdown-menu">
    <div class = "dropdown-content results"></div>
    </div>
    </div>
    `;
    const input = root.querySelector(".input");
    const dropdown = root.querySelector(".dropdown");
    const resultsWrapper = root.querySelector(".results");
    /*-------------------------------------------------------------------------*/
    const onInput = async event =>{ 
        let items = await fetchData(event.target.value);
        if(items.length === 0) {
            dropdown.classList.remove("is-active");
            return;
        }
        resultsWrapper.innerHTML = "";
        dropdown.classList.add("is-active");
        /*creating an option for each search result*/
        for(let item of items){
            const option = document.createElement("a");
            option.classList.add("dropdown-item")
            option.innerHTML = renderOption(item);
            option.addEventListener("click",()=>{
                dropdown.classList.remove("is-active");
                input.value = inputValue(item);
                onOptionSelect(item);
            })
            resultsWrapper.appendChild(option);
        }
    }

    input.addEventListener("input",debounce(onInput));
    
    document.addEventListener("click", event =>{
        if(!root.contains(event.target))  dropdown.classList.remove("is-active");
    })
}
    
    
    