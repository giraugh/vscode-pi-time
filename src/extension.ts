import { window, StatusBarAlignment, ExtensionContext, StatusBarItem, TextEditor } from 'vscode'

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

export const activate = ({ subscriptions }: ExtensionContext) => {
  console.log('Activate extension')

  // Create the status bar item
  const item: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 500)
  subscriptions.push(item)

  // Keep the item up to date
  subscriptions.push(window.onDidChangeActiveTextEditor(updateItem(item)))
  subscriptions.push(window.onDidChangeTextEditorSelection(updateItem(item)))
  setInterval(() => updateItem(item), 60 * 1000)

  updateItem(item)()
}
