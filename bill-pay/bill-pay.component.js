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
    <menu-component></menu-component>
    <router-view></router-view>
    `,
    data: function () {
        return {
            title: 'Contas a pagar',
            status: false
        };

    },
    created: function () {
        this.updateStatus();
    },
    methods: {
        calculateStatus: function (bills) {
            if (!bills.length) {
                this.stauts = false;
            }

            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function () {
            var self = this;
            Bill.query().then(function (response) {
                self.calculateStatus(response.data)
            });
        }
    },
    events: {
        'change-status': function () {
            this.updateStatus();
        }
    }
});