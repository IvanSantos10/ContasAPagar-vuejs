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
    data: function () {
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
    created: function () {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function () {
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
        getBill: function (index) {
            this.bill = this.$root.$children[0].billsReceive[index];

        },
        submit: function () {
            let self = this;
            if (this.formType == 'insert') {
                Bill_receive.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                })
            } else {
                Bill_receive.update({id: this.bill.id}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                })
            }
        },
        getBill: function (id) {
            let self = this;
            Bill_receive.get({id: id}).then(function (response) {
                self.bill = response.data
            });
        }
    }
});
