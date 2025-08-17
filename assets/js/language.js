// Fonction pour récupérer la langue
function getLang() {
    return localStorage.getItem('mainLanguage') || 'fr';
}

// Fonction pour charger le fichier JSON de la langue
async function loadTranslations(lang) {
    try {
        const response = await fetch(`assets/json/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Le fichier de traduction pour ${lang} n'a pas pu être chargé.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
        return {};
    }
}

// Fonction pour mettre à jour le contenu HTML
function updateContent(translations) {
    for (const sectionKey in translations) {
        if (translations.hasOwnProperty(sectionKey)) {
            const sectionTranslations = translations[sectionKey];
            if (!sectionTranslations) {
                console.error("No translations found for the 'index' key.");
                return;
            }
            const elements = document.querySelectorAll('[data-i18n]');
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                const value = key.split('.').reduce((obj, part) => obj ? obj[part] : null, sectionTranslations);

                if (value) {
                    element.innerHTML = value;                }
            });
        }
    }
}

// Fonction d'initialisation principale
async function initPage() {
    const lang = getLang();
    if (lang=='en'){
        boutonEn.classList.add("active");
        boutonFr.classList.remove("active");
    }
    else{
        boutonFr.classList.add("active");
        boutonEn.classList.remove("active");
    }
    const translations = await loadTranslations(lang);

    updateContent(translations);
}

// Sélection des boutons
const boutonFr = document.getElementById('lang-fr');
const boutonEn = document.getElementById('lang-en');

// Ajout des écouteurs d'événements
if (boutonFr) {
    boutonFr.addEventListener('click', async () => {
    localStorage.setItem('mainLanguage', 'fr');
    window.dispatchEvent(new CustomEvent('languageChange', { detail: 'fr' }));
    await initPage();
});

}
if (boutonEn) {
    boutonEn.addEventListener('click', async () => {
    localStorage.setItem('mainLanguage', 'en');
    window.dispatchEvent(new CustomEvent('languageChange', { detail: 'en' }));
    await initPage();
});

}

// Lancement de l'initialisation au chargement de la page
initPage();