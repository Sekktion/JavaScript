//Função simples implementando uso de promises para checar idade de um usuário de forma assíncrona.

function checaIdade(idade) {
    return new Promise((resolve, reject) => {
        if (idade >= 18) {
            setTimeout(function(){resolve('Success')},2000);
        } else {
            setTimeout(function(){reject('Failed')},2000);
        }
    })
}

checaIdade(20)
    .catch((message) => {
        console.log(message);
    })
    .then((message) => {
        console.log(message);
    })