var pessoasList = [];

$(initializeForm);

function initializeForm(){
    clearMessage('success');
    clearMessage('danger');
    recuperarPessoas();
    addPessoasALista(pessoasList);
}

function addPessoaToForm(pessoaIndex){
    var pessoa = pessoasList[pessoaIndex];
    setValueInField('Nome', pessoa.nome);
    setValueInField('Sobrenome', pessoa.sobrenome);
    setValueInField('Telefone', pessoa.telefone);
    setValueInField('Email', pessoa.email);
}

function salvarForm() {

    var pessoa = {};
    pessoa.nome = getValueFromField('Nome');
    pessoa.sobrenome = getValueFromField('Sobrenome');
    pessoa.telefone = getValueFromField('Telefone');
    pessoa.email = getValueFromField('Email');
    if (validatePessoa(pessoa) == false){
        return;
    }

    if (!pessoasList) {
        pessoasList = [];
    }
    pessoasList.push(pessoa);
    var pessoasJson = JSON.stringify(pessoasList);
    localStorage.setItem("pessoas",pessoasJson);   
    clearForm();
    addPessoaToTable(pessoa);
    showMessage('Pessoa salva com sucesso!', "success");
}

function recuperarPessoas() {
    var pessoasString = localStorage.getItem('pessoas');
    pessoasList = JSON.parse(pessoasString);
    if (!pessoasList) {
        pessoasList = [];
    }
}

function getValueFromField(inputId) {   
    var fieldElement =  $('#input' + inputId);
    var fieldVal = fieldElement.val();
    return fieldVal;
}

function setValueInField(inputId,inputVal) {
    $('#input' + inputId).val(inputVal)
}

function clearForm() {
    setValueInField('Nome','');
    setValueInField('Sobrenome','');
    setValueInField('Telefone','');
    setValueInField('Email','');
}

function showMessage(message, tipo) {
    $('.form-' + tipo + '-msg').append(`<p>${message}</p>`);
    $('.form-' + tipo + '-msg').fadeIn();
}

function clearMessage(tipo) {
    $('.form-' + tipo + '-msg').fadeOut();
    $('.form-' + tipo + '-msg').empty();
}

function addPessoaToTable(pessoa) {
    var pessoaLinha = `<tr><td>${pessoa.nome}</td><td>${pessoa.sobrenome}</td><td>${pessoa.telefone}</td><td>${pessoa.email}</td></tr>`;
    $('#table-body').append(pessoaLinha);
}

function addPessoasALista(arrayPessoas) {
    pessoasList.map(addPessoaToTable);    
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
