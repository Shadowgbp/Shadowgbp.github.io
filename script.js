let map;

function initMap() {
    const defaultLocation = { lat: -23.5505, lng: -46.6333 }; // São Paulo
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: defaultLocation,
    });
}

function showLocationFromIP() {
    const ip = document.getElementById("ipInput").value;
    fetch(`https://ipinfo.io/${ip}/json?token=aff2021480776f`)
        .then(response => response.json())
        .then(data => {
            const loc = data.loc.split(",");
            const userLocation = { lat: parseFloat(loc[0]), lng: parseFloat(loc[1]) };

            // Coloca um marcador na localização do IP
            new google.maps.Marker({
                position: userLocation,
                map: map,
            });

            // Centraliza o mapa na localização do IP
            map.setCenter(userLocation);

            // Exibe as informações no campo
            document.getElementById("info").innerText = `
                IP: ${data.ip}
                Cidade: ${data.city}
                Região: ${data.region}
                País: ${data.country}
                Organização: ${data.org}
            `;
        })
        .catch(error => {
            alert("Erro ao localizar o IP: " + error.message);
        });
}
// aff2021480776f