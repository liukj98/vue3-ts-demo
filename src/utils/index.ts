export const deplay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve("")
    }, time)
  })
}

