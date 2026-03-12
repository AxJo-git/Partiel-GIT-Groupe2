# taskmanagement
Examen Git groupe 2 : Justine DOUANLA, Axel JOSSE, Alexis PHAM, Théo TESSIER

## Préparation du projet
Création du repo par Axel JOSSE
Url du repo github : https://github.com/AxJo-git/Partiel-GIT-Groupe2

## Début
Lancement du projet avec les infos données dans la documentation du projet
Justine DOUANLA : Eslint
Axel JOSSE : tests API Jest
Alexis PHAM : README.md et ci-cd
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

![Capture d’écran d’un terminal PowerShell montrant l’initialisation de la configuration ESLint avec la commande npm init @eslint/config@latest. Les options sélectionnées indiquent un projet en JavaScript, orienté détection de problèmes, utilisant des modules CommonJS, sans framework ni TypeScript, et exécuté dans le navigateur. Le terminal affiche ensuite l’installation des dépendances eslint, @eslint/js et globals via npm, sans vulnérabilité détectée, puis la création réussie du fichier eslint.config.mjs.](image/projet_gestionnaire_taches_examen/ESLint_configuration.png)

Voici un résumé **concis et complet** des erreurs rencontrées lors de la mise en place des tests et de l’analyse du code avec ESLint :

### Erreurs rencontrées lors des tests et du linting

* La configuration initiale de **ESLint** a été générée avec des options inadaptées au projet frontend :

  * **modules CommonJS**
  * **aucun framework**
  * environnement **browser**
* Cette configuration a provoqué plusieurs **erreurs de parsing** sur les fichiers du frontend utilisant la syntaxe **ES Modules** (`import` / `export`) :

  * `AuthContext.js`
  * `TaskContext.js`
  * `index.js`
  * `setupTests.js`
  * `vite.config.js`
* ESLint a également généré des erreurs `Unexpected token <` sur les fichiers contenant du **JSX**, car la configuration ne prenait pas correctement en charge **React** :

  * `TaskList.js`
  * `AuthContext.js`
  * `TaskContext.js`
  * `index.js`
* Au total, plusieurs exécutions ont affiché entre **17 et 20 problèmes**, principalement des erreurs de parsing liées à une mauvaise configuration d’ESLint pour le frontend.
* Côté backend, l’analyse a relevé **5 erreurs `no-unused-vars`**, dues à des variables déclarées mais non utilisées :

  * plusieurs variables `error` dans des blocs `catch`
  * une variable `password` non utilisée

### Bilan

* Les principales difficultés ne venaient pas des tests eux-mêmes, mais surtout de la **configuration ESLint**, mal adaptée à un projet **React / Vite** utilisant **JSX** et les **modules ES**.
* Malgré ces erreurs de linting, les **tests automatisés du projet fonctionnent correctement** et la pipeline CI/CD s’exécute avec succès.

![Capture d’écran d’un terminal affichant l’exécution de npx eslint backend frontend. Plusieurs erreurs de parsing apparaissent dans des fichiers du frontend, notamment TaskContext.js, index.js, setupTests.js et vite.config.js. Le message principal indique que les mots-clés import et export ne peuvent être utilisés qu’avec sourceType: module. En bas, le terminal signale 19 problèmes au total, dont 18 erreurs et 1 avertissement.](image/projet_gestionnaire_taches_examen/ESLint_Config_avance.png)
![Capture d’écran d’un terminal PowerShell montrant une nouvelle exécution de npx eslint backend frontend. Les erreurs concernent encore des fichiers du frontend comme TaskContext.js, index.js, setupTests.js et vite.config.js, avec le même message de parsing lié à import et export utilisés sans configuration sourceType: module. Le récapitulatif final affiche 20 problèmes, soit 20 erreurs et 0 avertissement.](image/projet_gestionnaire_taches_examen/ESLint_Config_minimal.png)
![Capture d’écran du terminal intégré de VS Code affichant les résultats d’ESLint sur plusieurs fichiers du frontend. Des erreurs de parsing Unexpected token < apparaissent dans TaskList.js, AuthContext.js, TaskContext.js et index.js, indiquant un problème de prise en charge de la syntaxe JSX. En bas, le terminal indique 17 problèmes, dont 16 erreurs et 1 avertissement.](image/projet_gestionnaire_taches_examen/ESLint_Config3_avance.png)
![Capture d’écran d’un terminal PowerShell montrant l’initialisation de la configuration ESLint avec la commande npm init @eslint/config@latest. Les choix sélectionnés sont visibles : projet en JavaScript, détection de problèmes, modules CommonJS, aucun framework, pas de TypeScript, environnement navigateur. Le terminal affiche ensuite l’installation des dépendances eslint, @eslint/js et globals, puis la création réussie du fichier eslint.config.mjs.](image/projet_gestionnaire_taches_examen/ESLint_configuration.png)
![Capture d’écran du terminal intégré de VS Code affichant les résultats d’ESLint sur le backend. Cinq erreurs no-unused-vars sont signalées, concernant plusieurs variables error ainsi qu’une variable password déclarée mais non utilisée. Le récapitulatif final indique 5 problèmes, soit 5 erreurs et 0 avertissement.](image/projet_gestionnaire_taches_examen/ESLint_corriger_backend.png)

