let campeonesO = [];
let championD = [];

// Funcion para llenar el modal con la Data

const championData = (element) => {
    console.log("Cargando...");
    fetch(`http://ddragon.leagueoflegends.com/cdn/12.16.1/data/en_US/champion/${element.target.dataset.id}.json`)
        .then((response) => response.json())
        .then((dataC) => {
            console.log("Data");
            let championData = dataC.data;
            championD = [];
            for (let i in championData) {
                championD.push(championData[i]);
            }
            document.querySelector("#modalLabel").innerText = championD[0].name.toUpperCase() + ", " + championD[0].title.toUpperCase();
            document.querySelector(".modal-body").innerHTML = `
    <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${element.target.dataset.id}_0.jpg" class="card-img-top">
    <p>Tags: ${championD[0].tags}</p>
    <p>Lore: <br> ${championD[0].lore}</p>
    <p>Spells: 
    <br> 
    Passive (P): ${championD[0].passive.name} 
    <br> 
    ${championD[0].passive.description}
    <br>
    ${championD[0].spells[0].name} (Q):
    <br>
    ${championD[0].spells[0].description}
    <br>
    ${championD[0].spells[1].name} (W):
    <br>
    ${championD[0].spells[1].description}
    <br>
    ${championD[0].spells[2].name} (E):
    <br>
    ${championD[0].spells[2].description}
    <br>
    ${championD[0].spells[3].name} (R):
    <br>
    ${championD[0].spells[3].description}
    </p>
    
    <p> Tips: ${championD[0].allytips} <br>
        Tips Against: ${championD[0].enemytips}</p>

    <p> Skins </p>
    
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
    <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
    <div class="carousel-item active">
    <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${element.target.dataset.id}_1.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
    <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${element.target.dataset.id}_2.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
    <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${element.target.dataset.id}_3.jpg" class="d-block w-100" alt="...">
    </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
    </button>
    </div>


    `;
        });
};
// Fetch inicial de la API
fetch("http://ddragon.leagueoflegends.com/cdn/12.16.1/data/en_US/champion.json")
    .then((response) => response.json())
    .then((dataO) => {
        let campeonesArray = dataO.data;
        campeonesO = [];
        for (let i in campeonesArray) {
            campeonesO.push(campeonesArray[i]);
        }
        render(campeonesO); // Mandado de datos a la funcion de render
    });

// Funcion para creacion de Cards
let render = (campeones) => {
    document.querySelector("#resultados").innerHTML = "";
    for (let i in campeones) {
        let col = document.createElement("div");
        col.classList.add("col", "col-lg-3");

        let card = document.createElement("div");
        card.classList.add("card", "text-white", "bg-dark");

        let img = document.createElement("img");
        if (campeones[i].id == "Malphite") {
            // Reemplazo de imagen por broma interna
            img.src = "https://assets.change.org/photos/0/uj/wj/EyUJWjmSZvXcoWu-800x450-noPad.jpg?1572025265";
        } else if (campeones[i].id == "Fiddlesticks") {
            // Caso especifico donde la automatizacion no funciono
            img.src = "http://ddragon.leagueoflegends.com/cdn/img/champion/centered/FiddleSticks_0.jpg";
        } else {
            // Llenado de las imagenes de las Cards
            img.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/centered/${campeones[i].id}_0.jpg`;
        }

        img.classList.add("card-img-top");

        card.append(img);

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerHTML = campeones[i].name;

        let title = document.createElement("p");
        title.classList.add("card-text");
        title.innerHTML = campeones[i].title;

        cardBody.append(h5);
        cardBody.append(title);

        let b = document.createElement("button");
        b.setAttribute("type", "button");
        b.setAttribute("data-bs-toggle", "modal");
        b.setAttribute("data-bs-target", "#modal");
        b.classList.add("btn", "btn-primary");
        b.innerText = "Ver";
        b.setAttribute("data-key", campeones[i].key);
        b.setAttribute("data-id", campeones[i].id);
        b.dataset.name = campeones[i].name;

        cardBody.append(b);
        card.append(cardBody);
        col.append(card);

        document.querySelector("#resultados").append(col);

        b.addEventListener("click", (b) => {
            // Disparador del boton para Ver informacion y enviar Data
            championData(b);
        });
    }
};
