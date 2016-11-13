window.billPayCreateComponent = Vue.extend({
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
    http: {
        root: 'http://localhost:8080/api'
    },
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
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    created: function () {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function () {
            var resource = this.$resource('bills{/id}');
            if (this.formType == 'insert') {
                resource.save({}, this.bill).then(function (response) {
                    this.$dispatch('change-status');
                    this.$router.go({name: 'bill-pay.list'});
                })
            } else {
                resource.update({id: this.bill.id}, this.bill).then(function (response) {
                    this.$dispatch('change-status');
                    this.$router.go({name: 'bill-pay.list'});
                })
            }
        },
        getBill: function (id) {
            var resource = this.$resource('bills{/id}');
            resource.get({id: id}).then(function (response) {
                this.bill = response.data
            });
        }
    }
});
