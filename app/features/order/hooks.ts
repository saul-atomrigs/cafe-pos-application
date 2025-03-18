import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '~/constants';
import {
  createOrderAPI,
  getOrdersAPI,
  type Order,
  type OrderRequestData,
  type OrderResponseData,
} from '~/remotes';

export function useOrder() {
  return useMutation<OrderResponseData, Error, OrderRequestData>({
    mutationFn: createOrderAPI,
  });
}

export function useGetOrders() {
  return useSuspenseQuery<Order[]>({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: getOrdersAPI,
  });
}
