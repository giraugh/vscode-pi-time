import { window, StatusBarAlignment, StatusBarItem } from 'vscode'

const isPiTime = (): boolean => {
  const now = new Date()
  return (now.getHours() === 3 || now.getHours() === 15) && (now.getMinutes() === 14)
}

const updateItem = (item: StatusBarItem) => () => {
  if (isPiTime()) {
    item.text = '🥧'
    item.tooltip = 'It\'s pi time!'
    item.show()
  } else {
    item.hide()
  }
}

export const activate = () => {
  // Create the status bar item
  const item: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 500)

  // Keep the item up to date
  setInterval(updateItem(item), 2000)
}
