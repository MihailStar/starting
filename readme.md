# Стартовый шаблон для верстки

~~Nunjucks~~ Pug -> HTML, ~~Sass~~ SCSS -> PostCSS -> CSS, ~~Flow~~ TypeScript -> JavaScript

```bash
git clone https://github.com/MihailStar/starting.git --depth 1 new-project # клонирует репозиторий
git remote rm origin # (git remote remove origin) удаляет ссылку на origin репозиторий
git remote add origin https://github.com/MihailStar/new-repository.git # добавляет ссылку на origin репозиторий
git remote -v # (git remote --verbose) отображает ссылки на удаленные репозитории
npm i # (npm install) устанавливает зависимости

# либо

git clone https://github.com/MihailStar/starting.git --depth 1 new-project # клонирует репозиторий
cd new-project # переходит в папку проекта
rm -rf ./.git # (rm --recursive --force ./.git) удаляет основу репозитория
git init # создает основу репозитория
git remote add origin https://github.com/MihailStar/new-repository.git # добавляет ссылку на origin репозиторий
git remote -v # (git remote --verbose) отображает ссылки на удаленные репозитории
npm i # (npm install) устанавливает зависимости
```

```bash
npm run dev # стартует development сборку, с BrowserSync'ом и Watch'ером

# либо

npm run build # стартует production сборку, без BrowserSync'а и Watch'ера
```

```bash
npm run archive # архивирует production сборку ZIP'ом
npm run base64 # конвертирует изображения в Base64
npm run block new-block # создает папку блока new-block, с new-block.pug, new-block.scss, new-block.ts файлами
npm run deploy # разворачивает production сборку на Github Pages
npm run lint # проверяет наличие ошибок в скриптах, стилях, шаблонах
npm run lint:scripts # проверяет наличие ошибок в скриптах
npm run lint:styles # проверяет наличие ошибок в стилях
npm run lint:templates # проверяет наличие ошибок в шаблонах
npm run prettier # проверяет форматирование .css, .js, .pug, .scss, .ts файлов согласно Prettier и Prettier Plugins
npm run speller # ищет опечатки в ru текстах
npm run sprite # собирает векторный спрайт
```
