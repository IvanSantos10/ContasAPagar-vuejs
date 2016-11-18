'use strict';

window.billPayCreateComponent = Vue.extend({
    template: '\n    <form name="form" @submit.prevent="submit">\n        <label>Vencimento:</label>\n        <input type="text" v-model="bill.date_due">\n        <br><br>\n        <label>Nome:</label>\n        <select v-model="bill.name">\n            <option v-for="o in names" :value="o" >{{ o }}</option>\n        </select>\n        <br><br>\n        <label>Valor:</label>\n        <input type="text" v-model="bill.value">\n        <br><br>\n        <label>Paga?:</label>\n        <input type="checkbox" v-model="bill.done">\n        <br><br>\n        <input type="submit" value="Enviar">\n        <br><br>\n    </form>\n    ',
    props: ['bill'],
    data: function data() {
        return {
            formType: 'insert',
            names: ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Conta de gasolina', 'Conta de condomínio', 'Conta de Cartão', 'Supermercado'],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function submit() {
            var self = this;
            if (this.formType == 'insert') {
                Bill_pay.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill_pay.update({ id: this.bill.id }, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var self = this;
            Bill_pay.get({ id: id }).then(function (response) {
                self.bill = response.data;
            });
        }
    }
});