const fs = require('fs');
const usuariosJson = "usuarios.json"

function criarUsuario(dados){
    fs.readFile(usuariosJson, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return;
        }

        let objetosJSON = [];
        if (data) {
            try {
                objetosJSON = JSON.parse(data);
            } catch (err) {
                console.error('Erro ao processar o conteúdo do arquivo JSON:', err);
                return;
            }
        }

        objetosJSON.push(dados);
        const novoConteudoJSON = JSON.stringify(objetosJSON, null, 2);

        fs.writeFile(usuariosJson, novoConteudoJSON, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo JSON:', err);
                return;
            }
            console.log('Objeto adicionado com sucesso ao arquivo JSON.');
        });
    });
}

function coletarUsuarios() {
    return new Promise((resolve, reject) => {
        fs.readFile(usuariosJson, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo JSON:', err);
                reject(err);
                return;
            }

            try {
                // Converte o conteúdo em um objeto JavaScript
                const objetoJSON = JSON.parse(data);
                resolve(objetoJSON);
            } catch (err) {
                console.error('Erro ao processar o conteúdo do arquivo JSON:', err);
                reject(err);
            }
        });
    });
}

function coletarUsuarioPeloNome(nome) {
    return new Promise((resolve, reject) => {
        fs.readFile(usuariosJson, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo JSON:', err);
                reject(err);
                return;
            }

            try {
                // Converte o conteúdo em um objeto JavaScript
                const jsonData = JSON.parse(data);
                const resultado = jsonData.filter(item => item.usuario === nome);
                resolve(resultado);
            } catch (err) {
                console.error('Erro ao processar o conteúdo do arquivo JSON:', err);
                reject(err);
            }
        });
    });
}

function excluirUsuario(usuario){
    fs.readFile(usuariosJson, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            reject(err);
            return;
        }

        try {
            // Converte o conteúdo em um objeto JavaScript
            const jsonData = JSON.parse(data);
            const resultado = jsonData.filter(item => item.usuario !== usuario);
            const novoConteudoJSON = JSON.stringify(resultado, null, 2);

            fs.writeFile(usuariosJson, novoConteudoJSON, 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao escrever no arquivo JSON:', err);
                    return;
                }
                console.log('Objeto adicionado com sucesso ao arquivo JSON.');
            });
        } catch (err) {
            console.error('Erro ao processar o conteúdo do arquivo JSON:', err);
            reject(err);
        }
    });
}
module.exports = {
    criarUsuario,
    coletarUsuarios,
    coletarUsuarioPeloNome,
    excluirUsuario
};

