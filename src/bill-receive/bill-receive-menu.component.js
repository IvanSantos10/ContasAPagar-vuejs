window.billReceiveMenuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="o in menus">
                <a v-link="{ name: o.routeName}">{{ o.name }}</a>
            </li>
        </ul>
    </nav>
    `,
    data() {
        return {
            menus: [
                {id: 0, name: 'Listar contas', routeName: 'bill-receive.list'},
                {id: 1, name: 'Criar contas', routeName: 'bill-receive.create'}
            ],
        };
    }
});