# 📝 Application Notes & To-Dos avec InstantDB

Une application moderne de gestion de tâches et de notes, construite avec React et InstantDB.

## ✨ Fonctionnalités

- 🔐 **Authentification** : Connexion sécurisée avec Magic Link (sans mot de passe)
- ✅ **To-Dos du jour** : Créez et gérez vos tâches quotidiennes
- 📅 **Notes futures** : Enregistrez des notes pour les jours à venir
- 🎨 **Interface moderne** : Design élégant et responsive
- ⚡ **Temps réel** : Synchronisation automatique grâce à InstantDB

## 🚀 Installation

1. **Installer les dépendances** :
```bash
npm install
```

2. **Lancer l'application en mode développement** :
```bash
npm run dev
```

3. **Ouvrir votre navigateur** :
Allez sur `http://localhost:5173`

## 🔧 Configuration

L'application est déjà configurée avec votre App ID InstantDB : `56f7fe93-ee76-40ff-82f1-244c53b59444`

Pour modifier la configuration, éditez le fichier `src/db.js`.

## 📦 Technologies utilisées

- **React** : Framework JavaScript pour l'interface utilisateur
- **InstantDB** : Base de données en temps réel avec authentification intégrée
- **Vite** : Bundler ultra-rapide pour le développement
- **CSS moderne** : Styles personnalisés avec gradients et animations

## 🎯 Utilisation

### Connexion
1. Entrez votre adresse email
2. Cliquez sur "Envoyer le lien de connexion"
3. Vérifiez votre boîte mail et cliquez sur le lien Magic Link
4. Vous serez automatiquement connecté !

### To-Dos
- Ajoutez des tâches dans le champ de saisie
- Cochez les tâches terminées
- Supprimez les tâches avec le bouton 🗑️

### Notes
- Écrivez votre note dans la zone de texte
- Sélectionnez la date future pour laquelle vous voulez enregistrer la note
- Cliquez sur "Enregistrer la note"
- Vos notes sont automatiquement triées par date

## 📄 Structure du projet

```
├── src/
│   ├── components/
│   │   ├── AuthPage.jsx       # Page d'authentification
│   │   ├── MainApp.jsx         # Application principale
│   │   ├── TodoSection.jsx     # Section des to-dos
│   │   └── NotesSection.jsx    # Section des notes
│   ├── db.js                   # Configuration InstantDB
│   ├── App.jsx                 # Composant racine
│   ├── main.jsx               # Point d'entrée
│   └── index.css              # Styles globaux
├── index.html
├── package.json
└── vite.config.js
```

## 🌐 Déploiement

Pour construire l'application pour la production :

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

## 📚 Documentation InstantDB

Pour en savoir plus sur InstantDB : [https://www.instantdb.com/docs](https://www.instantdb.com/docs)

## 💡 Aide

Si vous rencontrez des problèmes :
1. Vérifiez que toutes les dépendances sont installées
2. Assurez-vous que votre App ID InstantDB est correct
3. Consultez la console du navigateur pour les erreurs

Bon codage ! 🎉

