//Retrieve Dogs/////////////////////////////////////////////

function initialize(){
    getDogs()
}

function getDogs(){
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(function(data){
        //Span Menu///////////////////////////////////////////////////
        for(let key of data){
            let span = document.createElement('span')
            span.innerHTML = key.name
            document.querySelector('#dog-bar').appendChild(span)

            //Filter Button//////////////////////////////////////////////////
            let filterButton = document.querySelector("#good-dog-filter")
            filterButton.addEventListener('click', function(){
                if(key.isGoodDog === false){
                    span.style.display = "none"
                    filterButton.textContent = "Filter good dogs: ON"
                }
            })


            //Span Button//////////////////////////////////////////////////
            span.addEventListener('click', function(){
                let div = document.querySelector('#dog-info')
                div.innerHTML = ``

                let ul = document.createElement('ul')
                ul.innerHTML = `<img src="${key.image}"/>
                <h2>${key.name}</h2>
                <button class="toggle"></button>
                `
                document.querySelector('#dog-info').append(ul)

                //Toggle Button/////////////////////////////////////////////////
                let toggle = document.querySelector(".toggle")

                toggle.textContent = (key.isGoodDog === true) ? "Good Dog!" : "Bad Dog!"

                //PATCH///////////////////////////////////////////////////
                toggle.addEventListener('click', function(){
                    fetch(`http://localhost:3000/pups/${key.id}`, {
                        method: "PATCH",
                        headers: {
                            "content-Type": "application/json",
                            accept: "application/json"
                        },
                        body: JSON.stringify({
                        isGoodDog: data.isGoodDog = !data.isGoodDog
                        })
                    })
                    .then(res => res.json())
                    .then(function(data){
                        toggle.textContent = (data.isGoodDog === true) ? "Good Dog!" : "Bad Dog!"
                    })
                })
            })
        }
    })
}

initialize();