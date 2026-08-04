const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<{ success: boolean }> {
  const now = Date.now()
  const windowMs = windowSeconds * 1000

  const record = rateLimitStore.get(key)

  if (!record) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return { success: true }
  }

  if (now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return { success: true }
  }

  if (record.count >= limit) {
    return { success: false }
  }

  record.count += 1
  return { success: true }
}