### Axel JOSSE
**Les tests d’intégration de l’API backend sont exécutés avec Jest via la commande globale `npm run test:coverage`, qui lance les tests du backend puis du frontend. Pour la partie API, Jest exécute `jest --coverage --detectOpenHandles` afin de vérifier le bon fonctionnement des routes et de générer un rapport de couverture. Les tests backend couvrent les principales fonctionnalités de l’API :**

* Route `/health` pour vérifier que le serveur répond correctement
* Authentification : inscription d’un nouvel utilisateur, refus de doublon, connexion valide et refus avec mauvais mot de passe
* Routes protégées : refus d’accès aux routes `/api/tasks` et `/api/users` sans token
* CRUD des tâches : création, validation des données, récupération de la liste, récupération par identifiant, mise à jour, suppression, et gestion des erreurs `404`
* Route des utilisateurs : récupération de la liste sans exposer les mots de passe

**Résultats obtenus pour l’API backend :**

* **17 tests réussis sur 17**
* **1 suite de tests validée**
* Exécution en environ **1,10 s**

**Couverture du code du backend :**

* **Statements : 90,42 %**
* **Branches : 80,48 %**
* **Fonctions : 89,47 %**
* **Lignes : 89,77 %**

![Capture d’écran d’un terminal affichant l’exécution des tests de couverture avec Jest pour le projet `task-manager-backend`. Tous les tests passent avec succès (`PASS __tests__/api.test.js`). Les résultats montrent 17 tests réussis sur 17, répartis entre les routes `/health`, l’authentification, les routes protégées, le CRUD des tâches et la route des utilisateurs. En bas, un tableau de couverture indique environ 90,42 % des instructions, 80,48 % des branches, 89,47 % des fonctions et 89,77 % des lignes couvertes pour le fichier `server.js`, avec quelques lignes non couvertes listées en rouge.](image/projet_gestionnaire_taches_examen/image5.png)

### Alexis PHAM
### CI/CD avec GitHub Actions

Un pipeline **CI/CD** a été mis en place avec **GitHub Actions** afin d’automatiser la vérification et le déploiement du projet à chaque mise à jour du dépôt. Le workflow est déclenché lors d’un **push** sur le repository et permet d’exécuter automatiquement les tests et certaines étapes de build.

La première étape du pipeline correspond au job **“Tests simples du projet”**. Ce job prépare l’environnement d’exécution, récupère le code source du dépôt, puis configure **Node.js**. Les dépendances du **backend** et du **frontend** sont ensuite installées avant l’exécution des tests automatisés. Les captures montrent que les tests du backend et du frontend se lancent correctement et que toutes les étapes se terminent avec succès.

Une fois les tests validés, le pipeline enchaîne avec un second job nommé **“Déploiement simple (étudiant)”**. Ce job récupère à nouveau le code, configure Node.js puis exécute le **build du frontend** afin de produire la version compilée de l’application. Une étape de **déploiement placeholder** est ensuite exécutée. Cette étape représente une simulation de déploiement et sert de base pour une future intégration avec un service d’hébergement.

Les captures indiquent que l’ensemble du workflow s’exécute correctement : toutes les étapes sont validées et le statut final du pipeline est **Success**. Une annotation signale la présence d’un **warning**, mais celui-ci n’empêche pas le bon fonctionnement du pipeline.

### Bilan

La mise en place de ce pipeline permet de vérifier automatiquement le projet à chaque modification du dépôt. Les tests backend et frontend sont exécutés automatiquement, et le build du frontend est généré dans le cadre du processus de déploiement. Cette configuration démontre l’intégration d’une démarche **d’intégration continue et de déploiement continu** dans le projet.

![Capture d’écran de GitHub Actions montrant le job “Tests simples du projet” exécuté avec succès dans le workflow CI/CD. La liste des étapes visibles comprend la préparation du job, la récupération du code, la configuration de Node.js, l’installation du backend et du frontend, puis l’exécution des tests backend et frontend. Toutes les étapes affichent une coche de validation.](image/projet_gestionnaire_taches_examen/alexio1.png)
![Capture d’écran de GitHub Actions affichant le job “Déploiement simple (étudiant)” réussi. Les étapes visibles incluent la préparation du job, la récupération du code, la configuration de Node.js, le build du frontend, puis une étape de déploiement indiquée comme placeholder. Toutes les étapes sont validées.](image/projet_gestionnaire_taches_examen/alexio2.png)

### Théo TESSIER
## Tests end-to-end avec Selenium

Des tests automatisés ont été mis en place avec **Python**, **Pytest** et **Selenium WebDriver** afin de vérifier le bon fonctionnement minimal de l’interface frontend dans un navigateur.

