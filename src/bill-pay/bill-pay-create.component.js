const names = [
    'Conta de luz',
    'Conta de água',
    'Conta de telefone',
    'Conta de gasolina',
    'Conta de condomínio',
    'Conta de Cartão',
    'Supermercado'
];

window.billPayCreateComponent = Vue.extend({
    template: `
    <div class="container">
        <div class="row">
            <form name="form" @submit.prevent="submit">
                <div class="row">
                    <div class="input-field col s4">
                        <label>Vencimento</label>
                        <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'" placeholder="Informe a data">
                    </div>
                    <div class="input-field col s4">
                        <label>Valor:</label>
                        <input type="text" v-model="bill.value | numberFormat 'pt-BR' ">
                    </div>  
                </div>
                <div class="row">
                    <label>Nome:</label>
                    <select v-model="bill.name " id="name" class="browser-default">
                        <option value="" disabled selected>Escolha um nome</option>
                        <option v-for="o in names" :value="o" >{{ o | stringFormat }}</option>
                    </select>
                </div>
                <div class="row">
                    <input type="checkbox" v-model="bill.done" id="pago">
                    <label for="pago">Paga?:</label>
                </div>                
                <div class="row">
                    <input type="submit" value="Enviar">
                </div>                
            </form>
        </div>
    </div>
    `,
    data() {
        return {
            formType: 'insert',
            names: names,
            bill: new BillPay()
        };
    },
    created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }

        $(function () {
           $('#name').material_select();
        });
    },
    methods: {
        submit() {
            let data = this.bill.toJSON();
            if (this.formType == 'insert') {
                Bill_pay.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                })
            } else {
                Bill_pay.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                })
            }
        },
        getBill(id) {
            Bill_pay.get({id: id}).then((response) => {
                this.bill = new BillPay(response.data);
            });
        }
    }
});
