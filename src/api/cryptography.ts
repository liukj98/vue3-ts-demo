import instance from './instance'

import type { KeyGenParams, ResponseType } from '@/type/index'

export async function getKeys(params: KeyGenParams): Promise<ResponseType> {
  const res = await instance.get("/keygeneration", {
    params
  }) as ResponseType;
  return res;
}