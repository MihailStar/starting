# Стартовый шаблон для верстки

Pug -> HTML, SCSS -> PostCSS -> CSS, TypeScript -> JavaScript

## Установка

### С использованием шаблонного репозитория

https://github.com/MihailStar/starting/generate - создает новый репозиторий, из данного шаблона, для [залогинившегося](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2FMihailStar%2Fstarting) пользователя GitHub

```bash
git clone https://github.com/{login}/{repository}.git  # клонирует репозиторий
npm i  # устанавливает зависимости
```

### Без использования шаблонного репозитория

```bash
git clone https://github.com/MihailStar/starting.git --depth 1  # клонирует репозиторий
git remote rm origin  # удаляет ссылку на origin репозиторий
git remote add origin https://github.com/{login}/{repository}.git  # добавляет ссылку на origin репозиторий
npm i  # устанавливает зависимости
```

либо

```bash
git clone https://github.com/MihailStar/starting.git --depth 1  # клонирует репозиторий
cd starting  # переходит в папку проекта
rm -rf ./.git  # удаляет основу репозитория
git init  # создает основу репозитория
git remote add origin https://github.com/{login}/{repository}.git  # добавляет ссылку на origin репозиторий
npm i  # устанавливает зависимости
```

\* где `{login}` - логин на GitHub, `{repository}` - название репозитория, созданного из шаблона

## Запуск

### В development режиме

```bash
npm run dev  # стартует development сборку, с BrowserSync'ом и Watch'ером
```

### В production режиме

```bash
npm run build  # стартует production сборку, без BrowserSync'а и Watch'ера
```

## Команды

```bash
npm run archive  # архивирует production сборку ZIP'ом
npm run base64  # конвертирует изображения в Base64
npm run component new-block  # создает папку компонента new-block, с new-block.pug, new-block.scss, new-block.ts файлами
npm run clear  # удаляет папку сборки
npm run deploy  # разворачивает production сборку на Github Pages
npm run lint  # проверяет наличие ошибок в скриптах, стилях, шаблонах
npm run lint:scripts  # проверяет наличие ошибок в скриптах
npm run lint:styles  # проверяет наличие ошибок в стилях
npm run lint:templates  # проверяет наличие ошибок в шаблонах
npm run prettier  # проверяет форматирование .css, .js, .pug, .scss, .ts файлов согласно Prettier и Prettier Plugins
npm run speller  # ищет опечатки в ru текстах
npm run sprite  # собирает векторный спрайт
```

---

2016 - 2022
