Vue.filter('doneLabelPay', function (value) {
    if (value == 0) {
        return 'Não paga';
    }
    return 'Paga';

});

Vue.filter('doneLabelReceive', function (value) {
    if (value == 0) {
        return 'Não paga';
    }
    return 'Paga';

});

Vue.filter('statusGeneralPay', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a pagar"
    } else {
        return "Existem " + value + " contas a serem pagas"
    }
});

Vue.filter('statusGeneralReceive', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a receber"
    } else {
        return "Existem " + value + " contas a serem recebidas"
    }
});