# Стартовый шаблон для верстки

HTML(~~Nunjucks~~ Pug), CSS(~~Sass~~ SCSS, PostCSS), JavaScript(Webpack, Babel)

```bash
git clone https://github.com/MihailStar/starting.git --depth 1 new-project # клонировать репозиторий
cd new-project # перейти в папку проекта
rm -rf .git # удалить основу репозитория
git init # создать основу репозитория
git remote add origin https://github.com/MihailStar/new-repository.git # добавить ссылку на origin репозиторий
git remote -v # сверить ссылки на удаленные репозитории
```

```bash
npm i # установить зависимости
```

```bash
npm run dev # development сборка, с BrowserSync'ом и Watch'ером
npm run prod # production сборка, без BrowserSync'а и Watch'ера
```

```bash
npm run base64 # конвертировать изображения в Base64
npm run archive # архивировать production сборку ZIP'ом
npm run deploy # развернуть production сборку на Github Pages
npm run sprite # генерировать спрайт из SVG изображений
```
