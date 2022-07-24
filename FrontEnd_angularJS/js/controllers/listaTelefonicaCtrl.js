angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatosAPI, operadorasAPI, serialGenerator){
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];       
    $scope.operadoras = []; 

    var carregarContatos = function () {
        contatosAPI.getContatos().then(function(response) {
            $scope.contatos = response.data;
        }).catch((error) => {
            // $scope.contatos = response.data;
            $scope.error = "Não foi possível carregar os dados!"
            console.log(error);
        });
    };

    var carregarOperadoras = function () {
        operadorasAPI.getOperadoras().then(function(response) {
            $scope.operadoras = response.data;
        });
    };

    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
    //    $scope.contatos.push(angular.copy(contato)); para adicionar apenas do arry não do beck
        contatosAPI.saveContato(contato).then(function(response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    };

    $scope.apagarContatos = function (contatos) {
       $scope.contatos = contatos.filter(function (contato) {
           if (!contato.selecionado) return contato; 
       });
    };

    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
           return contato.selecionado;
        });

    };

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;  
        $scope.direcaoDaOrdecacao = !$scope.direcaoDaOrdecacao;
    };

    carregarContatos();
    carregarOperadoras();
});