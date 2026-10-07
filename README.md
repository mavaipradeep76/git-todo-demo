# To-Do App: Git + GitHub + CI/CD (Windows guide)

## 1. Project kya karta hai?
Task add, complete/uncomplete aur delete. Browser localStorage mein tasks save.
Backend/database/login nahi hai; doosre browser/device par tasks sync nahi honge.
GitHub repository code rakhta hai. GitHub Pages website host karta hai.

Flow: code edit -> git commit -> git push -> GitHub Actions checks/tests/build -> GitHub Pages deploy.
CI = Continuous Integration: har main push aur main-targeted pull request par checks/tests/build.
CD = Continuous Deployment: main branch ke successful CI ke baad automatic deployment.

## 2. Install
- Git: https://git-scm.com/downloads/win (default options are fine).
- Node.js 24 LTS: https://nodejs.org/
- VS Code: https://code.visualstudio.com/
- GitHub account: https://github.com/
Install ke baad VS Code restart karein. Terminal > New Terminal (PowerShell):

```powershell
git --version
node --version
npm --version
```

PowerShell mein npm.ps1 blocked ho to `npm.cmd` use karein, jaise `npm.cmd test`.

## 3. Extract and open
ZIP ko Extract All karein. Project folder ko `D:\git-todo-demo` par rakhein.
VS Code > File > Open Folder > D:\git-todo-demo.
Is folder mein package.json aur site folder dikhna chahiye.
Hidden `.github/workflows/deploy.yml` bhi project ka hissa hai; ise omit na karein.

```powershell
cd D:\git-todo-demo
npm run check
npm test
npm run build
```

No npm dependencies: npm install ki zarurat nahi hai.
Expected: 4 passing tests, aur dist folder create.

## 4. Local GUI
VS Code Extensions mein `Live Server` by Ritwick Dey install karein.
`site/index.html` par right-click > Open with Live Server.
Browser mein task add karein, checkbox click karein, refresh karein, Delete click karein.
HTML ko file:// se double-click karke na chalayein: ES modules ko HTTP server chahiye.

## 5. Git identity and first commit
Apna actual name aur GitHub email use karein:

```powershell
git config --global user.name "Pradeep Singh"
git config --global user.email "YOUR_GITHUB_EMAIL"
git init
git branch -M main
git status
git add .
git commit -m "Add todo app with tests and CI/CD"
git log --oneline
```

git init = local repository; git add = changes stage; git commit = local snapshot.
git push = commits GitHub bhejna. Commit apne aap online upload nahi hota.
dist ignored hai: Actions build karega, generated dist ko Git mein nahi rakhna.

## 6. Empty GitHub repository
GitHub > + > New repository.
Name: `git-todo-demo`; Visibility: Public.
README, .gitignore, license initialize NA karein: project mein files already hain.
Create repository click karein.
Repository ka HTTPS URL copy karein; YOUR_USERNAME ko actual username se replace karein:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/git-todo-demo.git
git remote -v
```

## 7. Pages configure BEFORE first push
Repository > Settings > Pages > Build and deployment > Source > GitHub Actions.
Workflow file project mein already hai; website par suggested workflow add karna zaroori nahi.
Settings > Actions > General mein Actions disabled ho to enable karein.
Organization policy ho to admin ki settings bhi workflow allow karni chahiye.

## 8. Push and deploy

```powershell
git push -u origin main
```

First push par browser sign-in aaye to apne GitHub account se authenticate karein.
GitHub password terminal mein use na karein; browser sign-in preferred hai.
GitHub repository > Actions > Test and Deploy > latest run.
`ci` aur `deploy` green hone ka wait karein. CI fail ho to deploy nahi chalega.
Settings > Pages mein website URL milega, normally:
https://YOUR_USERNAME.github.io/git-todo-demo/
Workflow deploy job ka environment link bhi actual URL dikhata hai.
Repository URL aur website URL alag hain.

## 9. Automatic update demo
site/index.html mein `My To-Do App` ko `Pradeep's To-Do App` kar dein, save:

```powershell
git diff
git add site/index.html
git commit -m "Personalize app title"
git push
```

Actions automatically chalega aur successful run par live website update hogi.
Update na dikhe to run status dekhein aur browser Ctrl+F5 karein.

## 10. Branch and pull request practice

```powershell
git switch -c feature/new-heading
```

site/index.html mein subtitle badlein, save:

```powershell
git add site/index.html
git commit -m "Update subtitle"
git push -u origin feature/new-heading
```

GitHub > Compare & pull request > base main > Create pull request.
PR par CI chalega; website deploy nahi hogi.
Checks pass hone ke baad Merge pull request > Confirm merge.
Main par merge hone se CI aur deployment phir chalega.
Local main update:

```powershell
git switch main
git pull origin main
```

## 11. CI failure demo
Temporary tests/tasks.test.js mein blank test ka expected regex `/empty/` se `/different/` karein.
`npm test` fail hoga. Test wapas `/empty/` karein, npm test pass hoga.
Failing branch ko PR par push karein to red CI dekhenge; main deploy nahi hoga.
Fix push karte hi CI dobara chalega.
Main ko protect karne ke liye available repository rules/branch protection mein PR aur ci required checks configure kar sakte hain. Workflow alone direct main pushes ko block nahi karta.

## 12. Files
- site/index.html: page structure
- site/style.css: design
- site/tasks.js: testable task operations
- site/app.js: browser UI + localStorage
- tests/tasks.test.js: 4 behavior tests
- build.js: site ko clean dist folder mein copy
- package.json: npm commands
- .github/workflows/deploy.yml: CI/CD
- .gitignore: generated files/secrets ignore

## 13. Common errors
- npm not recognized: Node install, VS Code restart.
- git not recognized: Git install, VS Code restart.
- npm.ps1 blocked: npm.cmd use.
- remote origin already exists: `git remote set-url origin https://github.com/YOUR_USERNAME/git-todo-demo.git`.
- src refspec main does not match: pehle git add/commit; git branch -M main.
- repository not found: URL, username, repository name aur signed-in account check.
- rejected/non-fast-forward: remote par README initialize kiya ho sakta hai. Existing work delete/force push na karein; `git pull --rebase origin main`, conflicts resolve karke push.
- Pages configure/deploy fail: Settings > Pages > Source GitHub Actions, repository Public, Actions enabled, actual logs check.
- 404: deploy green hai? Actual Settings > Pages URL kholein, repository path included ho.

## 14. Interview explanation
"I built a JavaScript To-Do app, tracked changes with Git and used GitHub pull requests. GitHub Actions runs syntax checks, unit tests and a static build. After successful CI on main, a dependent deployment job publishes the artifact to GitHub Pages. Pull requests run CI without deploying."

Official reference:
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
