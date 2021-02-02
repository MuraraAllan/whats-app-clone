enum InlineButtonsActions {
  REGISTER_NEW_USER
}

interface InlineButtons {
  label: string,
  onClickAction: InlineButtonsActions
}

export default interface Message {
  message_id: string,
  textMessage: string,
  inlineButtons: InlineButtons[],
  attachment: Buffer
}