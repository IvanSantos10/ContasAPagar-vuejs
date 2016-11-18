'use strict';

var _methods;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.billReceiveCreateComponent = Vue.extend({
    template: '\n    <form name="form" @submit.prevent="submit">\n        <label>Vencimento:</label>\n        <input type="text" v-model="bill.date_due">\n        <br><br>\n        <label>Nome:</label>\n        <input type="text" v-model="bill.name">\n        <br><br>\n        <label>Valor:</label>\n        <input type="text" v-model="bill.value">\n        <br><br>\n        <label>Paga?:</label>\n        <input type="checkbox" v-model="bill.done">\n        <br><br>\n        <input type="submit" value="Enviar">\n        <br><br>\n    </form>\n    ',
    props: ['bill'],
    data: function data() {
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
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: (_methods = {
        submit: function submit() {
            if (this.formType == 'insert') {
                bills: this.$root.$children[0].billsReceive.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.$router.go({ name: 'bill-receive.list' });
        },
        getBill: function getBill(index) {
            this.bill = this.$root.$children[0].billsReceive[index];
        }
    }, _defineProperty(_methods, 'submit', function submit() {
        var self = this;
        if (this.formType == 'insert') {
            Bill_receive.save({}, this.bill).then(function (response) {
                self.$dispatch('change-info');
                self.$router.go({ name: 'bill-receive.list' });
            });
        } else {
            Bill_receive.update({ id: this.bill.id }, this.bill).then(function (response) {
                self.$dispatch('change-info');
                self.$router.go({ name: 'bill-receive.list' });
            });
        }
    }), _defineProperty(_methods, 'getBill', function getBill(id) {
        var self = this;
        Bill_receive.get({ id: id }).then(function (response) {
            self.bill = response.data;
        });
    }), _methods)
});