Le fichier de test commence par importer les bibliothèques nécessaires à l’automatisation du navigateur : `selenium`, `pytest`, `webdriver_manager` ainsi que les outils de synchronisation comme `WebDriverWait` et `expected_conditions`. Une classe de test `TestCalculator` est ensuite définie, avec un **fixture Pytest** chargé d’initialiser automatiquement **Google Chrome** avant l’exécution des tests.

La configuration du navigateur prévoit aussi un mode compatible **CI/CD**. Lorsque la variable d’environnement `CI` est détectée, Chrome est lancé avec les options `--headless`, `--no-sandbox` et `--disable-dev-shm-usage`, ce qui permet une exécution sans interface graphique dans un environnement automatisé comme GitHub Actions. Le pilote Chrome est installé dynamiquement grâce à `ChromeDriverManager`, puis fermé proprement à la fin avec `driver.quit()`.

Trois tests principaux ont été écrits pour valider le chargement de l’application frontend accessible sur `http://localhost:5173` :

* **Test 1 : chargement de la page**
  Ce test ouvre l’application et vérifie que le titre de la page contient bien **“Gestionnaire de Tâches”**. L’objectif est de confirmer que l’application démarre correctement et que la page principale est bien servie.

* **Test 2 : présence du root React**
  Ce test vérifie que React a bien rendu l’application en attendant l’apparition de l’élément ayant l’identifiant **`root`**. Une fois l’élément trouvé, le test confirme qu’il est affiché à l’écran.

* **Test 3 : présence de contenu dans la page**
  Ce test récupère l’élément `<body>` du document afin de s’assurer qu’un contenu HTML est bien chargé dans la page. Cela permet de valider un rendu minimal de l’interface.

Le script prévoit également une exécution directe avec `pytest.main(...)`, accompagnée de la génération d’un **rapport HTML autonome**, ce qui facilite la consultation des résultats des tests.

### Difficultés rencontrées

Lors de l’exécution, plusieurs problèmes techniques sont apparus. Les captures montrent qu’un **traceback Python** s’est produit au démarrage du framework de test dans **PyCharm**, avant même l’exécution réelle des scénarios Selenium. L’erreur provenait de modules internes liés à `pydevd` et au fichier `platform.py`, avec une interruption manuelle du processus (`KeyboardInterrupt`). Le terminal indique ensuite un résultat de type **“Empty suite”**, ce qui signifie que la suite de tests n’a pas été exécutée correctement.

Ce comportement montre que le problème ne venait pas directement des scénarios Selenium eux-mêmes, mais plutôt de l’**environnement d’exécution Python / IDE**, en particulier de l’intégration entre **PyCharm**, **Python 3.14** et les outils internes de débogage. Les tests étaient donc correctement rédigés sur le principe, mais leur lancement a été bloqué par un problème technique externe.

### Bilan

La partie Selenium a permis de préparer une base de **tests end-to-end** pour vérifier automatiquement le chargement du frontend, la présence du root React et l’affichage du contenu principal dans le navigateur. Même si l’exécution complète a rencontré des difficultés liées à l’environnement Python utilisé, cette étape montre la mise en place d’une démarche de test automatisé orientée interface utilisateur, complémentaire aux tests unitaires et aux tests d’intégration déjà réalisés sur le projet.

![Capture d’écran d’un fichier Python de test Selenium ouvert dans un éditeur. On y voit les imports de pytest, os, selenium, webdriver_manager et plusieurs modules liés à Chrome WebDriver. Une classe TestCalculator contient un fixture driver qui initialise le navigateur Chrome, ajoute des options spécifiques pour un environnement de CI comme --headless, --no-sandbox et --disable-dev-shm-usage, puis ferme le navigateur avec driver.quit() après les tests.](image/projet_gestionnaire_taches_examen/image2.png)
![Capture d’écran de la suite du fichier Python de tests Selenium. Trois tests sont visibles : test_page_loads, qui vérifie que la page http://localhost:5173 contient le titre “Gestionnaire de Tâches” ; test_root_exists, qui attend la présence de l’élément root dans la page ; et test_page_content, qui vérifie que l’élément body est présent. En bas du fichier, le script lance pytest.main avec un mode verbeux et la génération d’un rapport HTML autonome.](image/projet_gestionnaire_taches_examen/image3.png)
![Capture d’écran d’une console PyCharm affichant le lancement d’une suite de tests Python. Un long traceback en rouge apparaît dès le démarrage, impliquant des fichiers internes de PyCharm (pydevd.py, pydevd_constants.py) et le module standard platform.py. L’erreur survient pendant la détection de la plateforme Windows et empêche l’exécution normale des tests.](image/projet_gestionnaire_taches_examen/image4.png)
![Capture d’écran de la fin du traceback dans la console PyCharm. Le message KeyboardInterrupt apparaît, suivi de Process finished with exit code -1073741510 (0xC000013A: interrupted by Ctrl+C). En dessous, la console affiche deux fois Empty suite, indiquant qu’aucun test Selenium n’a finalement été exécuté.](image/projet_gestionnaire_taches_examen/image6.png)
