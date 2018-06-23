/*
1 - Antes de mostrar uma mensagem, certificar-se de que já não exista uma mensagem lá.
2 - Utilizando o plugin meio-mask, adicione uma máscara para o telefone no
*/

var pessoasList = [];
$(initializeForm);

function initializeForm(){
    clearMessage('success');
    clearMessage('danger');
    recuperarPessoas();
    addPessoasALista(pessoasList);
    recoverSelectedPeople();
    configureMask();
}

function addPessoaToForm(pessoaIndex){
    var pessoa = pessoasList[pessoaIndex];
    setValueInField('Nome', pessoa.nome);
    setValueInField('Sobrenome', pessoa.sobrenome);
    setValueInField('Telefone', pessoa.telefone);
    setValueInField('Email', pessoa.email);
}

function salvarForm() {
    var oldId = getValueFromField('Id');
    var pessoa = {};
    pessoa.nome = getValueFromField('Nome');
    pessoa.sobrenome = getValueFromField('Sobrenome');
    pessoa.telefone = getValueFromField('Telefone');
    pessoa.email = getValueFromField('Email');
    if (oldId) {
        pessoa.id = oldId
    } else {
        pessoa.id = getNewId();
    }
    if (validatePessoa(pessoa) == false){
        return;
    }
    if (validateExistingPeople(pessoa)){
        showMessage("Pessoa já cadastrada", "danger");
        return;
    }    
    if (!pessoasList) {
        pessoasList = [];
    }
    pessoasList.push(pessoa);
    var pessoasJson = JSON.stringify(pessoasList);
    localStorage.setItem("pessoas", pessoasJson);   
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
    clearMessage('success');
    $('.form-' + tipo + '-msg').append(`<p>${message}</p>`);
    $('.form-' + tipo + '-msg').fadeIn();
}

function clearMessage(tipo) {
    $('.form-' + tipo + '-msg').fadeOut();
    $('.form-' + tipo + '-msg').empty();
}

function addPessoaToTable(pessoa) {
    var pessoaLinha = `<tr onclick="editPessoa(${pessoa.id})"><td>${pessoa.nome}</td><td>${pessoa.sobrenome}</td><td>${pessoa.telefone}</td><td>${pessoa.email}</td><td><span class="btn btn-danger" id="btDelete" onClick="remove(event, ${pessoa.id})">Remover</span></td></tr>`;
    $('#table-body').append(pessoaLinha);
}

function addPessoasALista(arrayPessoas) {
    arrayPessoas.map(addPessoaToTable);    
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

function validateExistingPeople(pessoa) {
    var pessoasRepetidas = pessoasList.filter(function (item) {
        return pessoa.nome == item.nome && item.sobrenome == pessoa.sobrenome && item.id != pessoa.id;
    })
    return pessoasRepetidas.length > 0;
    
}

function editPessoa(pessoaId) {
        window.location.href = "/yuri-workspaces/memezetas/Formulario.html#" + pessoaId;
}

function getNewId() {
    var date = new Date();
    var componentsId = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    return componentsId.join("");
}

function getIdFromUrl() {
    var url = window.location.href
    var idUrl = url.match(/\d+/);
    if (!idUrl) {
        return;
    }
    return idUrl[0];
}

function recoverSelectedPeople() {
    var selectedPersonId = getIdFromUrl();
    if (!selectedPersonId) {
        return;
    }
    var filteredPeople = pessoasList.filter(function(pessoa) {
        return pessoa.id == selectedPersonId;
    });
    var pessoaSelecionada = filteredPeople.pop();
    setValueInField('Nome', pessoaSelecionada.nome);
    setValueInField('Sobrenome', pessoaSelecionada.sobrenome);
    setValueInField('Telefone', pessoaSelecionada.telefone);
    setValueInField('Email', pessoaSelecionada.email);
    setValueInField('Id', pessoaSelecionada.id);
}

function remove(event, pessoaId) {
    event.stopImmediatePropagation();
    pessoasList = pessoasList.filter(function(pessoa){
        return pessoa.id != pessoaId;
    })
    pessoasJSON = JSON.stringify(pessoasList)
    localStorage.setItem('pessoas', pessoasJSON);
    $('#table-body').empty();
    addPessoasALista(pessoasList);
}
function configureMask() {
   $('[data-mask]').setMask("phone");
}
