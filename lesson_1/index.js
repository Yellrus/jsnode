import { data } from './mock.js'

function printTree(node, prefix = '', isLast = true) {
  // Выводим текущий узел
  console.log(`${prefix}${isLast ? '└── ' : '├── '}${node.name}`)

  // Если у узла есть дочерние элементы, вызываем функцию рекурсивно для каждого из них
  if (node.items) {
    const newPrefix = prefix + (isLast ? '    ' : '│   ')
    node.items.forEach((child, index) => {
      const isLastChild = index === node.items.length - 1
      printTree(child, newPrefix, isLastChild)
    })
  }
}

printTree(data)
