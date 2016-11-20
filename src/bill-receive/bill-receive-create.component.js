window.billReceiveCreateComponent = Vue.extend({
    template: `   
    <form name="form" @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'">
        <br><br>
        <label>Nome:</label>
        <input type="text" v-model="bill.name | stringFormat ">
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
            bill: new BillPay()
        };
    },
    created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit() {
            let data = this.bill.toJSON();
            if (this.formType == 'insert') {
                Bill_receive.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                })
            } else {
                Bill_receive.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                })
            }
        },
        getBill(id) {
            Bill_receive.get({id: id}).then((response) => {
                this.bill = new BillPay(response.data);
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
