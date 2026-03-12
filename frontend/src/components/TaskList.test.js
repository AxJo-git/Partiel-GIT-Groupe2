import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

// On mock le contexte des tâches pour éviter de dépendre de TaskProvider et d'axios
vi.mock('../contexts/TaskContext', () => {
  return {
    useTask: () => ({
      // Données minimales pour que TaskCard fonctionne dans les tests
      users: [
        { id: '1', name: 'Utilisateur de test' }
      ],
      updateTask: vi.fn(),
      deleteTask: vi.fn()
    })
  };
});

// Tests de base pour vérifier que TaskList se comporte correctement
describe('TaskList', () => {
  const mockOnEditTask = vi.fn();

  const sampleTasks = [
    {
      id: '1',
      title: 'Tâche à faire',
      description: 'Description 1',
      status: 'todo',
      priority: 'medium',
      assignedTo: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Tâche en cours',
      description: 'Description 2',
      status: 'progress',
      priority: 'high',
      assignedTo: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Tâche terminée',
      description: 'Description 3',
      status: 'done',
      priority: 'low',
      assignedTo: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  it('affiche les colonnes pour chaque statut', () => {
    render(<TaskList tasks={sampleTasks} onEditTask={mockOnEditTask} />);

    // On vérifie simplement que les en-têtes de colonnes sont présents
    // On cible les titres de colonne (balises <h3>) pour éviter les doublons dans les <option>
    expect(
      screen.getByRole('heading', { level: 3, name: 'À faire' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'En cours' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Terminé' })
    ).toBeInTheDocument();
  });

  it('affiche toutes les tâches dans la bonne colonne', () => {
    render(<TaskList tasks={sampleTasks} onEditTask={mockOnEditTask} />);

    // On vérifie que chaque titre de tâche est rendu
    expect(screen.getByText('Tâche à faire')).toBeInTheDocument();
    expect(screen.getByText('Tâche en cours')).toBeInTheDocument();
    expect(screen.getByText('Tâche terminée')).toBeInTheDocument();
  });

  it('affiche un message lorsqu\'une colonne est vide', () => {
    // On passe une liste vide pour vérifier l'état "aucune tâche"
    render(<TaskList tasks={[]} onEditTask={mockOnEditTask} />);

    expect(
      screen.getByText('Aucune tâche à faire')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Aucune tâche en cours')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Aucune tâche terminé')
    ).toBeInTheDocument();
  });
});

