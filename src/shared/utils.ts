const uniqueId = () => {
  let id = 0

  return () => {
    id++
    return id
  }
}
export const id = uniqueId()

export const cn = (...args: (string | boolean | undefined)[]) =>
  args.filter(Boolean).join(' ')
