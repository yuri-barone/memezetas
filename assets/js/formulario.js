



var formF = (function() {
    var formF = {};
    $(initialize);
    formF.clearForm = clearForm;
    formF.showMessage = showMessage;
    formF.clearMessage = clearMessage;
    formF.createPessoa = createPessoa;
    formF.validatePessoa = validatePessoa;
    formF.recoverSelectedPeople = recoverSelectedPeople;
    formF.getApiCep = getApiCep;
    formF.onLoadbyCepSuccess = onLoadbyCepSuccess;
    formF.cancelEdit = cancelEdit;
    formF.getIdFromUrl = getIdFromUrl;

    function initialize() {
        clearMessage('success');
        clearMessage('danger');
        recoverSelectedPeople();
    }
    


    function showMessage(message, tipo) {
        clearMessage('success');
        $('.form-' + tipo + '-msg').append(`<p>${message}</p>`);
        $('.form-' + tipo + '-msg').fadeIn();
    }

    function clearMessage(tipo) {
        $('.form-' + tipo + '-msg').fadeOut();
        $('.form-' + tipo + '-msg').empty();
    }

    function clearForm() {
        uruFields.setValueInField('Nome','');
        uruFields.setValueInField('Sobrenome','');
        uruFields.setValueInField('Telefone','');
        uruFields.setValueInField('Email','');
        uruFields.setValueInField('Cep', '');
        uruFields.setValueInField('Numero', '');
        uruFields.setValueInField('Rua', '');
        uruFields.setValueInField('Estado', '');
        uruFields.setValueInField('Cidade', '');
    }

    function createPessoa() {
        var pessoasList = uruDB.getPessoasList();

        var oldId = uruFields.getValueFromField('Id');
        var pessoa = {};

        pessoa.nome = uruFields.getValueFromField('Nome');
        pessoa.sobrenome = uruFields.getValueFromField('Sobrenome');
        pessoa.telefone = uruFields.getValueFromField('Telefone');
        pessoa.email = uruFields.getValueFromField('Email');
        pessoa.cep = uruFields.getValueFromField('Cep');
        pessoa.numero = uruFields.getValueFromField('Numero');
        pessoa.rua = uruFields.getValueFromField('Rua');
        pessoa.estado = uruFields.getValueFromField('Estado');
        pessoa.cidade = uruFields.getValueFromField('Cidade');
        
        if (oldId) {
            pessoa.id = oldId;
            uruDB.savePessoa(pessoa);
        } else {
            pessoa.id = uruDB.getNewId();
        }
        if (validatePessoa(pessoa) == false){
            return;
        }
        if (validateExistingPeople(pessoa)){
            showMessage("Pessoa já cadastrada", "danger");
            return;
        }    

        uruDB.savePessoa(pessoa);
        clearForm();
        listaF.addPessoaToTable(pessoa);
        showMessage('Pessoa salva com sucesso!', "success");
        listaF.addPessoasALista(pessoasList);
    }

    function validatePessoa(pessoa) {
        clearMessage('danger');
        if (pessoa.nome == "") {  
            showMessage('O campo nome não foi preenchido', 'danger');
            return false;
        }
        if (pessoa.sobrenome == "") {
            showMessage('O campo sobrenome não foi preenchido', 'danger')
            return false;
        }
        if (pessoa.email.indexOf("@") == -1 ){
            showMessage('O email é invalido', 'danger')
            return false;
        } 
            return true;
    }

    function addPessoaToForm(pessoaIndex){
        var pessoasList = uruDB.getPessoasList();
        var pessoa = pessoasList[pessoaIndex];
        uruFields.setValueInField('Nome', pessoa.nome);
        uruFields.setValueInField('Sobrenome', pessoa.sobrenome);
        uruFields.setValueInField('Telefone', pessoa.telefone);
        uruFields.setValueInField('Email', pessoa.email);
    }

    function recoverSelectedPeople() {
        var selectedPersonId = getIdFromUrl();
        if (!selectedPersonId) {
            return;
        }
        
        var filteredPeople = uruDB.filtrarPessoaPeloId(selectedPersonId);

        var pessoaSelecionada = filteredPeople.pop();
        uruFields.setValueInField('Nome', pessoaSelecionada.nome);
        uruFields.setValueInField('Sobrenome', pessoaSelecionada.sobrenome);
        uruFields.setValueInField('Telefone', pessoaSelecionada.telefone);
        uruFields.setValueInField('Email', pessoaSelecionada.email);
        uruFields.setValueInField('Id', pessoaSelecionada.id);
        uruFields.setValueInField('Cep', pessoaSelecionada.cep);
        uruFields.setValueInField('Numero', pessoaSelecionada.numero);
        uruFields.setValueInField('Rua', pessoaSelecionada.rua)
        uruFields.setValueInField('Estado', pessoaSelecionada.estado);
        uruFields.setValueInField('Cidade', pessoaSelecionada.cidade);
    }

    function getApiCep() {
        var cepVal = uruFields.getValueFromField('Cep'); 
        cepVal = cepVal.replace(/-/g, "");
        var validaCep = /^[0-9]{8}$/;
        if (validaCep.test(cepVal)) {
            $.getJSON("https://viacep.com.br/ws/"+ cepVal +"/json/").then(onLoadbyCepSuccess);;
            
        }     
    }
    
    function onLoadbyCepSuccess(response){
        uruFields.setValueInField('Rua', response.logradouro);
        uruFields.setValueInField('Estado', response.uf);
        uruFields.setValueInField('Cidade', response.localidade);
    }

    function cancelEdit() {
        window.location.href = "Lista.html";
    }

    function validateExistingPeople(pessoa) {
        var pessoasList = uruDB.getPessoasList();
        var pessoasRepetidas = pessoasList.filter(function (item) {
            return pessoa.nome == item.nome && item.sobrenome == pessoa.sobrenome && item.id != pessoa.id;
        })
        return pessoasRepetidas.length > 0;
        
    }

    function getIdFromUrl() {
        var urlString = window.location.href
        var url = new URL(urlString);
        var idUrl = url.searchParams.get("pessoaId");
        if (!idUrl) {
            return;
        }
        return idUrl;
    }
    
    return formF;
})();