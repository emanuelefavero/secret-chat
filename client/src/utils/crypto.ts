// * Encrypt data
// Encrypts and decrypts text using AES-GCM with a 256-bit key derived from a password

export async function encryptData(
  plaintext: string,
  cryptoKey: string
): Promise<string> {
  const pwUtf8 = new TextEncoder().encode(cryptoKey)
  const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const alg = { name: 'AES-GCM', iv: iv }
  const key = await crypto.subtle.importKey('raw', pwHash, alg, false, [
    'encrypt',
  ])
  const ptUint8 = new TextEncoder().encode(plaintext)
  const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUint8)
  const ctArray = Array.from(new Uint8Array(ctBuffer))
  const ctStr = ctArray.map((byte) => String.fromCharCode(byte)).join('')
  const ctBase64 = btoa(ctStr)
  const ivHex = Array.from(iv)
    .map((b) => ('00' + b.toString(16)).slice(-2))
    .join('')
  return ivHex + ctBase64
}

// * Decrypt data
// Decrypts text encrypted with `encryptData` method

export async function decryptData(
  cipherText: string,
  cryptoKey: string
): Promise<string> {
  const pwUtf8 = new TextEncoder().encode(cryptoKey)
  const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8)
  const iv = cipherText
    .slice(0, 24)
    .match(/.{2}/g)
    ?.map((byte) => parseInt(byte, 16))
  if (!iv) throw new Error('IV could not be parsed.')

  const ctStr = atob(cipherText.slice(24))
  const ctUint8 = new Uint8Array(
    ctStr.match(/[\s\S]/g)?.map((ch) => ch.charCodeAt(0)) || []
  )

  if (!iv) throw new Error('IV could not be derived from ciphertext.')
  const alg = { name: 'AES-GCM', iv: new Uint8Array(iv) }
  const key = await crypto.subtle.importKey('raw', pwHash, alg, false, [
    'decrypt',
  ])
  const ptBuffer = await crypto.subtle.decrypt(alg, key, ctUint8)
  const plaintext = new TextDecoder().decode(ptBuffer)
  return plaintext
}
