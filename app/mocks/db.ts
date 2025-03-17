import type { MenuItem, Order, Points } from './types';
import { LiveStorage } from '@mswjs/storage';
import { nanoid } from 'nanoid';

// Menu items data
const menuItems: MenuItem[] = [
  {
    id: 'americano',
    name: '아메리카노',
    price: 4500,
    category: 'beverage',
    image: '/images/americano.jpg',
    description: '진한 에스프레소와 뜨거운 물을 섞은 클래식 커피',
    optionGroups: [
      {
        name: 'temperature',
        exclusive: true,
        options: [{ name: 'ICE' }, { name: 'HOT' }],
      },
      {
        name: 'size',
        exclusive: true,
        options: [
          { name: 'Regular' },
          { name: 'Large', price: 500 },
          { name: 'Max', price: 1000 },
        ],
      },
      {
        name: 'extras',
        exclusive: false,
        options: [{ name: '연하게' }, { name: '2샷', price: 500 }],
      },
    ],
  },
  {
    id: 'latte',
    name: '카페라떼',
    price: 5000,
    category: 'beverage',
    image: '/images/latte.jpg',
    description: '에스프레소와 스팀밀크의 조화',
    optionGroups: [
      {
        name: 'temperature',
        exclusive: true,
        options: [{ name: 'ICE' }, { name: 'HOT' }],
      },
      {
        name: 'size',
        exclusive: true,
        options: [
          { name: 'Regular' },
          { name: 'Large', price: 500 },
          { name: 'Max', price: 1000 },
        ],
      },
      {
        name: 'extras',
        exclusive: false,
        options: [{ name: '2샷', price: 500 }],
      },
    ],
  },
  {
    id: 'milktea',
    name: '얼그레이 밀크티',
    price: 5500,
    category: 'beverage',
    image: '/images/milktea.jpg',
    description: '얼그레이 향과 부드러운 우유가 어우러진 홍차 음료',
    optionGroups: [
      {
        name: 'temperature',
        exclusive: true,
        options: [{ name: 'ICE' }, { name: 'HOT' }],
      },
      {
        name: 'size',
        exclusive: true,
        options: [
          { name: 'Regular' },
          { name: 'Large', price: 500 },
          { name: 'Max', price: 1000 },
        ],
      },
      {
        name: 'extras',
        exclusive: false,
        options: [{ name: '두유로 변경' }, { name: '2샷', price: 500 }],
      },
    ],
  },
  {
    id: 'croissant',
    name: '크로와상',
    price: 3800,
    category: 'dessert',
    image: '/images/croissant.jpg',
    description: '바삭한 겉면과 부드러운 속을 가진 프랑스 대표 빵',
  },
  {
    id: 'cheesecake',
    name: '치즈케이크',
    price: 5500,
    category: 'dessert',
    image: '/images/cheesecake.jpg',
    description: '부드럽고 풍부한 맛의 뉴욕 스타일 치즈케이크',
  },
];

// Function to get menu items
export function getMenu(): MenuItem[] {
  return menuItems;
}

const orders = new LiveStorage<Order[]>('orders', []);
const pointsStore: Points[] = [];

export function getOrders() {
  return orders.getValue();
}

export function getOrder(id: string) {
  return orders.find((order) => order.id === id);
}

export function createOrder(order: Omit<Order, 'id' | 'timestamp'>) {
  const newOrder: Order = {
    ...order,
    id: nanoid(),
    timestamp: new Date().toISOString(),
  };

  orders.update((prevOrders) => prevOrders.concat(newOrder));
  return newOrder;
}

export function getPoints(phone: string) {
  return pointsStore.find((p) => p.phone === phone) || { phone, points: 0 };
}

export function updatePoints(phone: string, pointsToAdd: number) {
  const customerPoints = pointsStore.find((p) => p.phone === phone);

  if (customerPoints) {
    customerPoints.points += pointsToAdd;
    return customerPoints;
  } else {
    const newPoints = { phone, points: pointsToAdd };
    pointsStore.push(newPoints);
    return newPoints;
  }
}
