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