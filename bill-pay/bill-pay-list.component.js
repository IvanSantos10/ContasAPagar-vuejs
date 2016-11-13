window.billPayListComponent = Vue.extend({
    template: `
    <style>
        .pago{
            color: green;
        }
        .nao-pago{
            color: red;
        }
        .minha-class{
            background-color: burlywood;
        }
    </style>
    <table border="1" cellpadding="10">
        <thead>
        <tr>
            <th>#</th>
            <th>Vencimento</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Paga?</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tdody>
            <tr v-for="(index,o) in bills">
                <td>{{ index + 1}}</td>
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency "R$ " }}</td>
                <td class="minha-class" :class="{ 'pago': o.done, 'nao-pago': !o.done}">
                    {{ o.done | doneLabelPay }}
                </td>
                <td>
                    <a v-link="{ name: 'bill-pay.update', params: { id: o.id}}">Editar</a>
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                </td>
            </tr>
        </tdody>
    </table>
    `,
    http: {
        root: 'http://localhost:8080/api'
    },
    data: function () {
        return {
            bills: []
        };
    },
    created: function () {
        var resource = this.$resource('bills{/id}');
        resource.query().then(function (response) {
            this.bills = response.data
        });
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm("Você deseja mesmo excluir?")) {
                var resource = this.$resource('bills{/id}');
                resource.delete({id: bill.id}).then(function (response) {
                    this.bills.$remove(bill);
                    this.$dispatch('change-status');
                });
            }
        }
    }
});