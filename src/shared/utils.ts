let initId = 0

export const id = () => {
  initId++
  return initId
}

export const cn = (...args: (string | boolean | undefined)[]) =>
  args.filter(Boolean).join(' ')
