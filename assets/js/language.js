// Function to retrieve the language
function getLang() {
    if (localStorage.getItem('mainLanguage')){
        return(localStorage.getItem('mainLanguage'))
    }
    return navigator.language || 'en';
}

// Function to load the JSON file for the langueag
async function loadTranslations(lang) {
    try {
        const response = await fetch(`assets/json/${lang}.json`);
        if (!response.ok) {
            throw new Error(`The file for ${lang} could not be loaded.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error loading translations :", error);
        return {};
    }
}

// Function to update HTML content
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
                    element.innerHTML = value;
                }
            });
        }
    }
}

// Fonction main
async function initPage() {
    console.log("execution init page");
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


// Select boutons
const boutonFr = document.getElementById('lang-fr');
const boutonEn = document.getElementById('lang-en');

// Add events
if (boutonFr) {
    boutonFr.addEventListener('click', async () => {
    localStorage.setItem('mainLanguage', 'fr');
    window.dispatchEvent(new CustomEvent('languageChange', { detail: 'fr' }));
    initPage();
    });
}
if (boutonEn) {
    boutonEn.addEventListener('click', async () => {
    localStorage.setItem('mainLanguage', 'en');
    window.dispatchEvent(new CustomEvent('languageChange', { detail: 'en' }));
    initPage();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initPage();
});