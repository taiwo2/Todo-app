
import Projects from '../src/Projects';
import SVG from '../src/svg';

Projects.getProject(index).getAllToDos().all()
const todowrap = document.createElement('div')

describe('tests for todoController', () => {
    test('should add todo for a project', () => {
    Projects.getProject(index).getAllToDos().all()
      const alldo = todowrap.querySelector('todowrap')
      expect(alldo).not.toBeNull();
    });
  
    test('should remove Todos for a project', () => {
      todo.SVG.editBtn()
      todo.SVG.deleteBtn()
      const todos = SVG().all(0);
      expect(todos.length).toBe(1);
    });
  
    // test('should complete todo for a project', () => {
    //   tController.completeTodo(0, 0);
    //   const todo = todoModel().get(0, 0);
    //   expect(todo.isCompleted).toBeTruthy();
    // });
  });