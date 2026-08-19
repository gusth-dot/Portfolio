// --- Configuração do Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyA9HNyFAtOr19hgBXmbWrh_AW-GR2glnsg",
  authDomain: "site-sobre-waf.firebaseapp.com",
  projectId: "site-sobre-waf",
  storageBucket: "site-sobre-waf.firebasestorage.app",
  messagingSenderId: "982970060543",
  appId: "1:982970060543:web:c8712e6b760c44d18186ca",
  measurementId: "G-Z2KCW5Y3RQ"
};

// --- Inicialize o Firebase corretamente ---
firebase.initializeApp(firebaseConfig);

// --- Inicializa o serviço de autenticação ---
const auth = firebase.auth();

// --- Função utilitária: exibir mensagens na tela ---
// Mostra mensagens de erro ou sucesso em um elemento com id="message"
window.showMessage = function(msg, isError = true) {
  const messageDisplay = document.getElementById('message');
  if (messageDisplay) {
    messageDisplay.textContent = msg;
    messageDisplay.style.color = isError ? 'red' : 'green';
  } else {
    console.warn("Elemento 'message' não encontrado na página para exibir:", msg);
  }
};

// --- Função para registrar um novo usuário ---
window.signupUser = async function(email, password) {
  window.showMessage(''); // Limpa mensagens anteriores
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    window.showMessage('Usuário registrado com sucesso!', false);
    // Redirecionamento será feito automaticamente pelo onAuthStateChanged
  } catch (error) {
    window.showMessage(`Erro ao registrar: ${error.message}`);
  }
};

// --- Função para fazer login de um usuário existente ---
window.loginUser = async function(email, password) {
  window.showMessage(''); // Limpa mensagens anteriores
  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.showMessage('Login efetuado com sucesso!', false);
    // Redirecionamento será feito automaticamente pelo onAuthStateChanged
  } catch (error) {
    window.showMessage(`Erro ao fazer login: ${error.message}`);
  }
};

// --- Função para fazer logout ---
window.logoutUser = async function() {
  window.showMessage(''); // Limpa mensagens anteriores
  try {
    await auth.signOut();
    window.showMessage('Você saiu da sua conta.', false);
    // Redirecionamento será feito automaticamente pelo onAuthStateChanged
  } catch (error) {
    window.showMessage(`Erro ao sair: ${error.message}`);
  }
};

// --- Ouvinte de estado de autenticação ---
// Este código é acionado sempre que o status de login muda (login/logout)
auth.onAuthStateChanged((user) => {
  const currentPath = window.location.pathname;

  if (user) {
    // Usuário está logado
    if (currentPath.includes('index.html') || currentPath.includes('cadastro.html') || currentPath === '/') {
      window.location.href = 'WAF.html'; // Redireciona para a página segura
    } else if (currentPath.includes('WAF.html')) {
      const userEmailDisplay = document.getElementById('userEmailDisplay');
      if (userEmailDisplay) {
        userEmailDisplay.textContent = user.email;
      }
    }
  } else {
    // Usuário está deslogado
    if (currentPath.includes('WAF.html')) {
      window.location.href = 'index.html'; // Volta para o login se deslogar
    }
  }
});
