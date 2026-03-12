// On importe supertest depuis les dépendances du backend
// pour éviter de dupliquer les dépendances dans le dossier /tests
const request = require('../../backend/node_modules/supertest');
const app = require('../../backend/server');

describe('API Backend - Tests d\'intégration', () => {
  // Client HTTP pour envoyer des requêtes à l'application Express
  const api = request(app);

  // Token JWT qui sera récupéré après inscription ou connexion
  let authToken;

  // Identifiants de base pour les tests d'authentification
  const testUser = {
    email: 'testuser@example.com',
    password: 'testpassword',
    name: 'Test User'
  };

  // Données de base pour les tests sur les tâches
  let createdTaskId;

  describe('Route /health', () => {
    it('devrait retourner le statut OK et un timestamp', async () => {
      const response = await api.get('/health').expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Routes d\'authentification', () => {
    it('devrait permettre d\'enregistrer un nouvel utilisateur', async () => {
      const response = await api
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      // On vérifie que le token et les informations utilisateur sont présents
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toMatchObject({
        email: testUser.email,
        name: testUser.name
      });

      authToken = response.body.token;
    });

    it('ne devrait pas permettre de ré-enregistrer le même utilisateur', async () => {
      const response = await api
        .post('/api/auth/register')
        .send(testUser)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('devrait permettre de se connecter avec un utilisateur existant', async () => {
      const response = await api
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');

      // On met à jour le token pour les tests suivants
      authToken = response.body.token;
    });

    it('ne devrait pas permettre de se connecter avec un mauvais mot de passe', async () => {
      const response = await api
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Routes protégées sans token', () => {
    it('devrait refuser l\'accès à /api/tasks sans token', async () => {
      const response = await api.get('/api/tasks').expect(401);
      expect(response.body).toHaveProperty('error');
    });

    it('devrait refuser l\'accès à /api/users sans token', async () => {
      const response = await api.get('/api/users').expect(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Routes des tâches (CRUD)', () => {
    it('devrait créer une tâche avec un token valide', async () => {
      const newTask = {
        title: 'Tâche de test',
        description: 'Créée pendant les tests d\'intégration',
        priority: 'high'
      };

      const response = await api
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTask)
        .expect(201);

      // On garde l\'id pour les tests suivants
      createdTaskId = response.body.id;

      expect(response.body).toMatchObject({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        status: 'todo'
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
      expect(response.body).toHaveProperty('assignedTo');
    });

    it('ne devrait pas créer de tâche sans titre', async () => {
      const response = await api
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          description: 'Tâche sans titre'
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('devrait récupérer la liste des tâches', async () => {
      const response = await api
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // On vérifie qu\'on obtient un tableau de tâches
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('devrait récupérer une tâche par son id', async () => {
      const response = await api
        .get(`/api/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdTaskId);
    });

    it('devrait retourner 404 pour une tâche inexistante', async () => {
      const response = await api
        .get('/api/tasks/tache-inexistante')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });

    it('devrait mettre à jour une tâche existante', async () => {
      const updatedFields = {
        title: 'Tâche mise à jour',
        status: 'in_progress',
        priority: 'medium'
      };

      const response = await api
        .put(`/api/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedFields)
        .expect(200);

      expect(response.body).toMatchObject(updatedFields);
      expect(response.body).toHaveProperty('id', createdTaskId);
    });

    it('devrait retourner 404 lors de la mise à jour d\'une tâche inexistante', async () => {
      const response = await api
        .put('/api/tasks/tache-inexistante')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Nouvelle valeur' })
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });

    it('devrait supprimer une tâche existante', async () => {
      await api
        .delete(`/api/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);
    });

    it('devrait retourner 404 lors de la suppression d\'une tâche inexistante', async () => {
      const response = await api
        .delete(`/api/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Route des utilisateurs', () => {
    it('devrait retourner la liste des utilisateurs sans les mots de passe', async () => {
      const response = await api
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      // On vérifie que le champ password n\'apparaît pas
      response.body.forEach((user) => {
        expect(user).not.toHaveProperty('password');
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('name');
      });
    });
  });
});

