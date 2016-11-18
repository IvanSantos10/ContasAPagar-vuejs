"use strict";

window.dashboardComponent = Vue.extend({
    template: "\n    <h1>{{ title }}</h1>\n    <h2>Valor a pagar</h2>\n    <p> {{ billPay | currency \"R$ \" }}</p>\n    <h2>Valor a receber</h2>\n    <p> {{ billReceive | currency \"R$ \" }}</p>\n    <router-view></router-view>\n    ",
    data: function data() {
        return {
            title: "Dashboard",
            billPay: 0,
            billReceive: 0
        };
    },
    created: function created() {
        var self = this;
        Bill_pay.total().then(function (response) {
            self.billPay = response.data.total;
        });

        Bill_receive.total().then(function (response) {
            self.billReceive = response.data.total;
        });
    }
});