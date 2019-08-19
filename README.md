# Стартовый шаблон для верстки

HTML(~~Nunjucks~~ Pug), CSS(~~Sass~~ SCSS, PostCSS), JavaScript(Webpack, Babel)

```bash
git clone https://github.com/MihailStar/starting.git --depth 1 new-project # клонирует репозиторий
git remote rm origin # удаляет ссылку на origin репозиторий
git remote add origin https://github.com/MihailStar/new-repository.git # добавляет ссылку на origin репозиторий
git remote -v # показывает ссылки на удаленные репозитории

# либо

git clone https://github.com/MihailStar/starting.git --depth 1 new-project # клонирует репозиторий
cd new-project # переходит в папку проекта
rm -rf .git # удаляет основу репозитория
git init # создает основу репозитория
git remote add origin https://github.com/MihailStar/new-repository.git # добавляет ссылку на origin репозиторий
git remote -v # показывает ссылки на удаленные репозитории
```

```bash
npm i # установливает зависимости
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
npm run lint # проверяет наличие ошибок в .pug, .scss, .js файлах
npm run lintjs # проверяет наличие ошибок в .js файлах
npm run lintpug # проверяет наличие ошибок в .pug файлах
npm run lintscss # проверяет наличие ошибок в .scss файлах
npm run prettier # проверяет форматирование .scss, .js, .json файлов согласно Prettier
```
