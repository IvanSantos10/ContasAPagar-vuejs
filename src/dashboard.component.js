window.dashboardComponent = Vue.extend({
    template: `
    <h1>{{ title }}</h1>
    <h2>Valor a pagar</h2>
    <p> {{ billPay | currency "R$ " }}</p>
    <h2>Valor a receber</h2>
    <p> {{ billReceive | currency "R$ " }}</p>
    <router-view></router-view>
    `,
    data: function () {
        return {
            title: "Dashboard",
            billPay: 0,
            billReceive: 0
        }
    },
    created: function () {
        let self = this;
        Bill_pay.total().then(function (response) {
            self.billPay = response.data.total;
        });

        Bill_receive.total().then(function (response) {
            self.billReceive = response.data.total;
        });

    }
});