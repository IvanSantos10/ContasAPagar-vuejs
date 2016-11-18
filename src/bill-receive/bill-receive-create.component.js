window.billReceiveCreateComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.date_due">
        <br><br>
        <label>Nome:</label>
        <input type="text" v-model="bill.name">
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
            if (this.formType == 'insert') {
                Bill_receive.save({}, this.bill).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                })
            } else {
                Bill_receive.update({id: this.bill.id}, this.bill).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                })
            }
        },
        getBill(id) {
            Bill_receive.get({id: id}).then((response) => {
                this.bill = response.data
            });
        }
    }
});
