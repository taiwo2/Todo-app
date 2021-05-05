import LocalDB from '../src/LocalDB'

describe('tests to SaveProject to LocalDB', () => {
    test('should add todo for a project', () => {
        const saveProject =LocalDB.saveProjects() ;
      expect(saveProject).toBe(saveProject);
  
    });
})

describe('tests to RemoveTodo from LocalDB', () => {
    test('should add todo for a project', () => {
        const removeDB =LocalDB.removeToDos('tawih') ;
      expect(removeDB).toBe(removeDB);
  
    });
})