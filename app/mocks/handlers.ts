import { http, HttpResponse } from 'msw';
import { z } from 'zod';
import {
  getMenu,
  getOrders,
  getOrder,
  createOrder,
  getPoints,
  updatePoints,
} from './db';

const orderSchema = z.object({
  items: z.array(
    z.object({
      menuItemId: z.string(),
      quantity: z.number().int().positive(),
      unitPrice: z.number().positive(),
    })
  ),
  totalAmount: z.number().nonnegative(),
  pointsUsed: z.number().nonnegative().default(0),
  customerPhone: z.string().optional(),
});

export const handlers = [
  // Get menu items (beverages and desserts)
  http.get('/api/menu', () => {
    const menu = getMenu();
    return HttpResponse.json(menu, { status: 200 });
  }),

  // Create a new order
  http.post('/api/order', async ({ request }) => {
    try {
      const body = await request.json();
      const validatedData = orderSchema.parse(body);

      // Calculate points earned (e.g., 1% of the total amount)
      const pointsEarned = Math.floor(validatedData.totalAmount * 0.01);

      // Create the order
      const order = createOrder({
        ...validatedData,
        pointsEarned,
      });

      // Update customer points if phone provided
      if (validatedData.customerPhone) {
        updatePoints(
          validatedData.customerPhone,
          pointsEarned - (validatedData.pointsUsed || 0)
        );
      }

      return HttpResponse.json(
        {
          success: true,
          order,
          message: '주문이 완료되었습니다.',
        },
        { status: 201 }
      );
    } catch (error) {
      return HttpResponse.json(
        {
          success: false,
          message: '주문 처리 중 오류가 발생했습니다.',
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 400 }
      );
    }
  }),

  // Get all orders
  http.get('/api/orders', () => {
    const orders = getOrders();
    return HttpResponse.json(orders, { status: 200 });
  }),

  // Get current points for a customer
  http.get('/api/points', ({ request }) => {
    const url = new URL(request.url);
    const phone = url.searchParams.get('phone');

    if (!phone) {
      return HttpResponse.json(
        {
          success: false,
          message: '전화번호가 필요합니다.',
        },
        { status: 400 }
      );
    }

    const pointsData = getPoints(phone);
    return HttpResponse.json(pointsData, { status: 200 });
  }),

  // Get receipt for specific order
  http.get('/api/receipt/:orderId', ({ params }) => {
    const orderId = params.orderId as string;
    const order = getOrder(orderId);

    if (!order) {
      return HttpResponse.json(
        {
          success: false,
          message: '해당 주문을 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    // Get menu items to include names in receipt
    const menu = getMenu();
    const receiptItems = order.items.map((item) => {
      const menuItem = menu.find((m) => m.id === item.menuItemId);
      return {
        ...item,
        name: menuItem?.name || '알 수 없는 상품',
        subtotal: item.quantity * item.unitPrice,
      };
    });

    const receipt = {
      orderId: order.id,
      timestamp: order.timestamp,
      items: receiptItems,
      totalAmount: order.totalAmount,
      pointsEarned: order.pointsEarned,
      pointsUsed: order.pointsUsed,
      finalAmount: order.totalAmount - order.pointsUsed,
      customerPhone: order.customerPhone,
    };

    return HttpResponse.json(receipt, { status: 200 });
  }),
];

export default handlers;
