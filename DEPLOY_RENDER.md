# Guide de Déploiement sur Render.com — ACROW DZ

Le site **ACROW DZ** est entièrement configuré pour être déployé gratuitement sur **Render.com**.

---

## 📋 Prérequis : Pousser votre code sur GitHub (1 minute)

Render déploie directement vos projets connectés à GitHub :

1. Ouvrez un terminal dans le dossier du projet (`C:\Users\a.stock\Desktop\COMPANY ACROW`) et exécutez :
   ```bash
   git add .
   git commit -m "Déploiement ACROW DZ sur Render"
   ```
2. Créez un nouveau dépôt sur votre compte GitHub (nommez-le par exemple `acrow-dz`).
3. Reliez et envoyez le code :
   ```bash
   git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/acrow-dz.git
   git branch -M main
   git push -u origin main
   ```

---

## 🚀 Déploiement sur Render en 3 Clics

### Option A : Déploiement "Static Site" (Le plus simple)
1. Rendez-vous sur votre tableau de bord [dashboard.render.com](https://dashboard.render.com).
2. Cliquez sur le bouton bleu **« New + »** en haut à droite, puis sélectionnez **« Static Site »**.
3. Choisissez votre dépôt GitHub **`acrow-dz`** (ou collez son URL).
4. Configurez les 3 paramètres suivants :
   - **Name** : `acrow-dz` *(ou le nom de votre choix)*
   - **Build Command** : *(laisser vide)*
   - **Publish Directory** : `.` *(un simple point pour désigner la racine)*
5. Cliquez sur le bouton bleu en bas : **« Create Static Site »**.

---

### Option B : Déploiement Automatique via Blueprint (`render.yaml`)
1. Sur Render, cliquez sur **« New + »** $\rightarrow$ **« Blueprint »**.
2. Connectez votre dépôt GitHub.
3. Render détecte automatiquement notre fichier **[`render.yaml`](./render.yaml)** et configure instantanément :
   - Le site statique avec son répertoire racine `.`.
   - Les redirections propres d'URL (`/devis` vers `devis.html`).
   - Les en-têtes de sécurité HTTP stricts (`X-Frame-Options`, `nosniff`).
   - Le cache CDN longue durée pour les 20 catalogues PDF et images.
   - Le support de streaming vidéo pour le fond Hero.
4. Cliquez sur **« Apply »**.

---

## ✨ Résultat Immédiat
En moins d'une minute, Render déploie votre site et vous attribue une adresse sécurisée mondiale en HTTPS :
`https://acrow-dz.onrender.com`

Vous pourrez également y brancher gratuitement votre nom de domaine personnalisé officiel (ex: `acrow-dz.com` ou `acrow.co`) dans la section **Settings > Custom Domains**.
