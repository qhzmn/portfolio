[English 🇬🇧](README.md)

# My portfolio, GitHub project

This project is a showcase website developed in HTML, CSS, and JavaScript that presents my public GitHub projects and the skills I have acquired.  
This project consists of two parts:

- **Part 1** : a JavaScript script for local use, which retrieves a user's list of GitHub repositories and stores their information in a JSON file.
- **Part 2** : a web interface that uses this JSON file to display project details and allow users to view each project's README file.

---

## Part 1 — Project recovery script

### ✨ Functionalities

- Retrieves a user's GitHub repositories via the GitHub API.
- Retrieves detailed information about each deposit.
- Updates a local JSON file, asking the user if they want to replace existing projects (to preserve any manual changes).
- Allows you to associate categories with projects.

### ⚙️ Installation and use

1. Clone this repository :

```bash
git clone https://github.com/your_username/your-repo.git
cd your-repo
```

2. Install dependencies. Node allows you to run a JavaScript script directly from a command prompt.

```bash
node install
```

3. Edit & run the JavaScript script
Edit the script `update_projects_example.js/` to enter your GitHub token and username.

4. Run the script
```bash
cd path-to-script
node update_projects.js
```
5. Follow the instructions in the console to:
- Choose to replace or ignore existing projects.
- Associate categories with projects.
- The `projects.json/` file will be updated in the `json//` folder.

---

## Part 2 — Showcase website

### ✨ Functionalities
- Displays projects with name, description, and primary language.
- Direct link to each project on GitHub.
- Displays each project's README in a modal window without reloading the page.
- Simple navigation with navbar and footer.

### ⚙️ Installation and deployment

1. Clone or download the repository.
2. Open `index.html` locally via a server (e.g. VSCode's Live Server extension) to avoid CORS errors.
3. Deploy to GitHub Pages or any other static site host.

---

### 💬 Important notes

- The GitHub API limits the number of requests per hour.
- To avoid 403 errors (limit exceeded), it is advisable to use a GitHub token in API calls.
- Never expose a private token on a public website without a secure backend.
  
That's why I divided the site into two parts:
1. a local part that uses the GitHub token to retrieve and update data,
2. an online part that only uses the generated JSON file, without exposing the token.

---

### 🛠️ Technologies used

- HTML5, CSS3 (Flexbox, transitions)
- JavaScript (fetch API, manipulation DOM)
- API REST GitHub (https://docs.github.com/en/rest)

---

### 🔩 Possible improvements

- Project pagination.
- Local caching (localStorage).
- Search bar by project name.

---

### 🪪 Licence

This project is licensed under the MIT licence — see the [LICENSE](LICENSE) file for more details.

---

### 📧 Contact

If you have any questions or suggestions, please contact me via [mon profil GitHub](https://github.com/qhzmn).
