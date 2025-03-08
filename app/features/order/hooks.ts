import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  createOrderAPI,
  getOrdersAPI,
  type OrderRequestData,
  type OrderResponseData,
} from '~/remotes';

export function useOrder() {
  return useMutation<OrderResponseData, Error, OrderRequestData>({
    mutationFn: createOrderAPI,
  });
}

export function useGetOrders() {
  return useSuspenseQuery<OrderResponseData['order'][]>({
    queryKey: ['orders'],
    queryFn: getOrdersAPI,
  });
}
