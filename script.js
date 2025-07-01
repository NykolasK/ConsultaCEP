function consultarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    if(cep.length !== 8) {
        alert("CEP deve conter 8 dígitos");
        return;
    }
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.erro) {
                alert("CEP não encontrado");
                return;
            }
            
            document.getElementById('logradouro').value = data.logradouro;
            document.getElementById('complemento').value = data.complemento;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('localidade').value = `${data.localidade}/${data.uf}`;
        })
        .catch(error => {
            console.error("Erro ao consultar CEP:", error);
            alert("Erro ao consultar CEP. Por favor, tente novamente.");
        });
}

document.getElementById('cep').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('cep').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        consultarCEP();
    }
});

function salvarDados() {
    const nome = document.getElementById('nome').value.trim();
    const logradouro = document.getElementById('logradouro').value;
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const localidade = document.getElementById('localidade').value;

    if (!nome || !logradouro || !bairro || !localidade) {
        alert("Preencha o nome e consulte um CEP válido antes de salvar.");
        return;
    }

    const dados = {
        nome,
        logradouro,
        complemento,
        bairro,
        localidade
    };

    localStorage.setItem("dadosUsuario", JSON.stringify(dados));

    document.getElementById('dadosSalvos').style.display = "block";
    document.getElementById('salvoNome').innerText = `Nome: ${dados.nome}`;
    document.getElementById('salvoLogradouro').innerText = `Logradouro: ${dados.logradouro}`;
    document.getElementById('salvoComplemento').innerText = `Complemento: ${dados.complemento}`;
    document.getElementById('salvoBairro').innerText = `Bairro: ${dados.bairro}`;
    document.getElementById('salvoLocalidade').innerText = `Cidade/Estado: ${dados.localidade}`;
}

document.getElementById('salvarBtn').addEventListener('click', salvarDados);
