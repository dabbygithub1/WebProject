Calcora  — Умный калькулятор зарплаты и налогов


  

Calcora — это современный веб-сервис, позволяющий пользователям рассчитать свою зарплату с учётом налогов, больничных и профсоюзных взносов. Проект создан для повышения финансовой грамотности и прозрачности расчётов.



Используемые технологии
- React — библиотека для создания пользовательского интерфейса
- React Router — маршрутизация между страницами
- Firebase:
  - Authentication — регистрация и вход пользователей
  - Firestore (опционально) — хранение данных профиля
- CSS — стилизация и анимации интерфейса
- Recharts — визуализация налогов в виде диаграмм
- Lucide React — иконки



Запуск проекта локально

>Убедитесь, что у вас установлен Node.js

1. Клонируйте репозиторий:
    ```bash
   git clone https://github.com/dabbygithub1/WebProject.git
   cd calcora
    ```
2. Установите зависимости:

npm install

3. Cоздайте файл конфигурации Firebase:
В папке src/ создайте файл firebase.jsx и добавьте туда свою конфигурацию:

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

4. Запустите проект:

npm start

Откроется http://localhost:3000





Сайт задеплоен по адресу: calcoranet.netlify.app





Руководство пользователя:
- / — Главная: описание сервиса, блоки преимуществ, как работает и призыв к действию
- /login — Вход с помощью Firebase
- /register — Регистрация нового пользователя
- /calculator — Калькулятор зарплаты с подробным расчётом налогов и компенсаций
- /profile — Личный кабинет: редактирование данных, история, безопасность, настройки
- /professions — Информация по профессиям
- /contacts — Контакты
- /about — О проекте




Особенности проекта:
- Поддержка расчёта подоходного налога, взносов в ФСЗН и профсоюз
- Учёт больничных дней с компенсацией (80% и 100%)
- Визуализация данных в виде круговой диаграммы (Recharts)
- Интерактивный и адаптивный интерфейс
- Личный кабинет с вкладками: данные, безопасность, история, настройки
- Анимации при наведении и адаптация под мобильные устройства



