window.billReceiveCreateComponent = Vue.extend({
    template: `  
    <div class="container">
        <div class="row">
            <h2>Nova conta</h2>
            <form name="form" @submit.prevent="submit">
                <div class="row">
                    <div class="input-field col s6">
                        <label class="active">Vencimento</label>
                        <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'" placeholder="Informe a data">
                    </div>
                    <div class="input-field col s6">
                        <label class="active">Valor:</label>
                        <input type="text" v-model="bill.value | numberFormat 'pt-BR' ">
                    </div>  
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <label class="active">Nome</label>
                        <input type="text" v-model="bill.name | stringFormat " placeholder="Informe o nome">
                    </div>
                    <div class="input-field col s6">
                        <input type="checkbox" v-model="bill.done" id="pago">
                        <label for="pago">Paga?:</label>                    
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="submit" value="Enviar" class="btn btn-large right">
                    </div>
                </div>                
            </form>
        </div>
    </div>
    `,
    data() {
        return {
            formType: 'insert',
            bill: new BillPay()
        };
    },
    created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit() {
            let data = this.bill.toJSON();
            if (this.formType == 'insert') {
                Bill_receive.save({}, data).then((response) => {
                    Materialize.toast('Conta criada com sucesso!', 4000);
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                })
            } else {
                Bill_receive.update({id: this.bill.id}, data).then((response) => {
                    Materialize.toast('Conta atualizada com sucesso!', 4000);
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                })
            }
        },
        getBill(id) {
            Bill_receive.get({id: id}).then((response) => {
                this.bill = new BillPay(response.data);
            });
        }
    }
});
