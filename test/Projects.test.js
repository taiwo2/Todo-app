
import Projects from '../src/Projects';

describe('tests to AddProject', () => {
  test('should add todo for a project', () => {
    const projectAdd = Projects.addProject('tawih', 'ww');
    expect(projectAdd).toBe(projectAdd);
  });
});
describe('tests to EditProject', () => {
  test('should add todo for a project', () => {
    const projectAdd = Projects.editProject(0, 'tawih', 'ww');
    expect(projectAdd).toBe(projectAdd);
  });
});
describe('tests to AddProjectTodo', () => {
  test('should add todo for a project', () => {
    const AddTodo = Projects.removeProject(0,'tawih', 'ww');
    expect(AddTodo).toBe(AddTodo);
  });
});
describe('tests to GetAllProject', () => {
  test('should add todo for a project', () => {
    const getAllProject = Projects.getAllProjects();
    expect(getAllProject).toBe(getAllProject);
  });
});
