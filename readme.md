# Стартовый шаблон для верстки

HTML(~~Nunjucks~~ Pug), CSS(~~Sass~~ SCSS, PostCSS), JavaScript(Webpack, Babel)

```bash
git clone https://github.com/MihailStar/starting.git --depth 1 new-project # клонирует репозиторий
git remote rm origin # удаляет ссылку на origin репозиторий
git remote add origin https://github.com/MihailStar/new-repository.git # добавляет ссылку на origin репозиторий
git remote -v # отображает ссылки на удаленные репозитории
npm i # устанавливает зависимости

# либо

git clone https://github.com/MihailStar/starting.git --depth 1 new-project # клонирует репозиторий
cd new-project # переходит в папку проекта
rm -rf .git # удаляет основу репозитория
git init # создает основу репозитория
git remote add origin https://github.com/MihailStar/new-repository.git # добавляет ссылку на origin репозиторий
git remote -v # отображает ссылки на удаленные репозитории
npm i # устанавливает зависимости
```

```bash
npm run dev # стартует development сборку, с BrowserSync'ом и Watch'ером

# либо

npm run prod # стартует production сборку, без BrowserSync'а и Watch'ера
```

```bash
npm run archive # архивирует production сборку ZIP'ом
npm run base64 # конвертирует изображения в Base64
npm run deploy # разворачивает production сборку на Github Pages
npm run lint # проверяет наличие ошибок в .js, .pug, .scss файлах
npm run lint:js # проверяет наличие ошибок в .js файлах
npm run lint:pug # проверяет наличие ошибок в .pug файлах
npm run lint:scss # проверяет наличие ошибок в .scss файлах
npm run prettier # проверяет форматирование .js, .pug, .scss файлов согласно Prettier
npm run speller # ищет опечатки в ru текстах
npm run sprite # собирает векторный спрайт
```

```bash
├ gulp/
│ ├ tasks/
│ │ ├ archive.js
│ │ ├ base64.js
│ │ ├ build.js
│ │ ├ clean.js
│ │ ├ deploy.js
│ │ ├ development.js
│ │ ├ fonts.js
│ │ ├ images.js
│ │ ├ production.js
│ │ ├ scripts.js
│ │ ├ server.js
│ │ ├ sprite.js
│ │ ├ styles.js
│ │ ├ templates.js
│ │ └ watch.js
│ └ configuration.js
├ src/ # исходные файлы
│ ├ blocks/ # блоки
│ │ └ example/ # блок example
│ │   ├ example.js # скрипты блока example
│ │   ├ example.pug # разметка блока example
│ │   ├ example.scss # стили блока example
│ │   └ example.svg # изображение блока example
│ ├ fonts/ # шрифты
│ ├ images/ # изображения
│ │ ├ base64/ # изображения для конвертации в Base64
│ │ ├ content/ # контентные изображения
│ │ └ sprite/ # изображения для сборки векторного спрайта
│ ├ scripts/ # скрипты
│ │ ├ imported-blocks.js # скрипты импортируемых блоков
│ │ ├ main.js # точка входа сборки скриптов
│ │ └ utilities.js # утилиты
│ ├ styles/ # стили
│ │ ├ base.scss # базовые стили
│ │ ├ fonts.scss # шрифты
│ │ ├ grid.scss # сетка
│ │ ├ imported-blocks.scss # стили импортируемых блоков
│ │ ├ main.scss # точка входа сборки стилей
│ │ ├ utilities.scss # утилиты
│ │ └ variables.scss # переменные
│ ├ templates/ # шаблоны
│ │ ├ base.pug # базовый шаблон
│ │ ├ imported-blocks.pug # шаблоны импортируемых блоков
│ │ └ utilities.pug # утилиты
│ └ index.pug # разметка страницы
├ .babelrc
├ .browserslistrc
├ .editorconfig
├ .eslintignore
├ .eslintrc
├ .gitattributes
├ .gitignore
├ .htmlhintrc # конфигурация Visual Studio Code плагина HTMLHint
├ .huskyrc
├ .lintstagedrc
├ .postcss-sorting.json # конфигурация Visual Studio Code плагина Post​CSS Sorting
├ .prettierignore
├ .prettierrc
├ .pug-lintrc
├ .stylelintignore
├ .stylelintrc
├ .yaspellerrc
├ gulpfile.babel.js
├ package.json
├ readme.md
└ webpack.config.babel.js
```
