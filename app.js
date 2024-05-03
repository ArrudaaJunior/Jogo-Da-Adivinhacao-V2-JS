// Declaração de uma lista vazia para armazenar os números já sorteados
let listaDenumerosSorteados = [];

// Limite máximo para o número a ser sorteado
let numeroLimite = 10;

// Variável para armazenar o número secreto gerado aleatoriamente
let numeroSecreto = gerarNumeroAleatorio();

// Contador de tentativas do jogador
let tentativas = 1;

// Função para exibir texto na tela e falar o texto em português brasileiro usando a API responsiveVoice
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Função para exibir mensagem inicial do jogo
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha o número entre 1 e 10');
}

// Chamada da função para exibir a mensagem inicial do jogo
exibirMensagemInicial();

// Função para verificar o chute do jogador
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) { // Verifica se o chute do jogador é igual ao número secreto
        exibirTextoNaTela('h1', 'Acertou!'); // Exibe mensagem de acerto
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa'; // Verifica a concordância de "tentativa" ou "tentativas"
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`; // Monta a mensagem de acerto com o número de tentativas
        exibirTextoNaTela('p', mensagemTentativas); // Exibe a mensagem de acerto com o número de tentativas
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar o jogo

    } else { // Se o chute for incorreto
        if (chute > numeroSecreto) { // Verifica se o chute é maior que o número secreto
            exibirTextoNaTela('p', 'O número secreto é menor'); // Informa que o número secreto é menor
        } else { // Se o chute for menor que o número secreto
            exibirTextoNaTela('p', 'O número secreto é maior'); // Informa que o número secreto é maior
        }
        tentativas++; // Incrementa o número de tentativas
        limparCampo(); // Limpa o campo de entrada para o próximo chute
    }
}

// Função para gerar um número aleatório e garantir que não seja repetido
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório dentro do limite
    let quantidadeDeElementosNaLista = listaDenumerosSorteados.length; // Obtém a quantidade de elementos na lista de números sorteados

    if (quantidadeDeElementosNaLista == numeroLimite){ // Se a lista de números sorteados atingir o limite
        listaDenumerosSorteados = []; // Limpa a lista
    }

    if (listaDenumerosSorteados.includes(numeroEscolhido)){ // Verifica se o número já foi sorteado
        return gerarNumeroAleatorio(); // Se sim, chama recursivamente a função para gerar outro número
    } else { // Se o número ainda não foi sorteado
        listaDenumerosSorteados.push(numeroEscolhido); // Adiciona o número à lista de números sorteados
        return numeroEscolhido; // Retorna o número sorteado
    }
}

// Função para limpar o campo de entrada
function limparCampo() {
    chute = document.querySelector('input'); // Seleciona o campo de entrada
    chute.value = ''; // Limpa o valor do campo
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de entrada
    tentativas = 1; // Reinicia o contador de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial do jogo
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar o jogo
}
