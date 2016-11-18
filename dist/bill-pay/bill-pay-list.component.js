"use strict";

window.billPayListComponent = Vue.extend({
    template: "\n    <style>\n        .pago{\n            color: green;\n        }\n        .nao-pago{\n            color: red;\n        }\n        .minha-class{\n            background-color: burlywood;\n        }\n    </style>\n    <table border=\"1\" cellpadding=\"10\">\n        <thead>\n        <tr>\n            <th>#</th>\n            <th>Vencimento</th>\n            <th>Nome</th>\n            <th>Valor</th>\n            <th>Paga?</th>\n            <th>A\xE7\xF5es</th>\n        </tr>\n        </thead>\n        <tdody>\n            <tr v-for=\"(index,o) in bills\">\n                <td>{{ index + 1}}</td>\n                <td>{{ o.date_due }}</td>\n                <td>{{ o.name }}</td>\n                <td>{{ o.value | currency \"R$ \" }}</td>\n                <td class=\"minha-class\" :class=\"{ 'pago': o.done, 'nao-pago': !o.done}\">\n                    {{ o.done | doneLabelPay }}\n                </td>\n                <td>\n                    <a v-link=\"{ name: 'bill-pay.update', params: { id: o.id}}\">Editar</a>\n                    <a href=\"#\" @click.prevent=\"deleteBill(o)\">Excluir</a>\n                </td>\n            </tr>\n        </tdody>\n    </table>\n    ",
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var self = this;
        Bill_pay.query().then(function (response) {
            self.bills = response.data;
        });
    },
    methods: {
        deleteBill: function deleteBill(bill) {
            if (confirm("Você deseja mesmo excluir?")) {
                var self = this;
                Bill_pay.delete({ id: bill.id }).then(function (response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});