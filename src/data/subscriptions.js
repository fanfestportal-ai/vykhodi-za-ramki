export const SUBSCRIPTION_VARIANTS = [
  { id: 'milk', label: 'Молочный', bg: '#F5F0EC', fg: '#74152F', accent: '#B9C7D2' },
  { id: 'burgundy', label: 'Бордовый', bg: '#74152F', fg: '#F5F0EC', accent: '#E8D9D5' },
  { id: 'blue', label: 'Голубой', bg: '#B9C7D2', fg: '#343238', accent: '#74152F' },
  { id: 'graphite', label: 'Графит', bg: '#343238', fg: '#F5F0EC', accent: '#B9C7D2' },
];

export const subscriptions = [
  { id: 'trial', title: 'Пробное занятие', description: 'Знакомство с пространством.', price: 'Стоимость уточняется', features: ['Одно занятие', 'Любое направление'], variant: 'milk', highlighted: false },
  { id: 'pack-4', title: 'Абонемент на 4 занятия', description: 'Оптимальный старт.', price: 'Стоимость уточняется', features: ['4 посещения', 'Срок — 30 дней'], variant: 'burgundy', highlighted: false },
  { id: 'pack-8', title: 'Абонемент на 8 занятий', description: 'Для регулярных тренировок.', price: 'Стоимость уточняется', features: ['8 посещений', 'Срок — 45 дней', 'Заморозка до 3 дней'], variant: 'burgundy', highlighted: true },
  { id: 'unlimited', title: 'Безлимитный абонемент', description: 'Без ограничений.', price: 'Стоимость уточняется', features: ['Без ограничений', 'Срок — 30 дней'], variant: 'graphite', highlighted: false },
  { id: 'gift', title: 'Подарочный сертификат', description: 'Подарите движение.', price: 'Стоимость уточняется', features: ['Любая сумма', 'Срок — 6 месяцев'], variant: 'blue', highlighted: false },
];
