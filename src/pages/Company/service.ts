import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/company', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/company', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(data: TableListItem) {
  return request('/api/company', {
    method: 'POST',
    data,
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/company', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
