const request = require('supertest');
const app = require('../server');

describe('API Backend - Tests d\'intégration', () => {
  let token;
  let createdTaskId;
  const testUser = {
    email: `user${Date.now()}@test.com`,
    password: 'password123',
    name: 'Test User',
  };

  describe('Route /health', () => {
    it('devrait retourner le statut OK et un timestamp', async () => {
      const res = await request(app).get('/health');

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('Routes d\'authentification', () => {
    it('devrait permettre d\'enregistrer un nouvel utilisateur', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(201);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe(testUser.email);
      expect(res.body.user.name).toBe(testUser.name);
      expect(res.body.user.password).toBeUndefined();
    });

    it('ne devrait pas permettre de ré-enregistrer le même utilisateur', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Utilisateur déjà existant');
    });

    it('devrait permettre de se connecter avec un utilisateur existant', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe(testUser.email);

      token = res.body.token;
    });

    it('ne devrait pas permettre de se connecter avec un mauvais mot de passe', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Identifiants invalides');
    });
  });

  describe('Routes protégées sans token', () => {
    it('devrait refuser l\'accès à /api/tasks sans token', async () => {
      const res = await request(app).get('/api/tasks');

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe("Token d'accès requis");
    });

    it('devrait refuser l\'accès à /api/users sans token', async () => {
      const res = await request(app).get('/api/users');

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe("Token d'accès requis");
    });
  });

  describe('Routes des tâches (CRUD)', () => {
    it('devrait créer une tâche avec un token valide', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Nouvelle tâche',
          description: 'Description test',
          priority: 'high',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.title).toBe('Nouvelle tâche');
      expect(res.body.status).toBe('todo');

      createdTaskId = res.body.id;
    });

    it('ne devrait pas créer de tâche sans titre', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'Pas de titre',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Le titre est requis');
    });

    it('devrait récupérer la liste des tâches', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('devrait récupérer une tâche par son id', async () => {
      const res = await request(app)
        .get(`/api/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(createdTaskId);
    });

    it('devrait retourner 404 pour une tâche inexistante', async () => {
      const res = await request(app)
        .get('/api/tasks/introuvable')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Tâche non trouvée');
    });

    it('devrait mettre à jour une tâche existante', async () => {
      const res = await request(app)
        .put(`/api/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Tâche mise à jour',
          status: 'in-progress',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Tâche mise à jour');
      expect(res.body.status).toBe('in-progress');
    });

    it('devrait retourner 404 lors de la mise à jour d\'une tâche inexistante', async () => {
      const res = await request(app)
        .put('/api/tasks/introuvable')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Impossible',
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Tâche non trouvée');
    });

    it('devrait supprimer une tâche existante', async () => {
      const res = await request(app)
        .delete(`/api/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(204);
    });

    it('devrait retourner 404 lors de la suppression d\'une tâche inexistante', async () => {
      const res = await request(app)
        .delete(`/api/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Tâche non trouvée');
    });
  });

  describe('Route des utilisateurs', () => {
    it('devrait retourner la liste des utilisateurs sans les mots de passe', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].password).toBeUndefined();
    });
  });
});
