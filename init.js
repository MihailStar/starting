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
        'bower.json',
        'package.json'
    ];

    paths.forEach((path) => {
        fs.readFile(path, 'utf-8', (error, data) => {
            if (error) {
                throw error;
            }

            data = data.replace(/("name": ").*(")/, `$1${name}$2`);

            fs.writeFile(path, data, (error) => {
                if (error) {
                    throw error;
                }
            });
        });
    });

    fs.writeFile('README.md', `# ${name}`, (error) => {
        if (error) {
            throw error;
        }
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