window.dashboardComponent = Vue.extend({
    template: `
    <h1>{{ title }}</h1>
    <h2>Valor a pagar</h2>
    <p> {{ billPay | numberFormat 'pt-BR'}}</p>
    <h2>Valor a receber</h2>
    <p> {{ billReceive | numberFormat 'pt-BR'}}</p>
    <router-view></router-view>
    `,
    data() {
        return {
            title: "Dashboard",
            billPay: 0,
            billReceive: 0
        }
    },
    created() {
        let self = this;
        Bill_pay.total().then((response) => {
            this.billPay = response.data.total;
        });

        Bill_receive.total().then((response) => {
            this.billReceive = response.data.total;
        });

    }
});
