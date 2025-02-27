export function capitalise(text: string) {
  return text ? String(text[0]).toUpperCase() + String(text).slice(1) : "";
}

export function getRandInt(max: number) {
  return Math.floor(Math.random() * max);
}