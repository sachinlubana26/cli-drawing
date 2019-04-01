const chalk = require('chalk')
const rl = require('readline')

/* askQuestion: function to ask question to collect user inputs */
const askQuestion = (question) => {
    const r = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    })
    return new Promise((resolve, error) => {
        r.question(question, answer => {
            r.close()
            resolve(answer)
        })
    })
}

/* getUserInput: function to collect user inputs */
const getUserInput = async () => {
    try {
        let question = 'enter the command: '
        const answer = await askQuestion(question)
        return answer
    } catch (err) {
        return err
    }
}

/* errorLog: log error messages */
const errorLog = (msg) => {
    console.log(chalk.red(msg))
}

/* infoLog: log info messages */
const infoLog = (msg) => {
    console.log(chalk.yellow(msg))
}

/* outLog: log output */
const outLog = (msg) => {
    console.log(chalk.green(msg))
}

/*
 * showUsage: show cli usage
 * @params:
 * @returns:
 */
const showUsage = () => {
    const usageText = `

    Usage: canvas drawing CLI tool.

        Command         Description

        C w h           Should create a new canvas of width w and height h.

        L x1 y1 x2 y2   Should create a new line from (x1,y1) to (x2,y2). Currently only
                        horizontal or vertical lines are supported. Horizontal and vertical lines
                        will be drawn using the 'x' character.

        R x1 y1 x2 y2   Should create a new rectangle, whose upper left corner is (x1,y1) and
                        lower right corner is (x2,y2). Horizontal and vertical lines will be drawn
                        using the 'x' character.

        B x y c         Should fill the entire area connected to (x,y) with "colour" c. The
                        behaviour of this is the same as that of the "bucket fill" tool in paint
                        programs.

        Q               Should quit the program.

        `

    infoLog(usageText)
}

/*
 * validateCLIInputs: validate the cli inputs
 * @params: command : L, R, C
 * @params: inputs : cordinates
 * @returns: boolean
 */
const validateCLIInputs = (command, inputs) => {
    let success = true
    switch (command) {
        case 'C':
            if (inputs.length < 2 || inputs.length > 2) {
                errorLog('\ninvalid C cli input\n')
                success = false
            }
            break
        case 'L':
            if (inputs.length < 4 || inputs.length > 4) {
                errorLog('\ninvalid cli input\n')
                success = false
            }
            break
        case 'R':
            if (inputs.length < 4 || inputs.length > 4) {
                errorLog('\ninvalid cli input\n')
                success = false
            }
            break
        default:
            showUsage()
            break
    }
    return success
}

module.exports = {
    getUserInput,
    errorLog,
    infoLog,
    outLog,
    showUsage,
    validateCLIInputs
}
