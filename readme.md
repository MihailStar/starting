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
npm run block example # создает папку блока example, с example.js, example.pug, example.scss файлами
npm run deploy # разворачивает production сборку на Github Pages
npm run lint # проверяет наличие ошибок в скриптах, стилях, шаблонах
npm run lint:scripts # проверяет наличие ошибок в скриптах
npm run lint:styles # проверяет наличие ошибок в стилях
npm run lint:templates # проверяет наличие ошибок в шаблонах
npm run prettier # проверяет форматирование .js, .pug, .scss, .svg файлов согласно Prettier и Prettier Plugins
npm run speller # ищет опечатки в ru текстах
npm run sprite # собирает векторный спрайт
```
