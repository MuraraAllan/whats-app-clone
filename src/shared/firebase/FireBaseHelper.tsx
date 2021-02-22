import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcjq-tXMC5vJ_tarRgtxmJ76UXTtjC9I4",
  authDomain: "whatts-clone.firebaseapp.com",
  projectId: "whatts-clone",
  storageBucket: "whatts-clone.appspot.com",
  messagingSenderId: "1085524760430",
  appId: "1:1085524760430:web:130fdd8c00c4e213c8537f",
  measurementId: "G-FN30QQVFKP"
};



if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
firebase.auth()
let firestore = firebase.firestore()

const firebaseInstance = firebase

const firebaseLogin = async ({ username, password }: { username: string, password: string }) => {
  try {
    const login = await firebase.auth().signInWithEmailAndPassword(username, password)
    const fetchDocs = await firestore.collection('usersCollection').where('user_id', '==', login.user?.uid).get()
    const userData = fetchDocs.docs[0].data()
    return userData
  } catch (er) {
    return er
  }
}

const firebaseRegister = async ({ username, password }: { username: string, password: string }) => {
  try {
    const registeredUser = await firebase.auth().createUserWithEmailAndPassword(username, password)
    if (registeredUser.user == null) {
      throw new Error('not registered')
    }
    const addInitialChatSessions = await firestore.collection("usersCollection").add({
      user_id: registeredUser.user.uid,
      userName: "Seu nome",
      chatSessions: [
        {
          session_id: "1",
          title: "Sala de chat 1",
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

          lastMessage: {
            message_id: '2a',
            textMessage: "any",
            user: { user_id: "1", userName: 'Karen' },
            timeStamp: 1612275839631,
          }
        }
      ]
    })

    return registeredUser
  } catch (err) {
    return err
  }
}

export {
  firebaseRegister,
  firebaseLogin
}