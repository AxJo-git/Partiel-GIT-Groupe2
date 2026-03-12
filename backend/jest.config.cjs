// Configuration Jest spécifique au backend (Node.js)
module.exports = {
  // Environnement de test adapté à une API Node
  testEnvironment: 'node',

  // Schéma de découverte des fichiers de test
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],

  // Fichiers pris en compte pour la couverture
  collectCoverageFrom: [
    'server.js'
  ],

  // Dossier de sortie des rapports de couverture
  coverageDirectory: 'coverage',

  // Formats de rapports utiles pour un projet étudiant
  coverageReporters: ['text', 'html', 'lcov'],

  // Exclusions classiques de la couverture
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ]
};

