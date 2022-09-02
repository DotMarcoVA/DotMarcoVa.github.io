document.querySelector("#abc").addEventListener("click", () => {
    // Filtro A-Z
    campeonesO.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
    });
    render(campeonesO);
});
document.querySelector("#cba").addEventListener("click", () => {
    // Filtro Z-A
    campeonesO.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
    });
    campeonesO.reverse();
    render(campeonesO);
});
document.querySelector("#diff").addEventListener("click", () => {
    // Filtro por Dificultad
    campeonesO.sort((a, b) => (a.info.difficulty < b.info.difficulty ? 1 : -1));
    console.log(campeonesO);
    render(campeonesO);
});

document.querySelector("#searchInput").addEventListener("keyup", (evt) => {
    // Filtro de Input per Key
    let name = document.querySelector("#searchInput").value.toLowerCase();
    let filters = campeonesO.filter((campeon) => {
        return campeon.name.toLowerCase().includes(name);
    });
    render(filters);
});
document.querySelector("#class").addEventListener("change", (evt) => {
    // Filtro del Selector
    let results = evt.target.value;
    console.log(results);
    let filter = campeonesO.filter((campeon) => {
        return campeon.tags.includes(results);
    });
    render(filter);
});

document.querySelector("#todos").addEventListener("click", () => {
    fetch("http://ddragon.leagueoflegends.com/cdn/12.16.1/data/en_US/champion.json")
        .then((response) => response.json())
        .then((dataO) => {
            let campeonesArray = dataO.data;
            campeonesO = [];
            for (let i in campeonesArray) {
                campeonesO.push(campeonesArray[i]);
            }
            render(campeonesO);
        });
});

// Change
