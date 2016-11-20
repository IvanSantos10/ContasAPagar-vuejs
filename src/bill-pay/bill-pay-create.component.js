const names = [
    'Conta de luz',
    'Conta de água',
    'Conta de telefone',
    'Conta de gasolina',
    'Conta de condomínio',
    'Conta de Cartão',
    'Supermercado'
];

window.billPayCreateComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'">
        <br><br>
        <label>Nome:</label>
        <select v-model="bill.name ">
            <option v-for="o in names" :value="o" >{{ o | stringFormat }}</option>
        </select>
        <br><br>
        <label>Valor:</label>
        <input type="text" v-model="bill.value | numberFormat 'pt-BR' ">
        <br><br>
        <label>Paga?:</label>
        <input type="checkbox" v-model="bill.done">
        <br><br>
        <input type="submit" value="Enviar">
        <br><br>
    </form>
    `,
    data() {
        return {
            formType: 'insert',
            names: names,
            bill: new BillPay()
        };
    },
    created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit() {
            let data = this.bill.toJSON();
            if (this.formType == 'insert') {
                Bill_pay.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                })
            } else {
                Bill_pay.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                })
            }
        },
        getBill(id) {
            Bill_pay.get({id: id}).then((response) => {
                this.bill = new BillPay(response.data);
            });
        }
    }
});
