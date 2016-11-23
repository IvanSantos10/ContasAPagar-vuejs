window.dashboardComponent = Vue.extend({
    template: `
    <div class="section">
        <div class="container">          
            <h3>{{ title }}</h3>
            <div class="row">
                <div class="col s6">
                    <div class="card z-depth-2 red" >
                        <div class="card-content">
                             <h5>Valor a pagar</h5>
                             <p> {{ billPay | numberFormat 'pt-BR'}}</p>                            
                        </div>
                    </div>  
                </div>  
                <div class="col s6">
                    <div class="card z-depth-2 green" >
                        <div class="card-content">
                            <h5>Valor a receber</h5>
                            <p> {{ billReceive | numberFormat 'pt-BR'}}</p>                       
                        </div>
                    </div>  
                </div>
            </div>
        </div> 
    </div>          
    <router-view></router-view>
    `,
    data() {
        return {
            title: "Dashboard",
            billPay: 0,
            billReceive: 0
        }
    },
    created() {
        let self = this;
        Bill_pay.total().then((response) => {
            this.billPay = response.data.total;
        });

        Bill_receive.total().then((response) => {
            this.billReceive = response.data.total;
        });

    }
});
