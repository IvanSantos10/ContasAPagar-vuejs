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
            title: "Dashboard"
        }
    },
    computed: {
        billPay: function () {
            var bills = this.$root.$children[0].billsPay,
                valueBill = 0;

            for(var i in bills){
                if(!bills[i].done){
                    valueBill += bills[i].value;
                }
            }
            return valueBill;
        },
        billReceive: function () {
            var bills = this.$root.$children[0].billsReceive,
                valueBill = 0;

            for(var i in bills){
                if(!bills[i].done){
                    valueBill += bills[i].value;
                }
            }
            return valueBill;
        }
    }
});