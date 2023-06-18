import instance from './instance'

// 密钥生成算法种类
export type KeyGenAlg = "ECC" | "RSA"

// 对称加密算法种类
export type SymEncAlg = "SM1" | "SM4" | "SM7" | "DES" | "AES"

// 非对成加密算法种类
export type AsymEncAlg = "SM2" | "SM9" | "RSA"

// 哈希算法
export type HashAlg = "SM3" | "SHA1" | "SHA256" | "MD2" | "MD5"

export interface KeyGenParams {
  params: Record<string, any>,
  keyGenAlg: KeyGenAlg
}

export function getKeys(params: KeyGenParams){
  return instance.get("/keygeneration", {
    params
  })
}