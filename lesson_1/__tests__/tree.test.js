import { printTree } from '../index.js'

// Мок данных для тестирования
const mockData = {
  name: 1,
  items: [
    {
      name: 2,
      items: [{ name: 3 }, { name: 4 }]
    },
    {
      name: 5,
      items: [{ name: 6 }]
    }
  ]
}

// Мокаем console.log
global.console = {
  log: jest.fn()
}

describe('printTree', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should correctly print the tree structure', () => {
    // Вызываем функцию с мок-данными
    printTree(mockData)

    // Проверяем, что console.log был вызван с ожидаемыми строками
    expect(console.log).toHaveBeenCalledWith('└── 1')
    expect(console.log).toHaveBeenCalledWith('    ├── 2')
    expect(console.log).toHaveBeenCalledWith('    │   ├── 3')
    expect(console.log).toHaveBeenCalledWith('    │   └── 4')
    expect(console.log).toHaveBeenCalledWith('    └── 5')
    expect(console.log).toHaveBeenCalledWith('        └── 6')
  })
})
