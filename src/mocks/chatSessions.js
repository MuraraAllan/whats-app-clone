export const chatSessionsMock = [
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
      message_id: '1a',
      textMessage: "Houve um cadastro de pessoa Física \n Informações: \n Nome: Fulano Pereira \n Data de Nascimento : 21/01/1992 \n CPF: 23.562.865-73 \n Endereço : Endereço informado, 1552 - Bombinhas, SC",
      inlineButtons: [
        { label: "Aprovar" },
        { label: "Rejeitar" },
        { label: "Solicitar Info Adicional" }
      ],
      user: { user_id: "1", userName: 'Karen' },
      timeStamp: 1612275839631,
    },
    messages: [
      {
        message_id: '1a',
        textMessage: "Houve um cadastro de pessoa Física \n Informações: \n Nome: Fulano Pereira \n Data de Nascimento : 21/01/1992 \n CPF: 23.562.865-73 \n Endereço : Endereço informado, 1552 - Bombinhas, SC",
        inlineButtons: [
          { label: "Aprovar" },
          { label: "Rejeitar" },
          { label: "Solicitar Info Adicional" }
        ],
        user: { user_id: "1", userName: 'Karen' },
        timeStamp: 1612275839631,
      },

    ]
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
      textMessage: "Ola, quer se cadastrar?",
      inlineButtons: [
        { label: "Fazer meu cadastro" },
      ],
      user: { user_id: "1", userName: 'Karen' },
      timeStamp: 1612275839631,
    },
    messages: [
      {
        message_id: '2a',
        textMessage: "Ola, quer se cadastrar?",
        inlineButtons: [
          { label: "Fazer meu cadastro", onClickAction: "openRegisteringForm" },
        ],
        user: { user_id: "1", userName: 'Karen' },
        timeStamp: 1612275839631,
      }
    ]
  },
  {
    session_id: "3",
    title: "Sala de chat 3",
    participants: [
      { user_id: "1", userName: 'Karen' },
    ],
    unreadMessages: 1,
    messages: [{
      message_id: '3a',
      textMessage: "any",
      user: { user_id: "1", userName: 'Karen' },
      timeStamp: 1612275839631,
    }, {
      message_id: '3B',
      textMessage: "any 2",
      user: { user_id: "1", userName: 'Karen' },
      timeStamp: 1612275839631,
    }],
    lastMessage:
    {
      message_id: '3a',
      textMessage: "any",
      user: { user_id: "1", userName: 'Karen' },
      timeStamp: 1612275839631,
    },
  },
]