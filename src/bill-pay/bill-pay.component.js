window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: `
    <style>
        .red{
            color: red;
        }
        .green{
            color: green;
        }
        .gray{
            color: gray;
        }
    </style>
    <h1>{{ title }}</h1>
    <h3 :class="{'gray': status === false , 'green': status == 0, 'red': status > 0}">{{ status | statusGeneralPay}}</h3>
    <h3>{{ total | currency 'R$ ' }}</h3>
    <menu-component></menu-component>
    <router-view></router-view>
    `,
    data: function () {
        return {
            title: 'Contas a pagar',
            status: false,
            total: 0
        };

    },
    created: function () {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus: function (bills) {
            if (!bills.length) {
                this.stauts = false;
            }

            let count = 0;
            for (let i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function () {
            let self = this;
            Bill_pay.query().then(function (response) {
                self.calculateStatus(response.data)
            });
        },
        updateTotal: function () {
            let self = this;
            Bill_pay.total().then(function (response) {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function () {
            this.updateStatus();
            this.updateTotal();
        }
    }
});