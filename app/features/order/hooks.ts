import { useMutation } from '@tanstack/react-query';
import {
  createOrderAPI,
  type OrderRequestData,
  type OrderResponseData,
} from '~/remotes';

export function useOrder() {
  return useMutation<OrderResponseData, Error, OrderRequestData>({
    mutationFn: createOrderAPI,
  });
}
