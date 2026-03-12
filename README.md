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

![alt text](image-1.png)

### Axel JOSSE
Les tests d’intégration du backend sont exécutés avec Jest (npm run test:coverage). Les tests couvrent les principales fonctionnalités de l’API :

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

![Image d'un terminal montrant différents tests avec Jest. Au total, 18 tests sur 18 sont passés. 1 en "Test Suites" et 17 en "Tests". Snapshots : 0 total. Time 1.106 s. La dernière ligne dit : "Ran all test suites"](image.png)