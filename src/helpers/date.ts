export function parseDate(date: string | Date) {
  return new Date(date).toLocaleDateString("ru-RU");
}

export const today = new Date();
export const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
