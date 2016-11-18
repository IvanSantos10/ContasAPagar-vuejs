'use strict';

window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },
    template: '\n    <style>\n        .red{\n            color: red;\n        }\n        .green{\n            color: green;\n        }\n        .gray{\n            color: gray;\n        }\n    </style>\n    <h1>{{ title }}</h1>\n    <h3 :class="{\'gray\': status === false , \'green\': status == 0, \'red\': status > 0}">{{ status | statusGeneralReceive }}</h3>\n    <h3>{{ total | currency \'R$ \' }}</h3>\n    <menu-component></menu-component>\n    <router-view></router-view>\n    ',
    data: function data() {
        return {
            title: 'Contas a receber',
            status: false,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus: function calculateStatus(bills) {
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
        updateStatus: function updateStatus() {
            var self = this;
            Bill_receive.query().then(function (response) {
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var self = this;
            Bill_receive.total().then(function (response) {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});