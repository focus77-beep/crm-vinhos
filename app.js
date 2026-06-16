let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let zonas = JSON.parse(localStorage.getItem("zonas")) || [];
let rotas = JSON.parse(localStorage.getItem("rotas")) || [];

let clienteEmEdicao = -1;

function mostrarPagina(pagina) {

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("clientes").style.display = "none";
    document.getElementById("rotas").style.display = "none";
    document.getElementById("visitas").style.display = "none";
    document.getElementById("produtos").style.display = "none";
    document.getElementById("relatorios").style.display = "none";

    document.getElementById(pagina).style.display = "block";

    if (pagina === "rotas") {

        document.getElementById("detalheRota").style.display = "none";

        document.getElementById("detalheZona").style.display = "none";

        document.getElementById("listaZonas").style.display = "block";

        document.getElementById("btnNovaZona").style.display = "inline-block";

    }

}

function abrirCliente() {

    clienteEmEdicao = -1;

    document.getElementById("tituloCliente").innerHTML = "Novo Cliente";

    document.getElementById("nomeCliente").value = "";
    document.getElementById("moradaCompleta").value = "";
    document.getElementById("responsavelCompras").value = "";
    document.getElementById("contacto1").value = "";
    document.getElementById("contacto2").value = "";
    document.getElementById("email").value = "";

    document.getElementById("tipoCliente").selectedIndex = 0;
    document.getElementById("potencialVendas").selectedIndex = 0;

    document.getElementById("segunda").checked = false;
    document.getElementById("terca").checked = false;
    document.getElementById("quarta").checked = false;
    document.getElementById("quinta").checked = false;
    document.getElementById("sexta").checked = false;

    document.getElementById("popupCliente").style.display = "flex";

}

function fecharCliente() {

    document.getElementById("popupCliente").style.display = "none";

}

function abrirFichaCliente(indice) {


    let cliente = clientes[indice];


    window.clienteAtual = cliente;
    window.indiceClienteAtual = indice;


    document.getElementById("dadosCliente").innerHTML =

        "<div style='margin-bottom:25px;'>" +
        "🍷 <strong>Cliente</strong><br>" +
        (cliente.nome || "-") +
        "</div>" +

        "<div style='margin-bottom:25px;'>" +
        "🏢 <strong>Tipo</strong><br>" +
        (cliente.tipo || "-") +
        "</div>" +

        "<div style='margin-bottom:25px;'>" +
        "📍 <strong>Morada</strong><br>" +
        (cliente.morada || "-") +
        "</div>" +

        "<div style='margin-bottom:25px;'>" +
        "👤 <strong>Responsável</strong><br>" +
        (cliente.responsavel || "-") +
        "</div>" +

        "<div style='margin-bottom:25px;'>" +
        "📞 <strong>Contacto 1</strong><br>" +
        (cliente.contacto1 || "-") +
        "</div>" +

        "<div style='margin-bottom:25px;'>" +
        "📞 <strong>Contacto 2</strong><br>" +
        (cliente.contacto2 || "-") +
        "</div>" +

        "<div style='margin-bottom:25px;'>" +
        "✉️ <strong>Email</strong><br>" +
        (cliente.email || "-") +
        "</div>" +

        "<div style='margin-bottom:25px;'>" +
        "📊 <strong>Potencial</strong><br>" +
        (cliente.potencial || "-") +
        "</div>";

   let htmlHistorico = "";

if (cliente.visitas && cliente.visitas.length > 0) {

    cliente.visitas.forEach(function(visita, i) {

        htmlHistorico +=
    "<div style='margin-bottom:20px; padding:10px; border-bottom:1px solid #444;'>" +

    "<div style='display:flex; justify-content:space-between; align-items:center;'>" +

    "<strong style='color:#C9A227;'>" + visita.data + "</strong>" +

    "<span onclick='eliminarVisita(" + indice + "," + i + ")' " +
    "style='cursor:pointer; color:#C9A227; font-size:14px;'>" +
    "🗑" +
    "</span>" +

    "</div>" +

    "<br>" +
    visita.nota +

    "</div>";

    });

} else {

    htmlHistorico =
        "<p style='color:#999;'>Ainda não existem visitas registadas.</p>";

}


document.getElementById("historicoVisitas").innerHTML = htmlHistorico;


document.getElementById("popupFichaCliente").style.display = "flex";

}

