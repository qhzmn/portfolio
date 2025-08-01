const https = require('https');
const fs = require('fs');
const readline = require('readline');

const username = '';
const token = '';

const outputFile = '../json/projects.json';

function fetchGithubRepos(user) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${user}/repos`,
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js',
        'Authorization': `token ${token}`
      }
    };

    https.get(options, (res) => {
      let data = '';

      if (res.statusCode !== 200) {
        reject(new Error(`Erreur API GitHub : ${res.statusCode}`));
        return;
      }

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const repos = JSON.parse(data);
          resolve(repos);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

function fetchRepoLanguages(owner, repoName) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repoName}/languages`,
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js',
        'Authorization': `token ${token}`
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const langData = JSON.parse(data);
          const languages = Object.keys(langData);
          resolve(languages);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

function askReplace(rl, id) {
  return new Promise(resolve => {
    rl.question(`Le projet "${id}" existe déjà. Voulez-vous le remplacer ? (o/n) : `, (answer) => {
      resolve(answer.trim().toLowerCase() === 'o');
    });
  });
}

function askCategoryForIds(rl, allProjects) {
  return new Promise((resolve) => {
    const categories = { web: [], methode: [], reseaux: [], dev: [] };

    console.log("\nVoici les projets :");
    allProjects.forEach((proj, index) => {
      console.log(`${index + 1}. ${proj.name}`);
    });

    const askNextCategory = (keys, i = 0) => {
      if (i >= keys.length) {
        resolve(categories);
        return;
      }

      const cat = keys[i];
      rl.question(`Quels numéros associer à la catégorie "${cat}" ? (ex: 1,3,5) : `, (answer) => {
        const indexes = answer.split(',').map(s => parseInt(s.trim(), 10) - 1).filter(i => !isNaN(i) && i >= 0 && i < allProjects.length);
        categories[cat] = indexes.map(i => allProjects[i].id);
        askNextCategory(keys, i + 1);
      });
    };

    askNextCategory(Object.keys(categories));
  });
}

async function main() {
  try {
    const repos = await fetchGithubRepos(username);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Charger le fichier s'il existe
    let existingData = { projects: [], categories: {} };

if (!fs.existsSync(outputFile)) {
  // Si le fichier n'existe pas, on l'initialise vide
  fs.writeFileSync(outputFile, JSON.stringify(existingData, null, 2), 'utf-8');
} else {
  const raw = fs.readFileSync(outputFile, 'utf-8').trim();
  if (raw.length > 0) {
    existingData = JSON.parse(raw);
  }
}



    const updatedProjects = [...existingData.projects];

    for (const repo of repos) {
      const id = repo.name;
      const indexInExisting = updatedProjects.findIndex(p => p.id === id);

      let shouldReplace = true;
      if (indexInExisting !== -1) {
        shouldReplace = await askReplace(rl, id);
        if (!shouldReplace) continue;
      }

      const name = repo.name;
      const description = repo.description || '';
      const languages = await fetchRepoLanguages(username, repo.name);
      const url = repo.html_url;
      const readme = repo.name;

      const newProject = { id, name, description, languages, url, readme };

      if (indexInExisting !== -1) {
        updatedProjects[indexInExisting] = newProject;
      } else {
        updatedProjects.push(newProject);
      }
    }

    // 2e étape : catégorisation
    const categories = await askCategoryForIds(rl, updatedProjects);

    rl.close();

    // Sauvegarde
    const finalJSON = {
      projects: updatedProjects,
      categories
    };

    fs.writeFileSync(outputFile, JSON.stringify(finalJSON, null, 2), 'utf-8');
    console.log(`\nFichier ${outputFile} mis à jour avec succès !`);

  } catch (error) {
    console.error('Erreur :', error.message);
  }
}

main();
