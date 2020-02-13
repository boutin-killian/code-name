# Lwar

Une appli comme Amazon mais c'est Lwar (pour la photo, la video, la musique)

# Init
- git clone
- npm i
- npm start
- nodemon server

# Lancer l'appli 
Il faut lancer la commande npm start et nodemon server.js (server.js doit bien être sur le port 3002)

# Identifiant de base
Il existe un compte ayant pour email root et mot de passe root. Il est également possible de créer de nouveau compte.

# Fonctionnalité
- En tant que visiteur : 
Possibilité de se connecter (root/root) ou de s'inscrire)
Affichage des articles, tous en même temps sur la page article ou pour chaque catégorie dans leur page respective (videos, photos, musiques, livres).
Effectuer une recherche sur le titre sur chacune des pages.
Ajouter des articles dans son caddie puis le valider ou de bien supprimer les articles de celui-ci.

- En tant que personne connectée :
Ajouter de nouveaux articles en utilisant un formulaire.
Voir son profil avec les différents articles ajouté par l'utilisateur et le nombre d'article vendus / nombre d'article restant en stock.

Les endpoints sont accessibles via le serveur sur localhost:3002 => /users, /articles, /articles?user=<user_id>, articles/:type etc...
