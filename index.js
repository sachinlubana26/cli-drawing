#!/usr/bin/env node

'use strict'

const util = require('./util')
const draw = require('./draw')

const args = process.argv
if (args[2] === 'help') {
    util.showUsage()
    process.exit(0)
}

/*
 * int: start asking user inputs for drawing
 * @params:
 * @returns:
 */
const init = async () => {
    try {
        const input = await util.getUserInput()
        let inputArr = input.split(' ')
        const command = inputArr[0]
        if (command === 'Q') {
            util.infoLog('\nThanks for using this tool!\n')
            process.exit(0)
        }

        inputArr.shift()
        inputArr = inputArr.map((k) => parseInt(k))

        if (!util.validateCLIInputs(command, inputArr)) {
            util.showUsage()
            setTimeout(() => init(), 0)
        } else {
            runCommand(command, inputArr)
        }
    } catch (err) {
        util.errorLog(err)
    }
}

/*
 * runCommand: run the command given by user
 * @params: command : L, R, C
 * @params: inputs : cordinates
 * @returns:
 */
const runCommand = (command, inputs) => {
    switch (command) {
        case 'C':
            draw.drawCanvas(inputs[0], inputs[1])
            draw.drawCanvasOutput()
            break

        case 'L':
            const lResp = draw.validateLineCordinates(inputs[0], inputs[1], inputs[2], inputs[3])
            if (!lResp.success) {
                util.errorLog(`\n${lResp.msg}\n`)
                break
            }
            draw.drawLine(inputs[0], inputs[1], inputs[2], inputs[3])
            draw.drawCanvasOutput()
            break

        case 'R':
            const rResp = draw.validateRectangleCordinates(inputs[0], inputs[1], inputs[2], inputs[3])
            if (!rResp.success) {
                util.errorLog(`\n${rResp.msg}\n`)
                break
            }
            draw.drawRectangle(inputs[0], inputs[1], inputs[2], inputs[3])
            draw.drawCanvasOutput()
            break
    }
    init()
}

/* RUN THE DRAWING SERVICE */
init()
