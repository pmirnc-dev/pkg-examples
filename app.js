const { select, checkbox } = require('@inquirer/prompts');
const { parse } = require('yaml');
const fs = require('fs');
const path = require('path');
(async () => {
    function convertOptions(options) {
        const { label, value, description } = options;
        return { name: label, value, description: description || label };
    }

    function generateQuestions(question) {
        const { index, content: message, options, type } = question;
        if (type === 'checkbox') return checkbox({ message, choices: options.map(convertOptions) });
        return select({ message, choices: options.map(convertOptions) });
    }

    const assetsPath = path.join(__dirname,'assets/questions.yaml');
    const { questions } = parse(fs.readFileSync(assetsPath, 'utf8'));

    for (const question of questions) {
        const { index, content: message, options, type } = question;
        const answer = await generateQuestions(question);
    }
})();
