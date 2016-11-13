var router = new VueRouter();

var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function () {
        return {
            billsPay: [
                {date_due: '20/10/2016', name: 'Conta de luz', value: 25.65, done: true},
                {date_due: '21/10/2016', name: 'Conta de agua', value: 24.15, done: false},
                {date_due: '22/10/2016', name: 'Conta de telefone', value: 21.54, done: false},
                {date_due: '22/10/2016', name: 'Conta de gasolina', value: 26.12, done: false},
                {date_due: '23/10/2016', name: 'Conta de condominio', value: 22.50, done: false},
                {date_due: '24/10/2016', name: 'Conta de Cartao', value: 120.60, done: false},
                {date_due: '25/10/2016', name: 'Conta de Supemercado', value: 100.54, done: false}
            ],
            billsReceive: [
                {date_due: '20/10/2016', name: 'Venda de sofwere', value: 1500000.00, done: true},
                {date_due: '21/10/2016', name: 'Pestação de serviços', value: 24050.15, done: false},
                {date_due: '22/10/2016', name: 'Venda de casa', value: 21150.54, done: false},
                {date_due: '22/10/2016', name: 'Venda de terreno', value: 260000.12, done: false},
                {date_due: '23/10/2016', name: 'Recebimento de dívidas', value: 22025.50, done: false}
            ]
        };
    }
});
router.map({
    '/': {
        name: '/dashboard',
        component: dashboardComponent
    },
    'bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            }
        }
    },
    'bill-receives': {
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:index/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            }
        }
    },

    '*': {
        component: dashboardComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, "#app");


router.redirect({
    '*': '/dashboard'
});


