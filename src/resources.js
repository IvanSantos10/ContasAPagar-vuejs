Vue.http.options.root = "http://0.0.0.0:8080/api";

window.Bill_pay = Vue.resource('bills-pay{/id}', {}, {
    total: {method: 'GET', url: 'bills-pay/total'}
});

window.Bill_receive = Vue.resource('bills-receive{/id}', {}, {
    total: {method: 'GET', url: 'bills-receive/total'}
});
