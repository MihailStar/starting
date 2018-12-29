# Стартовый шаблон для верстки

Gulp + HTML(~~Nunjucks~~, Pug) + CSS(~~Sass~~, SCSS) + JavaScript(Babel, Webpack)

- `git clone https://github.com/MihailStar/starting.git --depth 1 new-project` - клонировать репозиторий
- `git remote rm origin` - удалить ссылку на origin репозиторий
- `git remote add origin https://github.com/MihailStar/new-repository.git` - добавить ссылку на origin репозиторий
- `git remote -v` - сверить ссылки на удаленные репозитории

* `npm i` - установить зависимости
* `npm run dev` - development сборка, с BrowserSync'ом и Watch'ером
* `npm run prod` - production сборка, без BrowserSync'а и Watch'ера

- `npm run base64` - конвертировать изображения в Base64
- `npm run archive` - архивировать production сборку ZIP'ом
- `npm run deploy` - развернуть production сборку на Github Pages
- `npm run sprite` - генерировать спрайт из SVG изображений
