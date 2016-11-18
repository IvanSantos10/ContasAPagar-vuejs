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
        <input type="text" v-model="bill.date_due | dateFormat">
        <br><br>
        <label>Nome:</label>
        <select v-model="bill.name">
            <option v-for="o in names" :value="o" >{{ o }}</option>
        </select>
        <br><br>
        <label>Valor:</label>
        <input type="text" v-model="bill.value | numberFormat">
        <br><br>
        <label>Paga?:</label>
        <input type="checkbox" v-model="bill.done">
        <br><br>
        <input type="submit" value="Enviar">
        <br><br>
    </form>
    `,
    props: ['bill'],
    data() {
        return {
            formType: 'insert',
            names: names,
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
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
            let data = Vue.util.extend(this.bill, {date_due: this.getDateDue(this.bill.date_due)});
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
                this.bill = response.data
            });
        },
        getDateDue(date_due) {
            let dateDueObject = date_due;
            if (!(date_due instanceof Date)) {
                dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0];
        }

    }
});