function fecharFichaCliente() {

    document.getElementById("popupFichaCliente").style.display = "none";

}

function editarCliente() {

    let cliente = clientes[window.indiceClienteAtual];

    document.getElementById("tituloCliente").innerText = "Editar Cliente";

    document.getElementById("nomeCliente").value = cliente.nome || "";
    document.getElementById("tipoCliente").value = cliente.tipo || "";
    document.getElementById("moradaCompleta").value = cliente.morada || "";
    document.getElementById("responsavelCompras").value = cliente.responsavel || "";
    document.getElementById("contacto1").value = cliente.contacto1 || "";
    document.getElementById("contacto2").value = cliente.contacto2 || "";
    document.getElementById("email").value = cliente.email || "";
    document.getElementById("potencialVendas").value = cliente.potencial || "";

    document.getElementById("segunda").checked =
        cliente.diasVisita && cliente.diasVisita.includes("Segunda");

    document.getElementById("terca").checked =
        cliente.diasVisita && cliente.diasVisita.includes("Terça");

    document.getElementById("quarta").checked =
        cliente.diasVisita && cliente.diasVisita.includes("Quarta");

    document.getElementById("quinta").checked =
        cliente.diasVisita && cliente.diasVisita.includes("Quinta");

    document.getElementById("sexta").checked =
        cliente.diasVisita && cliente.diasVisita.includes("Sexta");

    fecharFichaCliente();

    document.getElementById("popupCliente").style.display = "flex";

}

function guardarCliente() {

    let nome = document.getElementById("nomeCliente").value;
    let tipo = document.getElementById("tipoCliente").value;
    let morada = document.getElementById("moradaCompleta").value;
    let responsavel = document.getElementById("responsavelCompras").value;
    let contacto1 = document.getElementById("contacto1").value;
    let contacto2 = document.getElementById("contacto2").value;
    let email = document.getElementById("email").value;
    let potencial = document.getElementById("potencialVendas").value;

    let diasVisita = [];

    if (document.getElementById("segunda").checked) diasVisita.push("Segunda");
    if (document.getElementById("terca").checked) diasVisita.push("Terça");
    if (document.getElementById("quarta").checked) diasVisita.push("Quarta");
    if (document.getElementById("quinta").checked) diasVisita.push("Quinta");
    if (document.getElementById("sexta").checked) diasVisita.push("Sexta");

    let dadosCliente = {
        nome: nome,
        tipo: tipo,
        morada: morada,
        responsavel: responsavel,
        contacto1: contacto1,
        contacto2: contacto2,
        email: email,
        potencial: potencial,
        diasVisita: diasVisita
    };

    if (
        window.indiceClienteAtual !== undefined &&
        window.indiceClienteAtual !== null &&
        document.getElementById("tituloCliente").innerText === "Editar Cliente"
    ) {

        clientes[window.indiceClienteAtual] = dadosCliente;

    } else {

        clientes.push(dadosCliente);

    }

    localStorage.setItem("clientes", JSON.stringify(clientes));

    location.reload();
}


clientes.forEach(function(cliente, indice) {

    document.getElementById("listaClientes").innerHTML +=

    "<div class='cliente-card' onclick='abrirFichaCliente(" + indice + ")'>" +

        "<h3 style='margin-bottom:20px;'>🍷 " + cliente.nome + "</h3>" +

        "<p style='margin-bottom:10px;'>" + cliente.tipo + "</p>" +

        "<p style='font-size:14px;'>" +
        "<span style='color:white;'>Visita 📅 </span>" +
        "<span style='color:#d4af37;'>" +
        (cliente.diasVisita ? cliente.diasVisita.join(', ') : '-') +
        "</span>" +
        "</p>" +
"</div>" +

    "<button onclick='eliminarCliente(" + indice + ")' style='margin-top:10px; background:#8B0000; color:white; border:none; padding:8px 12px; border-radius:6px; cursor:pointer;'>" +
    "🗑" +
    "</button>" +

    "</div>";

});

document.getElementById("totalClientes").innerText = clientes.length;

if (clientes.length > 0) {

    document.getElementById("semClientes").style.display = "none";

}

carregarClientesHoje();

