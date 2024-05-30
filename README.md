### Перед началом:
Весь оверлей работает на `nodejs`, поэтому, если у вас его нет - надо [установить с офф сайта](https://nodejs.org/en).<br/>
Проверить установлен ли `nodejs` можно, написав в консоли
```
node --version
```
#### Должен показать версию библиотеки
![image](https://github.com/supchyan/kimi-music-obs/assets/123704468/8c959592-fc39-4211-ad79-5d7590537e23)

#### Если есть, то можно ехать дальше! А если не работает и пишет, что команды `node` нет, то перезапустите компьютер. Винда система кала, смиритесь.

### Как установить сервер оверлея
Приложение не имеет хоста (я бомж), поэтому кому надо, сами и хостите. Вот как:
1. Заходим в папку репозитория и открываем в ней консоль
23. Пишем эти команды в порядке очереди:
```
npm init
npm i vue.js tmi.js @vue-youtube/core
```
Команды установят нужные для работы приложения пакеты (их просто много, поэтому я их на гитхаб не залил)<br/>

#### На этом моменте проблем возникнуть не должно, так что можно идти дальше

### Как запустить сервер:
В папке репозитория открываем консоль и пишем:
```
npm run dev
```
#### Если всё ок, то увидите это:
![image](https://github.com/supchyan/kimi-music-obs/assets/123704468/e10b5d00-9f58-4a2e-984d-39de64dea6b8)

### Как добавить оверлей в обс:
1. Создаем окно браузера в обс
2. Открываем его свойства и убираем галочку с `Локальный файл`, если стоит, а если не стоит, то тоже убираем В-)
3. Пишем туда адрес сервера из консоли
4. Выставляем размеры окна `640 x 360`
5. Нажимаем `ОК`
<br/><br/>
#### Должно выглядеть как-то так:
![image](https://github.com/supchyan/kimi-music-obs/assets/123704468/f70c46e1-6095-432d-992f-8804b041882b)

### ВАЖНО! Настройка конфига:
1. Создаем в корневой папке `config.json`
2. Пишем в него следующее:
```json
{
  "channel":"ваш username канала"
  "token":"ваш oauth токен"
  "rewardTitle":"оставьте пустым"
}
```
Где взять `token`? [Тут](https://twitchapps.com/tmi/)

### Что дальше?
В целом с этого момента оверлей работает и ищет ссылки на ютуб в чате на твиче с приритетом `зритель >>> стример` <br/>
Оверлей проигрывает треки попорядку, если вообще есть что проигрывать, а если нечего, то просто уходит в сон до следующей ссылки в чате. <br/>
Работает только с ютубом, youtube shorts не поддерживает, но поддерживает стримы, так что прямые трансляции музыки в оверлее работают. ( lofi девочка вперед ) <br/>
#### На этом всё, до новых встреч!
