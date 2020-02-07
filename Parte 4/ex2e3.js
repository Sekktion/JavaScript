/*  Curto programa para requisitar, utilizando Axios, os repositórios
*   de um usuário no Github e criando uma <ul> com o resultado
*   Mostra mensagem de carregamento enquanto requisita os dados
*   mostra mensagem de erro 404 caso o usuário não exista.
*/

var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var dados = [];

function renderDados() {
    listElement.innerHTML = '';
    for(dado of dados) {
        var dadoElement = document.createElement('li');
        var dadoText = document.createTextNode(dado);

        dadoElement.appendChild(dadoText);
        listElement.appendChild(dadoElement);
    }
    dados = [];
}

function procuraUsuario() {
    var inputText = inputElement.value;
    inputElement.value = '';
    listElement.innerHTML = '';
    mensagemCarregando();

    axios.get('https://api.github.com/users/' + inputText +'/repos')
        .then(function(response) {
            adicionarDados(response.data);
        })
        .catch(function(error) {
          console.warn(error);
          listElement.innerHTML = '';
          if (error.response.status === 404)
            mensagemErro();
        });
}

function adicionarDados(dadosRecebidos) {
    for (dado of dadosRecebidos) {
        dados.push(dado.name);
    }
    renderDados();
}

function mensagemCarregando() {
    var mensagemElement = document.createElement('li');
    var mensagemTextElement = document.createTextNode('Carregando...');

    mensagemElement.appendChild(mensagemTextElement);
    listElement.appendChild(mensagemElement);
}

function mensagemErro() {
    var mensagemElement = document.createElement('li');
    var mensagemTextElement = document.createTextNode('ERRO 404: Usuário não encontrado.');

    mensagemElement.appendChild(mensagemTextElement);
    listElement.appendChild(mensagemElement);
}

buttonElement.onclick = procuraUsuario;