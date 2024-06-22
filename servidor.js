const express = require('express');
const cors = require('cors');
const avaliacoesJson = "avaliacoes.json"
const fs = require('fs');
const servidorBackend = express();
const portaServidorBackend = 8086;
const {adicionarJogo, coletarJogos, coletarJogoPeloUUID, excluirJogo} = require("./crudJogos.js")
const {criarUsuario, coletarUsuarios, coletarUsuarioPeloNome, excluirUsuario} = require("./crudUsuarios.js")
const {coletarDenuncias, adicionarDenuncia, coletarDenunciaPeloUUID, excluirDenuncia} = require("./crudDenuncias.js")

servidorBackend.use(cors());
servidorBackend.use(express.json());
servidorBackend.set('view engine', 'ejs');

servidorBackend.listen(portaServidorBackend, () => console.log(`servidor backend rodando em http://localhost:${portaServidorBackend}`));

servidorBackend.post('/avaliar', (requisicao, resposta) => {
    const objetoRecebido = requisicao.body;
    adicionarJogo(objetoRecebido)

    resposta.status(200).json(objetoRecebido);
});


servidorBackend.get('/avaliacoes', (requisicao, resposta) => {
    coletarJogos()
    .then(objetoJson => {
        resposta.json(objetoJson)
    })
    .catch(err => {
        console.error('Erro ao coletar jogos:', err);
    });

});

servidorBackend.get('/avaliacao/:uuid', (req, res) => {
    const { uuid } = req.params;

    coletarJogoPeloUUID(uuid)
    .then(jogo => {
        res.json(jogo)
    })
    .catch(err => {
        console.error('Erro ao coletar jogo pelo UUID:', err);
    });


});



servidorBackend.post('/criarUsuario', (req, res) => {
    const objetoRecebido = req.body;
    const nome = objetoRecebido.usuario

    coletarUsuarioPeloNome(nome).
    then(existe => {

        if (existe.length === 0) {
            criarUsuario(objetoRecebido)
            res.json(true);
        } else {
            res.json(false);
        }
    })
    .catch(err => {
        console.error('Erro ao coletar jogo pelo UUID:', err);
    });


});

servidorBackend.get('/usuarios/:usuario', (req, res) => {
    const { usuario } = req.params;

    coletarUsuarioPeloNome(usuario).
    then(resultado => {
        if (resultado.length == 0) {
            console.error("Este usuario não existe")
            return res.status(404).json({ message: 'Usuario não encontrado' });
        } else {
            return res.status(200).json(resultado[0])
        }
    })
    .catch(err => {
        return console.error('Erro ao coletar jogo pelo UUID:', err);
    });


});

servidorBackend.get('/denuncias', (req, res) => {

    coletarDenuncias()
    .then(denuncias => {
        res.json(denuncias)
    })
    .catch(err => {
        console.error('Erro ao coletar denuncias pelo UUID:', err);
    });


});

servidorBackend.post('/denunciar', (req, res) => {
    const objetoRecebido = req.body;
    adicionarDenuncia(objetoRecebido)

    res.status(200).json(objetoRecebido);


});

servidorBackend.get('/denuncia/:uuid', (req, res) => {
    const { uuid } = req.params;

    coletarDenunciaPeloUUID(uuid)
    .then(denuncia => {
        res.json(denuncia)
    })
    .catch(err => {
        console.error('Erro ao coletar jogo pelo UUID:', err);
    });


});

servidorBackend.delete('/excluirDenuncia/:uuid', (req, res) => {
    const { uuid } = req.params;

    try {
        excluirDenuncia(uuid);
        res.status(200).send("Sucesso em remover denuncia!")
    } catch (e){
        res.status(404).send("Erro ao tentar remover denuncia")
        console.log("Erro ao tentar remover denuncia!")
    }
});

servidorBackend.delete('/excluirUsuario/:uuid', (req, res) => {
    const { uuid } = req.params;

    try {
        excluirUsuario(uuid);
        res.status(200).send("Sucesso em remover usuario!")
    } catch (e){
        res.status(404).send("Erro ao tentar remover usuario")
        console.log("Erro ao tentar remover usuario!")
    }
});

servidorBackend.delete('/excluirAvaliacao/:uuid', (req, res) => {
    const { uuid } = req.params;

    try {
        excluirJogo(uuid);
        res.status(200).send("Sucesso em remover avaliação!")
    } catch (e){
        res.status(404).send("Erro ao tentar remover avaliação")
        console.log("Erro ao tentar remover avaliação!")
    }
});