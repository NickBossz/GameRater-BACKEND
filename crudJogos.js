const avaliacoesJson = "avaliacoes.json"
const fs = require('fs');

function adicionarJogo(dados){
    fs.readFile(avaliacoesJson, 'utf8', (err, data) => {
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

        fs.writeFile(avaliacoesJson, novoConteudoJSON, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo JSON:', err);
                return;
            }
            console.log('Objeto adicionado com sucesso ao arquivo JSON.');
        });
    });
}

async function coletarJogos() {
    return new Promise((resolve, reject) => {
        fs.readFile(avaliacoesJson, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo JSON:', err);
                reject(err);
                return;
            }

            try {
                // Converte o conteúdo em um objeto JavaScript
                const objetoJson = JSON.parse(data);
                resolve(objetoJson);
            } catch (err) {
                console.error('Erro ao processar o conteúdo do arquivo JSON:', err);
                reject(err);
            }
        });
    });
}

function coletarJogoPeloUUID(uuid) {
    return new Promise((resolve, reject) => {
        fs.readFile(avaliacoesJson, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo JSON:', err);
                reject(err);
                return;
            }

            try {
                // Converte o conteúdo em um objeto JavaScript
                const jsonData = JSON.parse(data);
                const resultado = jsonData.filter(item => item.uuid === uuid);
                resolve(resultado);
            } catch (err) {
                console.error('Erro ao processar o conteúdo do arquivo JSON:', err);
                reject(err);
            }
        });
    });
}

function excluirJogo(uuid){
    fs.readFile(avaliacoesJson, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            reject(err);
            return;
        }

        try {
            // Converte o conteúdo em um objeto JavaScript
            const jsonData = JSON.parse(data);
            const resultado = jsonData.filter(item => item.uuid !== uuid);
            const novoConteudoJSON = JSON.stringify(resultado, null, 2);

            fs.writeFile(avaliacoesJson, novoConteudoJSON, 'utf8', (err) => {
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
    adicionarJogo,
    coletarJogos,
    coletarJogoPeloUUID,
    excluirJogo
};