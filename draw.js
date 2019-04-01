'use strict'

const util = require('./util')

/*
 * Canvas data holds the output of the drawing tool
*/
const canvasData = []

/*
 * checkOutOfBounds: check if cordinates out of bounds
 * @params: cordinates
 * @returns: boolean
*/
const checkOutOfBounds = (fromCol, fromRow, toCol, toRow) => {
  const totRows = canvasData.length - 2
  const totCols = canvasData[0].length - 2
  // check if any of the cordinates is zero
  if (fromCol === 0 || fromRow === 0 || toCol === 0 || toRow === 0) return false
  // check if from or to row number is greater than totRows
  if (fromRow > totRows || toRow > totRows) return false
  // check if from or to column number is greater than totCols
  if (fromCol > totCols || toCol > totCols) return false
  return true
}

/*
 * validateLineCordinates: validate line cordinates
 * @params: cordinates
 * @returns: boolean
*/
const validateLineCordinates = (fromCol, fromRow, toCol, toRow) => {
  if (canvasData.length === 0) return { success: false, msg: 'create canvas first' }
  if (!checkOutOfBounds(fromCol, fromRow, toCol, toRow)) return { success: false, msg: 'cordinates out of boundary' }
  // check if from or to row number is greater than totrows
  if (fromRow != toRow && fromCol != toCol) return { success: false, msg: 'invalid line cordinates' }
  return { success: true }
}

/*
 * validateRectangleCordinates: validate rectangle cordinates
 * @params: cordinates
 * @returns: boolean
*/
const validateRectangleCordinates = (fromCol, fromRow, toCol, toRow) => {
  if (canvasData.length === 0) return { success: false, msg: 'create canvas first' }
  if (!checkOutOfBounds(fromCol, fromRow, toCol, toRow)) return { success: false, msg: 'cordinates out of boundary' }
  // check if from col is >= to col or from row is >= to row
  if (fromCol >= toCol || fromRow >= toRow) return { success: false, msg: 'invalid rectangle cordinates' }
  return { success: true }
}

/*
 * drawCanvas: create canvas boundaries
 * @params: col -> number of columns
 * @params: row -> number of rows
 * @returns:
*/
const drawCanvas = (col, row) => {
  const colWithBorder = parseInt(col) + 2
  const rowWithBorder = parseInt(row) + 2

  canvasData.length = 0
  for (let i = 0; i < rowWithBorder; i++) {
    canvasData[i] = []
    for (let j = 0; j < colWithBorder; j++) {
      if (i === 0 || i === rowWithBorder - 1) {
        canvasData[i][j] = '-'
        continue
      }
      if (j === 0 || j === colWithBorder - 1) {
        canvasData[i][j] = '|'
        continue
      }
      canvasData[i][j] = ' '
    }
  }
}

/*
 * drawLine: draw line for given start and end cordinate
 * @params: fromCol -> starting from column number
 * @params: fromRow -> starting from row number
 * @params: toCol   ->  to column number
 * @params: toRow   -> to row number
 * @rturns:
*/
const drawLine = (fromCol, fromRow, toCol, toRow) => {
  if (fromCol === toCol) {
    for (let i = fromRow; i <= toRow; i++) {
      canvasData[i][fromCol] = '*'
    }
  } else if (fromRow === toRow) {
    for (let i = fromCol; i <= toCol; i++) {
      canvasData[fromRow][i] = '*'
    }
  }
}

/*
 * drawRectangle: draw rectangle for given cordinates
 * @params: fromCol -> starting from column number
 * @params: fromRow -> starting from row number
 * @params: toCol   ->  to column number
 * @params: toRow   -> to row number
 * @rturns:
*/
const drawRectangle = (fromCol, fromRow, toCol, toRow) => {
  for (let i = fromRow; i <= toRow; i++) {
    for (let j = fromCol; j <= toCol; j++) {
      if (i == fromRow || i == toRow) {
        canvasData[i][j] = '*'
        continue
      } else if (j == fromCol || j == toCol) {
        canvasData[i][j] = '*'
        continue
      }
    }
  }
}

/*
 * drawCanvasOutput: read canvas data and draw canvas
 * @params:
 * @rturns:
*/
const drawCanvasOutput = () => {
  util.outLog('\n')
  for (let i = 0; i < canvasData.length; i++) {
    const row = canvasData[i]
    let line = row.join('  ')
    util.outLog(line)
  }
  util.outLog('\n')
}

module.exports = {
  validateLineCordinates,
  validateRectangleCordinates,
  canvasData,
  drawCanvas,
  drawLine,
  drawRectangle,
  drawCanvasOutput
}
