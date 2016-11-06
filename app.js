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
	    this.$dispatch('change-activedview', id);
            if (id == 1) {
                this.$dispatch('change-formtype', 'insert');
            }
        },
    }
});

var billListComponent = Vue.extend({
    template: `
    <style>
        .pago{
            color: green;
        }
        .nao-pago{
            color: red;
        }
        .minha-class{
            background-color: burlywood;
        }
    </style>
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
    `,
    data: function () {
        return {
            bills: [
                {date_due: '20/10/2016', name: 'Conta de luz', value: 25.65, done: true},
                {date_due: '21/10/2016', name: 'Conta de agua', value: 24.15, done: false},
                {date_due: '22/10/2016', name: 'Conta de telefone', value: 21.54, done: false},
                {date_due: '22/10/2016', name: 'Conta de gasolina', value: 26.12, done: false},
                {date_due: '23/10/2016', name: 'Conta de condominio', value: 22.50, done: false},
                {date_due: '24/10/2016', name: 'Conta de Cartao', value: 120.60, done: false},
                {date_due: '25/10/2016', name: 'Conta de Supemercado', value: 100.54, done: false}
            ]
        };
    },
    methods: {
        loadBill: function (bill) {
            this.$parent.bill = bill;
            this.$dispatch('change-activedview', 1);
	    this.$dispatch('change-formtype', 'update');
        },
        deleteBill: function (bill) {

            if (confirm("Você deseja mesmo excluir?")) {
                this.bills.$remove(bill)
            }
        }
    }
});

var billCreateComponent = Vue.extend({
    template: `
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
    `,
    props: ['bill'],
    data: function () {
        return {
            formType: 'insert',
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
    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                this.$parent.$refs.billListComponent.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };

            this.$parent.activedView = 0;
        }
    },
    events: {
	'change-formtype': function(formType){
	    this.formType = formType;
	}
    }
});

var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
    },
    template: `
    <style>
        .red{
            color: red;
        }
        .green{
            color: green;
        }
        .gray{
            color: gray;
        }
    </style>
    <h1>{{ title }}</h1>
    <h3 :class="{'gray': status === false , 'green': status == 0, 'red': status > 0}">{{ status | statusGeneral}}</h3>
    <menu-component></menu-component>
    <div v-show="activedView == 0">
        <bill-list-component v-ref:bill-list-component></bill-list-component>
    </div>
    <div v-show="activedView == 1">
        <bill-create-component :bill.sync="bill"></bill-create-component>
    </div>
    `,
    data: function () {
        return {
            title: 'Contas a pagar',
            activedView: 0,
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };

    },
    computed: {
        status: function () {
	    var billListComponent = this.$refs.billListComponent;
            if (!billListComponent.bills.length) {
                return false;
            }

            var count = 0;
            for (var i in billListComponent.bills) {
                if (!billListComponent.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },
    methods: {},
    events: {
	'change-activedview': function(activedView){
	    this.activedView = activedView;
	},
	'change-formtype': function(formType){
	    this.$broadcast('change-formtype', formType);
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



