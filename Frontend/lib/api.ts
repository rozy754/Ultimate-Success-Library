export const API_BASE_URL = "/api"

type RequestOptions = Omit<RequestInit, "body"> & { body?: any; parseJson?: boolean }

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`

  // Debug cookies
  console.log("🍪 document.cookie:", document.cookie)

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  }

  const fetchOptions: RequestInit = {
    method: options.method || "GET",
    headers,
    credentials: "include",               // ✅ send access_token/refresh_token cookies
  }

  if (options.body !== undefined) {
    fetchOptions.body = typeof options.body === "string"
      ? options.body
      : JSON.stringify(options.body)
  }

  const res = await fetch(url, fetchOptions)

  // Try to parse JSON always
  const contentType = res.headers.get("content-type") || ""
  const isJson = contentType.includes("application/json")
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null)

  if (!res.ok) {
    // Handle auth failures gracefully
    if (res.status === 401 || res.status === 403) {
      console.warn("Unauthorized/Forbidden. Redirecting to login.")
      // Let caller handle error; do not return null to avoid UI crashes
    }
    const message = (isJson && data && (data.message || data.error)) || `HTTP ${res.status}`
    throw new Error(message)
  }

  return data as T
}

export const api = {
  get:  <T>(p: string) => request<T>(p),
  post: <T>(p: string, body?: any) => request<T>(p, { method: "POST", body }),
  put:  <T>(p: string, body?: any) => request<T>(p, { method: "PUT", body }),
  patch:<T>(p: string, body?: any) => request<T>(p, { method: "PATCH", body }),
  del:  <T>(p: string) => request<T>(p, { method: "DELETE" }),
  delWithBody:<T>(p: string, body?: any) => request<T>(p, { method: "DELETE", body }),
}
