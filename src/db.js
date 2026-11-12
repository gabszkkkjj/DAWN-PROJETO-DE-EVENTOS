const NOME = 'dawn-db'
const LOJA = 'kv'
let dbPromise

function abrir() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(NOME, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(LOJA)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}
const db = () => (dbPromise ??= abrir())

export async function ler(chave, padrao) {
  try {
    const d = await db()
    return await new Promise((resolve, reject) => {
      const r = d.transaction(LOJA).objectStore(LOJA).get(chave)
      r.onsuccess = () => resolve(r.result ?? padrao)
      r.onerror = () => reject(r.error)
    })
  } catch {
    return padrao
  }
}

export async function gravar(chave, valor) {
  try {
    const d = await db()
    await new Promise((resolve, reject) => {
      const t = d.transaction(LOJA, 'readwrite')
      const loja = t.objectStore(LOJA)
      if (valor === null) loja.delete(chave)
      // JSON.parse(JSON.stringify()) remove o Proxy do Vue, que o IndexedDB não aceita
      else loja.put(JSON.parse(JSON.stringify(valor)), chave)
      t.oncomplete = resolve
      t.onerror = () => reject(t.error)
    })
  } catch {
    /* sem armazenamento: segue só em memória */
  }
}