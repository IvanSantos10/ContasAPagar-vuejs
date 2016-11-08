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
            ]
        };
    }
});
router.map({
    'bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill.update',
                component: billPayCreateComponent
            }
        }
    },
    /*

    '*': {
        component: billPayListComponent
    }
    */
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, "#app");

/*
router.redirect({
    '*': '/bills'
});
*/


