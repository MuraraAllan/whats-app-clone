// this is created as an util cause it can be used also to convert date in messages
// if we want to display them. 
// Layering the converter to the mainPage separates this to be used exclusivelly at mainPage
// if it were to be shared, we should use an utils on shared area

export const timeStampToTimeConverter = (messageTimestamp: number) => {
  const messageDate = new Date(messageTimestamp)
  const now = new Date()
  const isToday = messageDate.getDate() === now.getDate() && messageDate.getMonth() === now.getMonth() && messageDate.getFullYear() === now.getFullYear()

  if (isToday) {
    return messageDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }
  return messageDate.toLocaleDateString()
}