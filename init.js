const fs = require('fs');
const prompt = require('prompt');

prompt.start();

prompt.get([{
    name: 'name-project',
    default: 'new-project'
}, {
    name: 'remove-underscores',
    default: 'false'
}], (error, result) => {
    if (error) {
        throw error;
    }

    result['name-project'] = result['name-project'].toLowerCase();
    result['remove-underscores'] = result['remove-underscores'].toLowerCase();

    renameProject(result['name-project']);

    if (result['remove-underscores'] === 'true') {
        removeUnderscores();
    }
});

const renameProject = (name) => {
    const paths = [
        ['bower.json', /("name": ").*(")/, `$1${name}$2`],
        ['package.json', /("name": ").*(")/, `$1${name}$2`],
        ['README.md', /(# ).*/, `$1${name}`]
    ];

    const replace = (fileName, regExp, newString) => {
        fs.readFile(fileName, 'utf-8', (error, data) => {
            if (error) {
                throw error;
            }

            data = data.replace(regExp, newString);

            fs.writeFile(fileName, data, (error) => {
                if (error) {
                    throw error;
                }
            });
        });
    };

    paths.forEach((path) => {
        replace(path[0], path[1], path[2]);
    });
};

const removeUnderscores = () => {
    const paths = [
        '_.csscomb.json',
        '_.eslintrc.json',
        '_.gitignore',
        '_.jsbeautifyrc'
    ];

    paths.forEach((path) => {
        fs.rename(path, path.slice(1), (error) => {
            if (error) {
                throw error;
            }
        });
    });
};