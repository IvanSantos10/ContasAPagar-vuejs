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
    <div class="section">
        <div class="container">
            <h1>{{ title }}</h1>
            <h3 :class="{'gray': status === false , 'green': status == 0, 'red': status > 0}">{{ status | statusGeneralPay}}</h3>
            <div class="row">
                <div class="col s5 offset-s7 z-depth-2">
                    <h3>{{ total | numberFormat }}</h3>
                </div>
            </div>
         </div>
    </div>
    <router-view></router-view>
    `,
    data() {
        return {
            title: 'Contas a pagar',
            status: false,
            total: 0
        };

    },
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus(bills) {
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
        updateStatus() {
            Bill_pay.query().then((response) => {
                this.calculateStatus(response.data)
            });
        },
        updateTotal() {
            Bill_pay.total().then((response) => {
                this.total = response.data.total;
            });
        }
    },
    events: {
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});
