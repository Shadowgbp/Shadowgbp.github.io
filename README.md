Relatório Detalhado: Geolocalização com Google Maps
Objetivo do Projeto
O projeto utiliza a API do Google Maps e um serviço de geolocalização por IP (IPInfo) para localizar endereços com base em um IP fornecido pelo usuário. O sistema centraliza o mapa na localização encontrada e exibe informações detalhadas sobre o IP. Esse projeto é uma aplicação prática de integração entre APIs de mapas e serviços de geolocalização.

Arquitetura e Estrutura do Projeto
1. Arquivos do Projeto
    • index.html: Página principal da aplicação contendo o layout e os elementos HTML para interação com o usuário. 
    • styles.css: Arquivo de estilo para personalização da interface. 
    • script.js: Script responsável pela lógica da aplicação, integração com APIs e manipulação do DOM. 

2. Funcionamento do Projeto
a. Inicialização do Mapa
No arquivo script.js, a função initMap() inicializa o mapa usando a API do Google Maps. A localização padrão é definida como São Paulo (coordenadas: lat: -23.5505, lng: -46.6333), e o mapa é renderizado no elemento HTML com o ID map.
function initMap() {
    const defaultLocation = { lat: -23.5505, lng: -46.6333 }; // São Paulo
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: defaultLocation,
    });
}

b. Localização por IP
A função showLocationFromIP() é acionada quando o usuário insere um IP e solicita sua localização. Ela faz uma requisição à API do IPInfo, que retorna informações como coordenadas geográficas, cidade, região, país, organização, e outros dados relevantes.
Etapas da Função:
    1. Input do Usuário: O IP é capturado pelo campo de entrada no formulário (ID: ipInput). 
    2. Requisição à API: A API do IPInfo (https://ipinfo.io/${ip}/json) é acessada usando fetch(), e os dados retornados são tratados como JSON. 
    3. Atualização do Mapa: 
        ◦ As coordenadas fornecidas pela API são usadas para criar um marcador no mapa com a função google.maps.Marker. 
        ◦ O mapa é centralizado na nova localização com map.setCenter(userLocation). 
    4. Exibição de Informações: Detalhes do IP, como cidade, região e país, são exibidos no elemento com ID info.
fetch(`https://ipinfo.io/${ip}/json?token=aff2021480776f`)
    .then(response => response.json())
    .then(data => {
        const loc = data.loc.split(",");
        const userLocation = { lat: parseFloat(loc[0]), lng: parseFloat(loc[1]) };

        new google.maps.Marker({
            position: userLocation,
            map: map,
        });

        map.setCenter(userLocation);

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
c. Tratamento de Erros
Caso ocorra uma falha na requisição ou o IP fornecido seja inválido, a aplicação exibe uma mensagem de erro ao usuário usando o método alert().

Elementos do Projeto
1. Estrutura HTML
O arquivo index.html contém os seguintes elementos principais:
    • Título da Página: "Geolocalização com Google Maps". 
    • Formulário de Entrada: Um campo de texto para inserir o IP (id="ipInput") e um botão para acionar a função de localização. 
    • Mapa: Um elemento div com o ID map para renderizar o mapa. 
    • Área de Informações: Um elemento div com o ID info para exibir os dados do IP. 
Exemplo de Estrutura:
<!DOCTYPE html>
<html>
<head>
    <title>Geolocalização com Google Maps</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Geolocalização com Google Maps</h1>
    <form id="ipForm" onsubmit="event.preventDefault(); showLocationFromIP();">
        <input type="text" id="ipInput" placeholder="Digite o endereço IP">
        <button type="submit">Mostrar no Mapa</button>
    </form>
    <div id="map"></div>
    <div id="info"></div>
    <script src="script.js"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
</body>
</html>

2. Estilização CSS
O styles.css define a aparência do projeto, garantindo uma interface responsiva e visualmente agradável. As principais configurações incluem:
    • Fonte e Margens: Configurações globais para o corpo da página. 
    • Mapa: Altura de 70% da viewport (70vh) e largura de 100% para ocupar todo o espaço horizontal. 
    • Formulário e Informações: 
        ◦ Margens para separação entre os elementos. 
        ◦ Fundo com cor clara e bordas arredondadas para o bloco de informações.
body { 
    font-family: Arial, sans-serif; 
    margin: 0; 
    padding: 20px; 
}
#map { 
    height: 70vh; 
    width: 100%; 
}
#ipForm {
    margin-bottom: 20px;
}
#info {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

ecnologias Utilizadas
    1. HTML: Estrutura da página. 
    2. CSS: Estilização e layout. 
    3. JavaScript: Lógica da aplicação e integração com APIs. 
    4. Google Maps API: Renderização e manipulação do mapa. 
    5. IPInfo API: Serviço de geolocalização por IP.
Benefícios e Aplicações
    • Rastreamento de Localizações: Ideal para sistemas de análise de tráfego, segurança ou personalização de conteúdo. 
    • Integração Simples: Utiliza APIs amplamente documentadas e fáceis de integrar. 
    • Interface Responsiva: Compatível com diversos dispositivos e tamanhos de tela. 

Limitações
    • Requer uma chave válida para a API do Google Maps (YOUR_API_KEY). 
    • O uso da API do IPInfo é limitado por plano gratuito (restrições de requisições por dia). 
    • A precisão da localização depende da base de dados do serviço de IP. 

Conclusão
Este projeto demonstra como integrar APIs de mapas e geolocalização para criar uma aplicação interativa e funcional. É uma solução simples, mas poderosa, para localizar e exibir informações baseadas em IPs. A interface amigável, aliada à robustez das APIs utilizadas, oferece uma base sólida para aplicações mais avançadas no futuro.
