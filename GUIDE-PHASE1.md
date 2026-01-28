# Guide Complet - Phase 1 : CI/CD avec GitHub Actions

## 📋 Étape 1 : Créer un compte Docker Hub

1. **Aller sur Docker Hub** : https://hub.docker.com
2. **Cliquer sur "Sign Up"** (en haut à droite)
3. **Remplir le formulaire** :
   - Username : choisis un nom d'utilisateur (ex: `sabrine-moussi`)
   - Email : ton email
   - Password : un mot de passe fort
4. **Vérifier ton email** (cliquer sur le lien dans l'email reçu)
5. **Se connecter** avec tes identifiants

✅ **Note ton username Docker Hub** : tu en auras besoin plus tard

---

## 🔑 Étape 2 : Créer un Access Token Docker Hub

Un token est nécessaire pour que GitHub Actions puisse pousser des images Docker sans utiliser ton mot de passe.

1. **Se connecter à Docker Hub** : https://hub.docker.com
2. **Cliquer sur ton profil** (en haut à droite) → **Account Settings**
3. **Dans le menu de gauche** → **Personal access tokens**
4. **Cliquer sur "New Access Token"**
5. **Remplir le formulaire** :
   - **Description** : `GitHub Actions CI/CD` (ou ce que tu veux)
   - **Permissions** : `Read, Write, Delete` (ou au minimum `Read, Write`)
6. **Cliquer sur "Generate"**
7. **⚠️ IMPORTANT : Copier le token immédiatement** (tu ne pourras plus le voir après)
   - Il ressemble à : `dckr_pat_xxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Sauvegarde-le dans un fichier temporaire** (tu en auras besoin dans 2 minutes)

✅ **Token créé et copié** : garde-le précieusement

---

## 🔐 Étape 3 : Configurer les Secrets GitHub

### 3.1 Aller dans les Settings de ton repository GitHub

1. **Ouvrir ton repository** sur GitHub : `https://github.com/TON_USERNAME/portfolio-sabrine`
2. **Cliquer sur "Settings"** (en haut du repo, à côté de "Code", "Issues", etc.)
3. **Dans le menu de gauche** → **Secrets and variables** → **Actions**

### 3.2 Ajouter le secret DOCKERHUB_USERNAME

1. **Cliquer sur "New repository secret"**
2. **Remplir** :
   - **Name** : `DOCKERHUB_USERNAME` (exactement comme ça, en majuscules)
   - **Secret** : ton username Docker Hub (ex: `sabrine-moussi`)
3. **Cliquer sur "Add secret"**

### 3.3 Ajouter le secret DOCKERHUB_TOKEN

1. **Cliquer à nouveau sur "New repository secret"**
2. **Remplir** :
   - **Name** : `DOCKERHUB_TOKEN` (exactement comme ça, en majuscules)
   - **Secret** : le token que tu as copié à l'étape 2 (ex: `dckr_pat_xxxxxxxxxxxxxxxxxxxxxxxxxx`)
3. **Cliquer sur "Add secret"**

✅ **Vérification** : Tu devrais maintenant voir 2 secrets :
   - `DOCKERHUB_USERNAME`
   - `DOCKERHUB_TOKEN`

---

## 🧪 Étape 4 : Tester le workflow CI localement (optionnel mais recommandé)

Avant de pousser sur GitHub, tu peux tester que tout fonctionne localement avec Docker Desktop.

### 4.1 Tester le build Docker

```bash
# Dans le dossier du projet
cd C:\Users\Sabrine\Desktop\Portfolio-Sabrine\portfolio-sabrine

# Builder l'image Docker
docker build -t portfolio-sabrine:test .

# Si ça fonctionne, tu verras "Successfully built" et "Successfully tagged"
```

### 4.2 Tester l'image localement

```bash
# Lancer le conteneur
docker run -p 8080:80 portfolio-sabrine:test

# Ouvrir http://localhost:8080 dans ton navigateur
# Tu devrais voir ton portfolio
# Appuyer sur Ctrl+C pour arrêter
```

### 4.3 Tester les tests unitaires

```bash
# Lancer les tests
npm test -- --watchAll=false

# Les tests doivent passer (3 tests)
```

✅ **Si tout fonctionne localement**, tu peux passer à l'étape suivante

---

## 🚀 Étape 5 : Pousser le code sur GitHub et déclencher le workflow

### 5.1 Initialiser Git (si pas déjà fait)

```bash
# Dans le dossier du projet
cd C:\Users\Sabrine\Desktop\Portfolio-Sabrine\portfolio-sabrine

# Vérifier si Git est déjà initialisé
git status

# Si erreur "not a git repository", initialiser :
git init
git add .
git commit -m "Initial commit with CI/CD setup"
```

### 5.2 Créer le repository sur GitHub

1. **Aller sur GitHub** : https://github.com
2. **Cliquer sur "+"** (en haut à droite) → **New repository**
3. **Remplir** :
   - **Repository name** : `portfolio-sabrine` (ou autre nom)
   - **Description** : `Portfolio DevOps POC`
   - **Visibility** : Public ou Private (ton choix)
   - **⚠️ NE PAS cocher** "Initialize with README" (tu as déjà des fichiers)
4. **Cliquer sur "Create repository"**

### 5.3 Lier ton repo local à GitHub

```bash
# GitHub te donnera des commandes, mais voici les étapes :

# Ajouter le remote (remplace TON_USERNAME par ton username GitHub)
git remote add origin https://github.com/TON_USERNAME/portfolio-sabrine.git

# Pousser le code
git branch -M main
git push -u origin main
```

### 5.4 Créer une Pull Request pour tester le workflow CI

```bash
# Créer une nouvelle branche
git checkout -b feature/test-ci

# Faire un petit changement (ex: modifier un commentaire)
# Ou simplement créer un fichier test
echo "# Test CI" >> test-ci.txt
git add test-ci.txt
git commit -m "Test CI workflow"
git push origin feature/test-ci
```

### 5.5 Créer la Pull Request sur GitHub

1. **Aller sur ton repository GitHub**
2. **Tu verras une bannière** "feature/test-ci had recent pushes"
3. **Cliquer sur "Compare & pull request"**
4. **Remplir** :
   - **Title** : `Test CI Workflow`
   - **Description** : `Testing GitHub Actions CI pipeline`
5. **Cliquer sur "Create pull request"**

### 5.6 Vérifier que le workflow se déclenche

1. **Dans la Pull Request**, cliquer sur l'onglet **"Checks"** ou **"Actions"**
2. **Tu devrais voir** : "CI - Build, Test & Docker" en cours d'exécution
3. **Cliquer dessus** pour voir les détails
4. **Attendre 2-5 minutes** que le workflow se termine

✅ **Si tout est vert** : le workflow fonctionne ! Tu devrais voir :
   - ✅ Build application
   - ✅ Run unit tests
   - ✅ Build and push Docker image

### 5.7 Vérifier l'image sur Docker Hub

1. **Aller sur Docker Hub** : https://hub.docker.com
2. **Cliquer sur ton profil** → **Repositories**
3. **Tu devrais voir** : `portfolio-sabrine` avec le tag `1.0.0-RC1`

---

## 🎉 Étape 6 : Tester le workflow Release (Phase 2)

### 6.1 Merger la Pull Request

1. **Dans la Pull Request**, cliquer sur **"Merge pull request"**
2. **Confirmer** : "Confirm merge"
3. **Optionnel** : Supprimer la branche après merge

### 6.2 Vérifier le workflow Release

1. **Aller dans l'onglet "Actions"** de ton repository
2. **Tu devrais voir** : "Release Approve - Promote Image" en cours
3. **Attendre qu'il se termine** (1-2 minutes)

✅ **Vérifications** :
   - ✅ Le workflow Release s'est exécuté
   - ✅ Sur Docker Hub, tu as maintenant 2 tags : `1.0.0-RC1` et `1.0.0`
   - ✅ Dans GitHub → Releases, tu as un nouveau tag `v1.0.0`

---

## 🐛 Dépannage

### Le workflow ne se déclenche pas

**Vérifier** :
- ✅ Les fichiers `.github/workflows/ci.yml` et `release-approve.yml` sont bien dans le repo
- ✅ La branche s'appelle bien `main` (pas `master`)
- ✅ Les secrets GitHub sont bien configurés

### Erreur "authentication required" lors du push Docker

**Solution** :
- ✅ Vérifier que `DOCKERHUB_USERNAME` et `DOCKERHUB_TOKEN` sont bien configurés
- ✅ Vérifier que le token a les permissions `Read, Write`
- ✅ Vérifier l'orthographe exacte des noms de secrets (majuscules/minuscules)

### Les tests échouent

**Solution** :
```bash
# Tester localement
npm test -- --watchAll=false

# Si erreur, vérifier que les tests sont bien écrits dans App.test.tsx
```

### L'image ne se build pas

**Solution** :
```bash
# Tester localement
docker build -t test .

# Vérifier les erreurs dans la sortie
```

### Le workflow Release ne se déclenche pas au merge

**Vérifier** :
- ✅ Le workflow `release-approve.yml` est bien dans `.github/workflows/`
- ✅ La condition `if: github.event.pull_request.merged == true` est correcte
- ✅ La PR a bien été mergée (pas juste fermée)

---

## ✅ Checklist de Validation Phase 1 & 2

- [ ] Compte Docker Hub créé
- [ ] Token Docker Hub créé et sauvegardé
- [ ] Secrets GitHub configurés (`DOCKERHUB_USERNAME` et `DOCKERHUB_TOKEN`)
- [ ] Code poussé sur GitHub
- [ ] Pull Request créée
- [ ] Workflow CI déclenché et réussi
- [ ] Image `1.0.0-RC1` visible sur Docker Hub
- [ ] PR mergée
- [ ] Workflow Release déclenché et réussi
- [ ] Image `1.0.0` visible sur Docker Hub
- [ ] Tag Git `v1.0.0` créé

---

## 📝 Notes Importantes

1. **Docker Desktop** : Tu n'as pas besoin de Docker Desktop pour que GitHub Actions fonctionne. GitHub Actions utilise ses propres runners avec Docker pré-installé.

2. **Secrets GitHub** : Les secrets sont **cachés** et ne peuvent jamais être vus après création (même par toi). Si tu perds le token Docker Hub, tu devras en créer un nouveau.

3. **Coûts** : GitHub Actions est **gratuit** pour les repos publics. Pour les repos privés, tu as 2000 minutes/mois gratuites.

4. **Tags Docker** : Les images sont stockées sur Docker Hub. Tu peux les voir et les télécharger depuis n'importe où.

---

## 🎯 Prochaines Étapes

Une fois la Phase 1 validée, tu peux passer à :
- **Phase 3** : Infrastructure AWS avec Terraform
- **Phase 4** : GitOps avec Argo CD

Consulte `SETUP-GUIDE.md` pour la suite !

