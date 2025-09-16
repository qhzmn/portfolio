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

        const headerFooter = Promise.all([
            includeHTML("header", "navbar.html"),
            includeHTML("footer", "footer.html")
        ]);
        await headerFooter;
        await Promise.all([
            loadCSS("assets/css/navbar.css"),
            loadCSS("assets/css/footer.css"),
            loadCSS("assets/css/section.css"),
        ]);
        // Charger le JS de la navbar (après que le HTML soit injecté)
        await Promise.all([
            loadScript("assets/js/navbar.js"),
            loadScript("assets/js/language.js"),
        ]);
        
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
        

        
        

        // Forcer le mode clair après chargement
        //forceLightMode();

    } catch (error) {
        console.error("Erreur lors du chargement :", error);
    }
}

// Fonction pour forcer le mode clair
function forceLightMode() {
    // Appliquer styles en mode clair
    document.documentElement.style.backgroundColor = 'white';
    document.documentElement.style.color = 'black';

    // Supprimer la classe 'dark' si elle est appliquée
    document.documentElement.classList.remove('dark');
    
    // Optionnel: Surveiller les changements de préférences système et réinitialiser
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        document.documentElement.style.backgroundColor = 'white';
        document.documentElement.style.color = 'black';
        document.documentElement.classList.remove('dark');
    });
}

// Lancer l'initialisation
initializePage();
