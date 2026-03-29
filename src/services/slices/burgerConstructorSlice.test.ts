import burgerConstructorReducer, {
  initialState,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearConstructor
} from './burgerConstructorSlice';
import { TConstructorIngredient } from '../../utils/types';

describe('burgerConstructorSlice', () => {

  const mockBun: TConstructorIngredient = {
    _id: '123',
    name: 'Булка',
    type: 'bun',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: '',
    id: 'test-id-1'
  };

  const mockMain: TConstructorIngredient = {
    _id: '456',
    name: 'Начинка',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: '',
    id: 'test-id-2'
  };

  it('должен добавлять булку', () => {
    const action = { type: addIngredient.type, payload: mockBun };
    const state = burgerConstructorReducer(initialState, action);
    expect(state.bun).toEqual(mockBun);
  });

  it('должен добавлять ингредиент', () => {
    const action = { type: addIngredient.type, payload: mockMain };
    const state = burgerConstructorReducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(mockMain);
  });

  it('должен удалять ингредиент по id', () => {
    const stateWithIngredient = { bun: null, ingredients: [mockMain] };
    const action = removeIngredient(mockMain.id);
    const state = burgerConstructorReducer(stateWithIngredient, action);
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен изменять порядок ингредиентов (moveDown)', () => {
    const ingredient2 = { ...mockMain, id: 'test-id-3' };
    const state = { bun: null, ingredients: [mockMain, ingredient2] };
    const action = moveDownIngredient(0);
    const newState = burgerConstructorReducer(state, action);
    expect(newState.ingredients[0].id).toBe('test-id-3');
    expect(newState.ingredients[1].id).toBe('test-id-2');
  });

  it('должен изменять порядок ингредиентов (moveUp)', () => {
    const ingredient2 = { ...mockMain, id: 'test-id-3' };
    const state = { bun: null, ingredients: [mockMain, ingredient2] };
    const action = moveUpIngredient(1);
    const newState = burgerConstructorReducer(state, action);
    expect(newState.ingredients[0].id).toBe('test-id-3');
    expect(newState.ingredients[1].id).toBe('test-id-2');
  });

  it('должен очищать конструктор', () => {
    const state = { bun: mockBun, ingredients: [mockMain] };
    const action = clearConstructor();
    const newState = burgerConstructorReducer(state, action);
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});
