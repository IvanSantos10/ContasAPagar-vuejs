window.billReceiveCreateComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.date_due | dateFormat">
        <br><br>
        <label>Nome:</label>
        <input type="text" v-model="bill.name">
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
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
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
            if (this.formType == 'insert') {
                bills: this.$root.$children[0].billsReceive.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.$router.go({name: 'bill-receive.list'});
        },
        getBill(index) {
            this.bill = this.$root.$children[0].billsReceive[index];

        },
        submit() {
            let data = Vue.util.extend(this.bill, {date_due: this.getDateDue(this.bill.date_due)});
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