function guardarVisita() {

    let nota = document.getElementById("notaVisita").value;

    if (nota.trim() === "") {

        alert("Escreve uma observação da visita.");
        return;

    }

    let cliente = clientes[window.indiceClienteAtual];

    if (!cliente.visitas) {

        cliente.visitas = [];

    }

    let hoje = new Date();

    let data =
        hoje.getDate().toString().padStart(2, "0") + "/" +
        (hoje.getMonth() + 1).toString().padStart(2, "0") + "/" +
        hoje.getFullYear();

    cliente.visitas.unshift({
        data: data,
        nota: nota
    });

    localStorage.setItem(
    "clientes",
    JSON.stringify(clientes)
);

document.getElementById("notaVisita").value = "";

fecharFichaCliente();

location.reload();

}

function navegarCliente() {

    if (!window.clienteAtual || !window.clienteAtual.morada) {

        alert("Este cliente não tem morada definida.");
        return;

    }

    let morada = encodeURIComponent(window.clienteAtual.morada);

    window.open(
        "https://www.google.com/maps/search/?api=1&query=" + morada,
        "_blank"
    );

}
function eliminarCliente(indice) {

    let confirmar = confirm(
        "Tem a certeza que pretende eliminar este cliente?"
    );

    if (!confirmar) {
        return;
    }

    clientes.splice(indice, 1);

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    location.reload();

}

function eliminarVisita(indiceCliente, indiceVisita) {

    let confirmar = confirm(
        "Eliminar este registo de visita?"
    );

    if (!confirmar) {
        return;
    }

    clientes[indiceCliente].visitas.splice(
        indiceVisita,
        1
    );

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    abrirFichaCliente(indiceCliente);

}

function carregarClientesHoje() {

    let diasSemana = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado"
    ];

    let hoje = diasSemana[new Date().getDay()];

    let html = "";

    clientes.forEach(function(cliente) {

        if (
            cliente.diasVisita &&
            cliente.diasVisita.includes(hoje)
        ) {

            html +=
    "<div onclick='abrirFichaCliente(" + clientes.indexOf(cliente) + ")' " +
    "style='margin-bottom:15px; padding:12px; background:#1f1f1f; border-radius:8px; cursor:pointer; border-left:4px solid #C9A227;'>" +

    "🍷 <strong>" + cliente.nome + "</strong><br>" +
    "<span style='color:#999;'>" + cliente.tipo + "</span>" +

    "</div>";

        }

    });

    if (html === "") {

        html =
            "<p style='color:#999;'>Não existem clientes planeados para hoje.</p>";

    }

    document.getElementById("clientesHoje").innerHTML = html;

}


function abrirVisita(html) {

    document.getElementById("dadosVisita").innerHTML = html;

    document.getElementById("popupVisita").style.display = "flex";

}

function fecharVisita() {

    document.getElementById("popupVisita").style.display = "none";

}

function carregarPaginaVisitas() {

    let html = "";

    clientes.forEach(function(cliente) {

        if (cliente.visitas) {

            cliente.visitas.forEach(function(visita) {

                html +=
"<div onclick='abrirVisita(\"<strong>🍷 Cliente:</strong> " + cliente.nome + "<br><br><strong>📅 Data:</strong> " + visita.data + "<br><br><strong>📝 Observações:</strong><br>" + visita.nota + "\")' " +
"style='margin-bottom:15px; padding:15px; background:#1f1f1f; border-left:4px solid #C9A227; border-radius:8px; cursor:pointer;'>" +

                "<strong>🍷 " + cliente.nome + "</strong><br>" +

                "<span style='color:#C9A227;'>" +
                visita.data +
                "</span>" +

                "</div>";

            });

        }

    });

    if (html === "") {

        html =
        "<p style='color:#999;'>Ainda não existem visitas registadas.</p>";

    }

    document.getElementById("listaTodasVisitas").innerHTML = html;

}

carregarPaginaVisitas();

function criarZona() {

    let nome = prompt("Nome da Zona:");

    if (!nome) {
        return;
    }

    zonas.push({
        nome: nome
    });

    localStorage.setItem(
        "zonas",
        JSON.stringify(zonas)
    );

    carregarZonas();
}

