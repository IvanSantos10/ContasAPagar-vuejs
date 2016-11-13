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
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency "R$ " }}</td>
                <td class="minha-class" :class="{ 'pago': o.done, 'nao-pago': !o.done}">
                    {{ o.done | doneLabelReceive }}
                </td>
                <td>
                    <a v-link="{ name: 'bill-receive.update', params: { index: index}}">Editar</a>
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                </td>
            </tr>
        </tdody>
    </table>
    `,
    data: function () {
        return {
            bills: this.$root.$children[0].billsReceive,
        };
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm("Você deseja mesmo excluir?")) {
                this.$root.$children[0].billsReceive.$remove(bill)
            }
        }
    }
});