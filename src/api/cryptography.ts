import instance from './instance'

export type KeyGenAlg = "ECC" | "RSA"

interface KeyParams {
  params: Record<string, any>,
  keyGenAlg: KeyGenAlg
}

export function getKeys(params: KeyParams){
  return instance.get("/keygeneration", {
    params
  })
}