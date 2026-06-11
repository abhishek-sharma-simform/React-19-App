import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Project, Label } from '../types/todo';

interface ProjectState {
  projects: Project[];
  labels: Label[];
}

interface ProjectActions {
  addProject: (name: string, color: string, emoji?: string) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addLabel: (name: string, color: string) => void;
  updateLabel: (id: string, patch: Partial<Label>) => void;
  deleteLabel: (id: string) => void;
  reorderProjects: (ids: string[]) => void;
}

type ProjectStore = ProjectState & ProjectActions;

const initialState: ProjectState = {
  projects: [],
  labels: [],
};

export const useProjectStore = create<ProjectStore>()(
  persist(
    set => ({
      ...initialState,
      addProject: (name: string, color: string, emoji?: string) => {
        const newProject: Project = {
          id: crypto.randomUUID(),
          name,
          color,
          emoji,
          createdAt: new Date(),
          order: 0,
        };
        set(state => {
          const maxOrder = state.projects.length > 0 ? Math.max(...state.projects.map(p => p.order)) : -1;
          return {
            projects: [...state.projects, { ...newProject, order: maxOrder + 1 }],
          };
        });
      },
      updateProject: (id: string, patch: Partial<Project>) => {
        set(state => ({
          projects: state.projects.map(p => (p.id === id ? { ...p, ...patch } : p)),
        }));
      },
      deleteProject: (id: string) => {
        set(state => ({
          projects: state.projects.filter(p => p.id !== id),
        }));
      },
      addLabel: (name: string, color: string) => {
        const newLabel: Label = {
          id: crypto.randomUUID(),
          name,
          color,
        };
        set(state => ({
          labels: [...state.labels, newLabel],
        }));
      },
      updateLabel: (id: string, patch: Partial<Label>) => {
        set(state => ({
          labels: state.labels.map(l => (l.id === id ? { ...l, ...patch } : l)),
        }));
      },
      deleteLabel: (id: string) => {
        set(state => ({
          labels: state.labels.filter(l => l.id !== id),
        }));
      },
      reorderProjects: (ids: string[]) => {
        set(state => {
          const reordered = ids.map((id, index) => {
            const project = state.projects.find(p => p.id === id);
            return project ? { ...project, order: index } : null;
          });
          return {
            projects: state.projects.map(project => {
              const found = reordered.find(r => r?.id === project.id);
              return found || project;
            }),
          };
        });
      },
    }),
    {
      name: 'todo-projects',
      storage: createJSONStorage(() => localStorage, {
        reviver: (_key, value) => {
          if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
            return new Date(value);
          }
          return value;
        },
      }),
    },
  ),
);

export const selectAllProjects = (state: ProjectState): Project[] => {
  return [...state.projects].sort((a, b) => a.order - b.order);
};

export const selectProjectById = (state: ProjectState, id: string): Project | undefined => {
  return state.projects.find(p => p.id === id);
};

export const selectAllLabels = (state: ProjectState): Label[] => {
  return state.labels;
};
