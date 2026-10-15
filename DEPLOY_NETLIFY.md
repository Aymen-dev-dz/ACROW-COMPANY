# Guide de Déploiement Netlify — ACROW DZ

Le site **ACROW DZ** est prêt à être déployé sur **Netlify**.

---

## 🚀 Méthode 1 : Déploiement Direct par Glisser-Déposer (Le plus rapide — 30 secondes)

1. Connectez-vous à votre compte sur [app.netlify.com](https://app.netlify.com/).
2. Rendez-vous sur la page **Sites** puis descendez jusqu'à la section **« Want to deploy a new site without connecting to Git? Drag and drop your site output folder here »** (ou accédez directement à [app.netlify.com/drop](https://app.netlify.com/drop)).
3. Glissez-déposez l'intégralité du dossier du projet :
   ```
   C:\Users\a.stock\Desktop\COMPANY ACROW
   ```
4. Netlify déploie le site instantanément et vous attribue une URL SSL sécurisée en `https://[nom-aleatoire].netlify.app`.
5. Dans les paramètres du site (*Site configuration* > *Domain management*), vous pouvez personnaliser le nom (ex : `acrow-dz.netlify.app`) ou brancher votre nom de domaine officiel (ex : `acrow.co` ou `acrow-dz.com`).

---

## 🔄 Méthode 2 : Déploiement Continu via GitHub (Recommandé pour production)

Si vous souhaitez que chaque mise à jour soit déployée automatiquement :

1. Initialisez le dépôt Git localement (le fichier `.gitignore` est déjà configuré) :
   ```bash
   git init
   git add .
   git commit -m "Site officiel ACROW DZ prêt pour production"
   ```
2. Créez un nouveau dépôt sur votre compte GitHub (ex: `acrow-dz-website`).
3. Liez et envoyez le code :
   ```bash
   git remote add origin https://github.com/VOTRE_COMPTE/acrow-dz-website.git
   git branch -M main
   git push -u origin main
   ```
4. Sur Netlify : cliquez sur **« Add new site »** > **« Import an existing project »** > **GitHub** et sélectionnez votre dépôt.
5. Les paramètres de build sont déjà configurés dans `netlify.toml` :
   - **Publish directory** : `.` (racine)
   - **Build command** : *(laisser vide)*
6. Cliquez sur **Deploy site**.

---

## ⚙️ Fichiers de configuration inclus & préparés

| Fichier | Rôle |
|---|---|
| **`netlify.toml`** | Configuration principale : en-têtes de sécurité (X-Frame-Options, CSP, HTTPS), règles de cache CDN pour les PDF (1 an) et streaming vidéo MP4 avec *Accept-Ranges*. |
| **`_redirects`** | Redirections d'URL propres (`/devis` vers `/devis.html`, `/accueil` vers `/index.html`, et `/*` vers `/404.html`). |
| **`404.html`** | Page d'erreur personnalisée aux couleurs officielles ACROW DZ (Bleu Corporate & Rouge BTP) avec lien retour et contact d'urgence. |
| **`.gitignore`** | Exclut automatiquement les masters vidéo bruts (> 100 Mo) pour respecter strictement les quotas GitHub et Netlify. |
| **`cosider.mp4`** | Vidéo de fond réencodée à **39 Mo** en Full HD 1080p avec métadonnées `+faststart` pour un chargement instantané sans buffering sur le CDN mondial Netlify. |