function carregarZonas() {

    let html = "";

    zonas.forEach(function(zona, indice) {

        html +=

        "<div class='cliente-card' onclick='abrirZona(" + indice + ")'>" +

            "<div style='display:flex; justify-content:space-between; align-items:center;'>" +

                "<div>" +
                    "📍 <strong>" + zona.nome + "</strong>" +
                "</div>" +

                "<div>" +

                    "<span onclick='event.stopPropagation(); editarZona(" + indice + ")' style='cursor:pointer;'>✏️</span>" +

                    "&nbsp;&nbsp;" +

                    "<span onclick='event.stopPropagation(); eliminarZona(" + indice + ")' style='cursor:pointer;'>🗑</span>" +

                "</div>" +

            "</div>" +

        "</div>";

    });

    if (html === "") {

        html =
        "<p style='color:#999;'>Ainda não existem zonas.</p>";

    }

    document.getElementById("listaZonas").innerHTML = html;

}

function eliminarZona(indice) {

    let zona = zonas[indice];

    let confirmar = confirm(
        "Tem a certeza que pretende eliminar a zona '" +
        zona.nome +
        "'?\n\nSerão também eliminadas todas as rotas associadas."
    );

    if (!confirmar) {
        return;
    }

    rotas = rotas.filter(function(rota) {
        return rota.zona !== zona.nome;
    });

    zonas.splice(indice, 1);

    localStorage.setItem(
        "zonas",
        JSON.stringify(zonas)
    );

    localStorage.setItem(
        "rotas",
        JSON.stringify(rotas)
    );

    carregarZonas();

}

carregarZonas();

function abrirZona(indice) {

    window.zonaAtual = zonas[indice];

    document.getElementById("detalheRota").style.display = "none";

    document.getElementById("tituloZona").style.display = "block";

    document.getElementById("listaRotasZona").style.display = "block";

    document.querySelector("#detalheZona button").style.display = "inline-block";

    document.getElementById("listaZonas").style.display = "none";

    document.getElementById("detalheZona").style.display = "block";

    document.getElementById("btnNovaZona").style.display = "none";

    document.getElementById("tituloZona").innerHTML =
        "📍 " + zonaAtual.nome;

    carregarRotasZona();

}

function voltarZonas() {

    document.getElementById("detalheRota").style.display = "none";

    document.getElementById("detalheZona").style.display = "none";

    document.getElementById("listaZonas").style.display = "block";

    document.getElementById("btnNovaZona").style.display = "inline-block";

}

function criarRota() {

    let nome = prompt("Nome da Rota:");

    if (!nome) {
        return;
    }

    rotas.push({
        zona: zonaAtual.nome,
        nome: nome,
        clientes: []
    });

    localStorage.setItem(
        "rotas",
        JSON.stringify(rotas)
    );

    carregarRotasZona();
}

function carregarRotasZona() {

    let html = "";

    rotas.forEach(function(rota, indice) {

        if (rota.zona === zonaAtual.nome) {

            html +=

            "<div class='cliente-card' onclick='abrirRota(" + indice + ")'>" +

                "<div style='display:flex; justify-content:space-between; align-items:center;'>" +

                    "<div>" +
                        "🗺️ <strong>" + rota.nome + "</strong><br>" +
                        "<span style='color:#999;'>" +
                        rota.clientes.length +
                        " clientes</span>" +
                    "</div>" +

                    "<div>" +

                        "<span style='cursor:pointer;'>✏️</span>" +

                        "&nbsp;&nbsp;" +

                        "<span onclick='event.stopPropagation(); eliminarRota(" + indice + ")' style='cursor:pointer;'>🗑</span>" +

                    "</div>" +

                "</div>" +

            "</div>";

        }

    });

    if (html === "") {

        html =
        "<p style='color:#999;'>Ainda não existem rotas.</p>";

    }

    document.getElementById("listaRotasZona").innerHTML = html;

}

function eliminarRota(indice) {

    let rota = rotas[indice];

    let confirmar = confirm(
        "Tem a certeza que pretende eliminar a rota '" +
        rota.nome +
        "'?"
    );

    if (!confirmar) {
        return;
    }

    rotas.splice(indice, 1);

    localStorage.setItem(
        "rotas",
        JSON.stringify(rotas)
    );

    carregarRotasZona();

}

