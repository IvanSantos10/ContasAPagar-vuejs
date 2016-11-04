Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return 'Não paga';
    }
    return 'Paga';

});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a pagar"
    } else {
        return "Existem " + value + " contas a serem pagas"
    }
});
var menuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="o in menus">
                <a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a>
            </li>
        </ul>
    </nav>
    `,
    data: function () {
        return {
            menus: [
                {id: 0, name: 'Listar contas'},
                {id: 1, name: 'Criar contas'}
            ],
        };
    },
    methods: {
        showView: function (id) {
            this.activedView = id;
            if (id == 1) {
                this.formType = 'insert';
            }
            ;
        },
    }
});
Vue.component('menu-component', menuComponent);
var appComponent = Vue.extend({
    template: `
    <style>
        .pago{
            color: green;
        }
        .nao-pago{
            color: red;
        }
        .red{
            color: red;
        }
        .green{
            color: green;
        }
        .gray{
            color: gray;
        }
        .minha-class{
            background-color: burlywood;
        }
    </style>
    <h1>{{ title }}</h1>
    <h3 :class="{'gray': status === false , 'green': status == 0, 'red': status > 0}">{{ status | statusGeneral}}</h3>
    <menu-component></menu-component>
    <div v-if="activedView == 0">
        <table border="1" cellpadding="10">
            <thead>
            <tr>
                <th>#</th>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Paga?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tdody>
                <tr v-for="(index,o) in bills">
                    <td>{{ index + 1}}</td>
                    <td>{{ o.date_due }}</td>
                    <td>{{ o.name }}</td>
                    <td>{{ o.value | currency "R$ " }}</td>
                    <td class="minha-class" :class="{ 'pago': o.done, 'nao-pago': !o.done}">
                        {{ o.done | doneLabel }}
                    </td>
                    <td>
                        <a href="#" @click.prevent="loadBill(o)">Editar</a>
                        <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                    </td>
                </tr>
            </tdody>
        </table>
    </div>
    <div v-if="activedView == 1">
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.date_due">
            <br><br>
            <label>Nome:</label>
            <select v-model="bill.name">
                <option v-for="o in names" :value="o" >{{ o }}</option>
            </select>
            <br><br>
            <label>Valor:</label>
            <input type="text" v-model="bill.value">
            <br><br>
            <label>Paga?:</label>
            <input type="checkbox" v-model="bill.done">
            <br><br>
            <input type="submit" value="Enviar">
            <br><br>
        </form>
    </div>
    `,
    data: function () {
        return {
            test: '',
            title: 'Contas a pagar',

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
        };

    },
    computed: {
        status: function () {
            if (!this.bills.length) {
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

        submit: function () {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

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

            if (confirm("Você deseja mesmo excluir?")) {
                this.bills.$remove(bill)
            }
        }
    }

});

Vue.component('app-component', appComponent);

var app = new Vue({
    el: '#app'
});

app.$watch('test', function (n, v) {
    console.log('velho valor: ' + v + ' Novo valor: ' + n);
});



