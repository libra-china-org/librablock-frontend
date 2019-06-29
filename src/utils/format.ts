export function formatDateTime (str: string) : string {
  const date = new Date(str)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}