window.billPayListComponent = Vue.extend({
    components: {
        'modal': modalComponent
    },
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
    <div class="container">
        <div class="row">
            <table class="bordered striped highlight centered responsive-table z-depth-5">
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
                        <td>{{ o.date_due | dateFormat 'pt-BR'}}</td>
                        <td>{{ o.name | stringFormat }}</td>
                        <td>{{ o.value | numberFormat 'pt-BR'}}</td>
                        <td class="minha-class" :class="{ 'pago': o.done, 'nao-pago': !o.done }">
                            {{ o.done | doneLabel }}
                        </td>
                        <td>
                            <a v-link="{ name: 'bill-pay.update', params: { id: o.id}}">Editar</a>
                            <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>
                        </td>
                    </tr>
                </tdody>
            </table>
        </div>
    </div>
    <modal :modal="modal">
        <div slot="content">
            <h4>Mensagem de confimação</h4>
            <p><strong>Deseja excluir esta conta?</strong></p>
            <div class="divider"></div>
            <p>Nome: <strong>{{billToDelete.name | stringFormat}}</strong></p>
            <p>Valor: <strong>{{billToDelete.value | numberFormat 'pt-BR' }}</strong></p>
            <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat 'pt-BR'}}</strong></p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill()">Ok</button>
            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
        </div>
    </modal>
    `,
    data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created() {
        Bill_pay.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        deleteBill() {
            Bill_pay.delete({id: this.billToDelete.id}).then((response) => {
                this.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!', 4000);
                this.$dispatch('change-info');
            });

        },
        openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').openModal();
        }
    }
});
