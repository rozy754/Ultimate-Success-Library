export const API_BASE_URL =  "/api"

type RequestOptions = Omit<RequestInit, "body"> & { body?: any; parseJson?: boolean }

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`

  // ✅ Debug: Check all cookies and specifically auth cookies
  console.log("🍪 All document cookies:", document.cookie)
  console.log("🔐 Looking for access_token:", document.cookie.includes('access_token'))
  console.log("🔐 Looking for refresh_token:", document.cookie.includes('refresh_token'))

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  }

  const init: RequestInit = {
    method: options.method ?? (options.body ? "POST" : "GET"),
    headers,
    credentials: "include",
  }

  if (options.body !== undefined) {
    init.body = typeof options.body === "string" ? options.body : JSON.stringify(options.body)
  }

  const res = await fetch(url, init)
  const parseJson = options.parseJson !== false
  const data = parseJson ? await res.json().catch(() => null) : null

  return data as T
}

export const api = {
  get: <T>(p: string) => request<T>(p),
  post: <T>(p: string, body?: any) => request<T>(p, { method: "POST", body }),
  put:  <T>(p: string, body?: any) => request<T>(p, { method: "PUT", body }),
  del:  <T>(p: string) => request<T>(p, { method: "DELETE" }),
}
