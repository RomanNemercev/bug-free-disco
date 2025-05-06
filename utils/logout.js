export function logout() {
  try {
    document.cookie = 'auth_token=; Max-Age=0; path=/'
    document.cookie = 'auth_user=; Max-Age=0; path=/'
    const router = useRouter()
    router.replace('/auth')
  } catch (error) {
    console.error('Ошибка при разлогировании:', error)
  }
}
