import Project from '../src/Project';
import ToDo from '../src/Project';
import getAllToDos from '../src/Project'

const kProject = Project('tahiw', 'ww') 
describe('tests for todoController', () => {
    test('should add todo for a project', () => {
      kProject.addToDo('2wwww', 'zzz','Sunday', 'April 11th, 2021, 22:50',null,true);
      const todos =ToDo('2wwww', 'zzz','Sunday', 'April 11th, 2021, 22:50',null,true);
      expect(todos.length).not.toBeNull();
    });
})

describe('tests to getAllTodos', () => {
    test('should add todo for a project', () => {
      kProject.getAllToDos('2wwww', 'zzz','Sunday', 'April 11th, 2021, 22:50',null,true);
      const todos =ToDo('2wwww', 'zzz','Sunday', 'April 11th, 2021, 22:50',null,true);
      expect(todos.length).not.toBeNull();
    });
})
describe('tests to EditTodo', () => {
    test('should add todo for a project', () => {
      kProject.editToDo(0,'2wwww', 'zzz','Sunday', 'April 11th, 2021, 22:50',null,true);
      const todos =ToDo('2wwww', 'zzz','Sunday', 'April 11th, 2021, 22:50',null,true);
      expect(todos.length).not.toBeNull();
    });
})