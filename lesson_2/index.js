import fs from 'fs'
import { Transform } from 'stream'
import path from 'path'
import { fileURLToPath } from 'url'

// import.meta.url в путь файла
const __filename = fileURLToPath(import.meta.url)
// директория текущего файла
const __dirname = path.dirname(__filename)

// Пути
const inputFilePath = process.argv[2] || path.join(__dirname, 'input.txt')
const outputFilePath = path.join(__dirname, 'output.txt')

// Поток для очистки и разделения текста на слова
const textWork = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, encoding, cb) {
    const text = chunk.toString().toLowerCase()
    const words = text.replace(/[^\w\s]/g, '').split(/\s+/)

    cb(null, words)
  }
})

// Поток для подсчета кол-ва слов
const wordCounter = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(wordsArray, encoding, cb) {
    const wordCounts = {}
    wordsArray.forEach((word) => {
      if (word) {
        wordCounts[word] = (wordCounts[word] || 0) + 1
      }
    })

    cb(null, wordCounts)
  }
})

// Поток для создания вектора
const vectoring = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(wordCounts, encoding, cb) {
    const sortedWords = Object.keys(wordCounts).sort() // Сортируем слова по алфавиту
    const vector = sortedWords.map((word) => wordCounts[word])

    cb(null, JSON.stringify(vector) + '\n') // в JSON
  }
})

// Запускаем стрим и его потоки
fs.createReadStream(inputFilePath, { encoding: 'utf8' })
  .pipe(textWork)
  .pipe(wordCounter)
  .pipe(vectoring)
  .pipe(fs.createWriteStream(outputFilePath))
  .on('finish', () => {
    console.log(`Результат записан в файл: ${outputFilePath}`)
  })
  .on('error', (err) => {
    console.error('Ошибка:', err.message)
  })
