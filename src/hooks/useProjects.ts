import { useProjectStore, selectAllProjects, selectAllLabels } from '../store/projectStore';

export function useProjects() {
  const projects = useProjectStore(selectAllProjects);
  const addProject = useProjectStore(state => state.addProject);
  const updateProject = useProjectStore(state => state.updateProject);
  const deleteProject = useProjectStore(state => state.deleteProject);
  const reorderProjects = useProjectStore(state => state.reorderProjects);

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
  };
}

export function useLabels() {
  const labels = useProjectStore(selectAllLabels);
  const addLabel = useProjectStore(state => state.addLabel);
  const updateLabel = useProjectStore(state => state.updateLabel);
  const deleteLabel = useProjectStore(state => state.deleteLabel);

  return {
    labels,
    addLabel,
    updateLabel,
    deleteLabel,
  };
}
