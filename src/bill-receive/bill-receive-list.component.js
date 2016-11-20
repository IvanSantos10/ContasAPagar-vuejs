window.billReceiveListComponent = Vue.extend({
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
                <td>{{ o.date_due | dateFormat }}</td>
                <td>{{ o.name | | stringFormat }}</td>
                <td>{{ o.value | numberFormat }}</td>
                <td class="minha-class" :class="{ 'pago': o.done, 'nao-pago': !o.done}">
                    {{ o.done | doneLabel }}
                </td>
                <td>
                    <a v-link="{ name: 'bill-receive.update', params: { id: o.id }}">Editar</a>
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                </td>
            </tr>
        </tdody>
    </table>
    `,
    data() {
        return {
            bills: []
        };
    },
    created() {
        Bill_receive.query().then((response) => {
            this.bills = response.data
        });
    },
    methods: {
        deleteBill(bill) {
            if (confirm("Você deseja mesmo excluir?")) {
                Bill_receive.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});