[English 🇬🇧](README.md)

# Site Vitrine Projets GitHub

Ce projet est un site web vitrine développé en HTML, CSS et JavaScript qui présente mes projets publics GitHub ainsi que mes compétences acquises.  
Le site se compose de deux parties :

- **Partie 1** : un script JavaScript à utiliser en local, qui récupère la liste des dépôts GitHub d’un utilisateur et stocke leurs informations dans un fichier JSON.
- **Partie 2** : une interface web qui utilise ce fichier JSON pour afficher les détails des projets et permettre la consultation du README de chaque projet.

---

## Partie 1 — Script de récupération des projets

### ✨ Fonctionnalités

- Récupère les dépôts GitHub d’un utilisateur via l’API GitHub.
- Récupère les informations détaillées de chaque dépôt.
- Met à jour un fichier JSON local, en demandant à l’utilisateur s’il souhaite remplacer les projets existants (pour préserver d’éventuelles modifications manuelles).
- Permet d’associer des catégories aux projets.

### ⚙️ Installation et utilisation

1. Cloner ce dépôt :

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Installer les dépendances, node permet d'exécuter un script JavaScript directement depuis un invite de commandes

```bash
node install
```

3. Modifier & exécuter le script JavaScript
Modifier le script `update_projects_example.js/` pour renseigner ton token GitHub et ton nom d’utilisateur.

4. Exécuter le script
```bash
cd path-to-script
node update_projects.js
```
5. Suivre les instructions dans la console pour :
- Choisir de remplacer ou ignorer les projets déjà existants.
- Associer des catégories aux projets.
Le fichier `projects.json/` sera mis à jour dans le dossier `json//`.

---

## Partie 2 — Site web vitrine

### ✨ Fonctionnalités
- Affiche les projets avec nom, description et langage principal.
- Lien direct vers chaque projet sur GitHub.
- Affichage du README de chaque projet dans une fenêtre modale sans recharger la page.
- Navigation simple avec navbar et footer.

### ⚙️ Installation et déploiement

1. Cloner ou télécharger le dépôt.
2. Ouvrir `index.html` localement via un serveur (ex. extension Live Server de VSCode) pour éviter les erreurs CORS.
3. Déployer sur GitHub Pages ou tout autre hébergeur de sites statiques.

---

### 💬 Remarques importantes

- L’API GitHub limite le nombre de requêtes par heure.
- Pour éviter les erreurs 403 (limite dépassée), il est conseillé d’utiliser un token GitHub dans les appels API.
- Ne jamais exposer un token privé dans un site public sans backend sécurisé.
  
C’est pour cette raison que j’ai divisé le site en deux parties :
1. une partie locale qui utilise le token GitHub pour récupérer et mettre à jour les données,
2. une partie en ligne qui utilise uniquement le fichier JSON généré, sans exposer le token.

---

### 🛠️ Technologies utilisées

- HTML5, CSS3 (Flexbox, transitions)
- JavaScript (fetch API, manipulation DOM)
- API REST GitHub (https://docs.github.com/en/rest)

---

### 🔩 Améliorations possibles

- Pagination des projets.
- Mise en cache locale (localStorage).
- Barre de recherche par nom de projet.

---

### 🪪 Licence

Ce projet est sous licence MIT — voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

### 📧 Contact

Pour toute question ou suggestion, contactez-moi via [mon profil GitHub](https://github.com/qhzmn).

