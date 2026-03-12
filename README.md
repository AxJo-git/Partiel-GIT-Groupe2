# taskmanagement
Examen Git groupe 2 : Justine DOUANLA, Axel JOSSE, Alexis PHAM, Théo TESSIER

## Préparation du projet
Création du repo par Axel JOSSE
Url du repo github : https://github.com/AxJo-git/Partiel-GIT-Groupe2

## Début
Lancement du projet avec les infos données dans la documentation du projet
Axel JOSSE : tests API Jest
Justine DOUANLA : Eslint
Théo TESSIER : Selenium

## Justine DOUANLA
**Initialisation ESlint :**
- La configuration de ESLint a été générée avec la commande npm init @eslint/config@latest.
- Le projet a été configuré pour analyser du JavaScript.
- ESLint a été paramétré pour détecter les problèmes dans le code.
- Le système de modules choisi est CommonJS.
- Aucun framework n’a été sélectionné.
- Le projet n’utilise pas TypeScript.
- L’environnement d’exécution défini est le navigateur.
- Les dépendances nécessaires ont été installées automatiquement : eslint, @eslint/js et globals.
- Cette étape a créé le fichier de configuration eslint.config.mjs.
- L’installation s’est terminée sans vulnérabilité détectée (found 0 vulnerabilities).

![Capture d’écran d’un terminal PowerShell montrant l’initialisation de la configuration ESLint avec la commande npm init @eslint/config@latest. Les options sélectionnées indiquent un projet en JavaScript, orienté détection de problèmes, utilisant des modules CommonJS, sans framework ni TypeScript, et exécuté dans le navigateur. Le terminal affiche ensuite l’installation des dépendances eslint, @eslint/js et globals via npm, sans vulnérabilité détectée, puis la création réussie du fichier eslint.config.mjs.](image-1.png)

### Axel JOSSE
**Les tests d’intégration du backend sont exécutés avec Jest (npm run test:coverage). Les tests couvrent les principales fonctionnalités de l’API :**
- Route /health (vérification du statut du serveur)
- Authentification (inscription et connexion)
- Routes protégées nécessitant un token
- CRUD des tâches (création, lecture, mise à jour, suppression)
- Récupération des utilisateurs sans exposer les mots de passe
- Résultats des tests : 17 tests réussis sur 17.

Couverture du code :
- Statements : 90,42 %
- Branches : 80,48 %
- Fonctions : 89,47 %
- Lignes : 89,77 %

![Capture d’écran d’un terminal affichant l’exécution des tests de couverture avec Jest pour le projet `task-manager-backend`. Tous les tests passent avec succès (`PASS __tests__/api.test.js`). Les résultats montrent 17 tests réussis sur 17, répartis entre les routes `/health`, l’authentification, les routes protégées, le CRUD des tâches et la route des utilisateurs. En bas, un tableau de couverture indique environ 90,42 % des instructions, 80,48 % des branches, 89,47 % des fonctions et 89,77 % des lignes couvertes pour le fichier `server.js`, avec quelques lignes non couvertes listées en rouge.](image-2.png)