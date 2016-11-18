Vue.filter('doneLabelPay', (value) => value == 0 ? "Não paga" : "Paga");

Vue.filter('doneLabelReceive', (value) => value == 0 ? "Não paga" : "Paga");

Vue.filter('statusGeneralPay', (value) => {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a pagar"
    } else {
        return "Existem " + value + " contas a serem pagas"
    }
});

Vue.filter('statusGeneralReceive', (value) => {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a receber"
    } else {
        return "Existem " + value + " contas a serem recebidas"
    }
});
