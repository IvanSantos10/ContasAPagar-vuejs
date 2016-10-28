
Vue.filter('doneLabel', function (value) {
    if(value == 0){
        return 'Não paga';
    }
    return 'Paga';

});

Vue.filter('status', function (value) {
    if(value === false){
        return "Nenhuma conta cadastrada";
    }
    if(!value){
        return "Nenhuma conta a pagar"
    }else {
        return "Existem "+value+" contas a serem pagas"
    }
})

var app = new Vue({
    el: '#app',
    data: {
        test: '',
        title: 'Contas a pagar',
        menus: [
            {id: 0, name: 'Listar contas'}, {id: 1, name: 'Criar contas'}
        ],
        activedView: 0,
        formType: 'insert',
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: false
        },
        bills: [
            {date_due: '20/10/2016', name: 'Conta de luz', value: 25.65, done: true},
            {date_due: '21/10/2016', name: 'Conta de agua', value: 24.15, done: false},
            {date_due: '22/10/2016', name: 'Conta de telefone', value: 21.54, done: false},
            {date_due: '22/10/2016', name: 'Conta de gasolina', value: 26.12, done: false},
            {date_due: '23/10/2016', name: 'Conta de condominio', value: 22.50, done: false},
            {date_due: '24/10/2016', name: 'Conta de Cartao', value: 120.60, done: false},
            {date_due: '25/10/2016', name: 'Conta de Supemercado', value: 100.54, done: false}
        ],
        names: [
            'Conta de luz',
            'Conta de agua',
            'Conta de telefone',
            'Conta de gasolina',
            'Conta de condominio',
            'Conta de Cartao',
            'Conta de Supemercado'
        ]

    },
    computed: {
        status: function () {
            if(!this.bills.length){
                return false;
            }

            var count = 0;
            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },
    methods: {
        showView: function (id) {
            this.activedView = id;
            if (id == 1) {
                this.formType = 'insert';
            };
        },
        submit: function () {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            };

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };

            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill: function (bill) {

            if(confirm("Você deseja mesmo excluir?")){
                //$delete(bill);
                this.bills.splice(bill,1)
            }
        }
    }


});

app.$watch('test', function (n, v) {
    console.log('velho valor: ' + v + ' Novo valor: ' + n);
});


