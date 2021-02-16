export const userWithChatSessions = {
  user_id: "3",
  userName: "Seu nome",
  chatSessions: [
    {
      session_id: "1",
      title: "Sala de chat 1",
      participants: [
        { user_id: "1", userName: 'Karen' },
        { user_id: "2", userName: 'KYC' },
        { user_id: "3", userName: 'Seu nome' },
      ],
      unreadMessages: 1,
      lastMessage: {
        message_id: '1b',
        inlineButtons: [
          { label: "Detran-SP - Autenticidade. R$0,20" },
          { label: "Receita Federal - Antecedentes CPF. R$0,20" },
          { label: "Polícia Civil SP - Antecedentes. R$ 0,20" },
          { label: "Ficha de crédito. R$ 0,20" }
        ],
        user: { user_id: "2", userName: 'KYC' },
        timeStamp: 1612275839631,
      }
    },
    {
      session_id: "2",
      title: "Sala de chat 2",
      participants: [
        { user_id: "1", userName: 'Karen' },
        { user_id: "3", userName: 'Seu nome' },
      ],
      unreadMessages: 1,
      lastMessage: {
        message_id: '2a',
        textMessage: "Olá \n Meu nome é Karen, eu sou o robô assistente de cadastro da Intersowa OTC \n Vamos dar início ao seu processo de cadastramento?",
        inlineButtons: [
          { label: "Fazer meu Cadastro" },
          { label: "Informações sobre a Intersowa OTC" },
        ],
        user: { user_id: "1", userName: 'Karen' },
        timeStamp: 1612275839631,
      }
    },
    {
      session_id: "3",
      title: "Sala de chat 3",
      unreadMessages: 1,
      participants: [
        { user_id: "1", userName: 'Karen' },
      ],
      lastMessage: {
        message_id: '2a',
        textMessage: "any",
        user: { user_id: "1", userName: 'Karen' },
        timeStamp: 1612275839631,
      }
    }
  ]

}
