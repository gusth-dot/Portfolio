// js/auth.js

// --- CONFIGURAÇÃO DO FIREBASE ---
// SUBSTITUA COMPLETAMENTE ESTE OBJETO COM O SEU REAL DO CONSOLE DO FIREBASE!
const firebaseConfig = {
  apiKey: "AIzaSyC3nvbdPqsfUzhLGmROTsoCE9B2hPpszrU",
  authDomain: "seguranca-tcc.firebaseapp.com",
  projectId: "seguranca-tcc",
  storageBucket: "seguranca-tcc.firebasestorage.app",
  messagingSenderId: "672880362327",
  appId: "1:672880362327:web:3501187739ac7cb18bf412",
  measurementId: "G-3H72XLD5HE"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- FUNÇÃO UTILITÁRIA: EXIBIR MENSAGENS NA TELA ---
// Esta função procura por um elemento com id="message" na página atual
// para exibir erros ou sucessos.
window.showMessage = function(msg, isError = true) {
    const messageDisplay = document.getElementById('message');
    if (messageDisplay) {
        messageDisplay.textContent = msg;
        messageDisplay.style.color = isError ? 'red' : 'green';
    } else {
        console.warn("Elemento 'message' não encontrado na página para exibir:", msg);
    }
};

// --- FUNÇÕES DE AUTENTICAÇÃO CHAMADAS PELAS PÁGINAS HTML ---

// Função para registrar um novo usuário
window.signupUser = async function(email, password) {
    window.showMessage(''); // Limpa mensagens anteriores
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        window.showMessage('Usuário registrado com sucesso! Faça login para continuar.', false);
        // Após cadastro, faz logout para que o usuário faça login
        await auth.signOut();
        // Redireciona para a página de login
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000); // Pequeno delay para mostrar a mensagem
    } catch (error) {
        window.showMessage(`Erro ao registrar: ${error.message}`);
    }
};

// Função para fazer login de um usuário existente
window.loginUser = async function(email, password) {
    window.showMessage('');
    try {
        await auth.signInWithEmailAndPassword(email, password);
        window.showMessage('Login efetuado com sucesso!', false);

        // 🔥 Redireciona imediatamente após login
        window.location.href = 'pagina-segura.html';

    } catch (error) {
        window.showMessage(`Erro ao fazer login: ${error.message}`);
    }
};

// Função para fazer logout
window.logoutUser = async function() {
    window.showMessage(''); // Limpa mensagens anteriores
    try {
        await auth.signOut();
        window.showMessage('Você saiu da sua conta.', false);
        // O redirecionamento para a página de login será feito pelo onAuthStateChanged
    } catch (error) {
        window.showMessage(`Erro ao sair: ${error.message}`);
    }
};

// --- OUVINTE DE ESTADO DE AUTENTICAÇÃO (onAuthStateChanged) ---
// Este é o coração do sistema. Ele é chamado sempre que o estado de autenticação muda
// (usuário logou, deslogou, ou a página foi carregada e o status é verificado).

// Flag para controlar redirecionamento automático na carga da página
let isInitialLoad = true;

auth.onAuthStateChanged((user) => {
    const currentPath = window.location.pathname;

    if (user) {
        // Usuário está logado
        // Se o usuário está na página segura, atualiza o e-mail exibido
        if (currentPath.includes('pagina-segura.html')) {
            const userEmailDisplay = document.getElementById('userEmailDisplay');
            if (userEmailDisplay) {
                userEmailDisplay.textContent = user.email;
            }
        }
        // Só redireciona automaticamente se NÃO for o carregamento inicial da página
        else if (!isInitialLoad && (currentPath.includes('index.html') || currentPath.includes('cadastro.html') || currentPath === '/')) {
            window.location.href = 'pagina-segura.html';
        }
    } else {
        // Usuário está deslogado
        // Se o usuário está na página segura e deslogou, ou acessou ela deslogado, redireciona para o login.
        if (currentPath.includes('pagina-segura.html')) {
            window.location.href = 'index.html';
        }
        // Em outras páginas (login, cadastro), não faz nada, pois é o estado esperado.
    }

    // Marca que o carregamento inicial foi processado
    if (isInitialLoad) {
        isInitialLoad = false;
    }
});