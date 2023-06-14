export const deplay = (time: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("123")
    }, time)
  })
}

