var listaF = (function() {
    var listaF = {};
    $(initialize);
    listaF.addPessoasALista = addPessoasALista;
    listaF.remove = remove;
    listaF.filterPersonByInput = filterPersonByInput;
    listaF.editPessoa = editPessoa;
    listaF.addPessoaToTable = addPessoaToTable;

    function initialize() {
        var pessoasList = uruDB.getPessoasList();
        addPessoasALista(pessoasList);
    }
    function addPessoasALista(arrayPessoas) {
        arrayPessoas.map(addPessoaToTable);    
    }

    function remove(event, pessoaId) {
        var pessoasList = uruDB.getPessoasList();
        event.stopImmediatePropagation();
        uruDB.deletarPessoa(pessoaId);
        rebootLista();
    }

    function filterPersonByInput() {
        var pessoasList = uruDB.getPessoasList();

        var inputFiltroVal = uruFields.getValueFromField("Filter");
        pessoasFiltradasPeloInput = pessoasList.filter(function(pessoa) {
            return pessoa.nome.toUpperCase().match(inputFiltroVal.toUpperCase());
        })
        $('#table-body').empty();
        addPessoasALista(pessoasFiltradasPeloInput);
     }

     function editPessoa(pessoaId) {
        window.location.href = "Formulario.html?pessoaId=" + pessoaId;
    }

    function addPessoaToTable(pessoa) {
        var pessoaLinha = `<tr onclick="listaF.editPessoa(${pessoa.id})"><td>${pessoa.nome}</td><td>${pessoa.sobrenome}</td><td>${pessoa.telefone}</td><td>${pessoa.email}</td><td><span class="btn btn-danger" id="btDelete" onClick="listaF.remove(event, ${pessoa.id})">Remover</span></td></tr>`;
        $('#table-body').append(pessoaLinha);
    }

    function rebootLista() {
        var pessoasList = uruDB.getPessoasList();
        $('#table-body').empty();
        addPessoasALista(pessoasList);
    }

    return listaF;
})();