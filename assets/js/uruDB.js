
var uruDB = (function() {
    var uruDB = {}
    uruDB.getPessoasList = getPessoasList;
    uruDB.savePessoa = savePessoa;
    uruDB.getNewId = getNewId;
    uruDB.deletarPessoa = deletarPessoa;
    uruDB.filtrarPessoaPeloId = filtrarPessoaPeloId;



    function getPessoasList() {
        var pessoasString = localStorage.getItem('pessoas');
        var pessoasList = JSON.parse(pessoasString);

        if (!pessoasList) {
            var pessoasList = [];
        }
        return pessoasList;
    }


    function savePessoa(pessoa) {
        var pessoasList = getPessoasList();

        if (!pessoa.id) {
            pessoa.id = getNewId();
        } else {
            var pessoasList = pessoasList.filter(function(pessoa) {
                return pessoa.id != formF.getIdFromUrl()
            });
            var pessoasJson = JSON.stringify(pessoasList);
            localStorage.setItem("pessoas", pessoasJson);
        }

        pessoasList.push(pessoa);
        var pessoasJson = JSON.stringify(pessoasList);
        localStorage.setItem("pessoas", pessoasJson);
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

    function deletarPessoa(pessoaId) {
        var pessoasList = getPessoasList();

        pessoasList = pessoasList.filter(function(pessoa){
            return pessoa.id != pessoaId;
        })

        pessoasJSON = JSON.stringify(pessoasList)
        localStorage.setItem('pessoas', pessoasJSON);
    }

    function filtrarPessoaPeloId(selectedPersonId) {
        var pessoasList = getPessoasList();
        var filteredPeople = pessoasList.filter(function(pessoa) {
            return pessoa.id == selectedPersonId;
        });
        return filteredPeople;
    }

    return uruDB;
})();