function abrirRota(indice) {

    window.rotaAtual = rotas[indice];

    document.getElementById("tituloZona").style.display = "none";

    document.getElementById("listaRotasZona").style.display = "none";

    document.querySelector("#detalheZona button").style.display = "none";

    document.getElementById("detalheRota").style.display = "block";

    document.getElementById("tituloRota").innerHTML =
        "🗺️ " + rotaAtual.nome;

        carregarClientesRota();

}

function adicionarClienteRota() {

    let html = "";

    clientes.forEach(function(cliente, indice) {

        if (!rotaAtual.clientes.includes(indice)) {

            html +=
                "<div style='margin-bottom:10px;'>" +
                "<input type='checkbox' id='clienteRota" + indice + "'>" +
                " " + cliente.nome +
                "</div>";

        }

    });

    if (html === "") {

        html =
        "<p style='color:#999;'>Todos os clientes já pertencem a esta rota.</p>";

    }

    document.getElementById("listaClientesAdicionar").innerHTML = html;

    document.getElementById("popupAdicionarClientes").style.display = "flex";

}

function fecharPopupAdicionarClientes() {

    document.getElementById("popupAdicionarClientes").style.display = "none";

}

function confirmarAdicionarClientes() {

    // rotaAtual.clientes = [];

    clientes.forEach(function(cliente, indice) {

       let checkbox = document.getElementById("clienteRota" + indice);

if (checkbox && checkbox.checked) {

    if (!rotaAtual.clientes.includes(indice)) {

        rotaAtual.clientes.push(indice);

    }

}

    });

    localStorage.setItem(
        "rotas",
        JSON.stringify(rotas)
    );

    fecharPopupAdicionarClientes();

    carregarClientesRota();

    alert("Clientes adicionados à rota.");

}

function carregarClientesRota() {

    let html = "";

    rotaAtual.clientes.forEach(function(indiceCliente) {

        let cliente = clientes[indiceCliente];

        if (cliente) {

            html +=

                "<div class='cliente-card' " +
"draggable='true' " +
"ondragstart='iniciarArrasto(" + indiceCliente + ")' " +
"ondragover='permitirLargar(event)' " +
"ondrop='largarCliente(" + indiceCliente + ")' " +
"onclick='abrirFichaCliente(" + indiceCliente + ")' " +
"style='cursor:pointer;'>" +

                    "<div style='display:flex; justify-content:space-between; align-items:center;'>" +

                        "<div>" +
    "<span style='font-size:22px; vertical-align:middle;'>☰</span> 🍷 <strong>" + cliente.nome + "</strong>" +
"</div>" +

                        "<div>" +

                            "<span onclick='event.stopPropagation(); eliminarClienteDaRota(" + indiceCliente + ")' style='cursor:pointer; font-size:24px;'>🗑</span>" +

                        "</div>" +

                    "</div>" +

                "</div>";

        }

    });

    if (html === "") {

        html =
        "<p style='color:#999;'>Ainda não existem clientes nesta rota.</p>";

    }

    document.getElementById("listaClientesRota").innerHTML = html;

}

let clienteArrastado = null;

function iniciarArrasto(indiceCliente) {

    clienteArrastado = indiceCliente;

}

function permitirLargar(event) {

    event.preventDefault();

}

function largarCliente(indiceDestino) {

    if (clienteArrastado === indiceDestino) {
        return;
    }

    let origem = rotaAtual.clientes.indexOf(clienteArrastado);
    let destino = rotaAtual.clientes.indexOf(indiceDestino);

    let clienteMovido = rotaAtual.clientes.splice(origem, 1)[0];

    rotaAtual.clientes.splice(destino, 0, clienteMovido);

    localStorage.setItem(
        "rotas",
        JSON.stringify(rotas)
    );

    carregarClientesRota();

}

function eliminarClienteDaRota(indiceCliente) {

    if (!confirm("Remover este cliente da rota?")) {
        return;
    }

    rotaAtual.clientes = rotaAtual.clientes.filter(function(indice) {
        return indice !== indiceCliente;
    });

    localStorage.setItem(
        "rotas",
        JSON.stringify(rotas)
    );

    carregarClientesRota();
    carregarRotasZona();

}

function voltarRotas() {

    document.getElementById("detalheRota").style.display = "none";

    document.getElementById("tituloZona").style.display = "block";

    document.getElementById("listaRotasZona").style.display = "block";

    document.querySelector("#detalheZona button").style.display = "inline-block";

}