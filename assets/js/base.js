function loadCSS(url) {
    return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
    });
}

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

function includeHTML(id, url) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

async function initializePage() {
    try {
        // Charger les CSS
        await loadCSS("assets/css/navbar.css");
        await loadCSS("assets/css/footer.css");

        // Inclure le HTML du header et footer
        await includeHTML("header", "navbar.html");
        await includeHTML("footer", "footer.html");

        // Charger le JS de la navbar (après que le HTML soit injecté)
        await loadScript("assets/js/navbar.js");

    } catch (error) {
        console.error("Erreur lors du chargement :", error);
    }
}

// Lancer l'initialisation
initializePage();
