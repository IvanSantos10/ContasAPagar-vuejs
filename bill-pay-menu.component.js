window.billPayMenuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="o in menus">
                <a v-link="{ name: o.routeName}">{{ o.name }}</a>
            </li>
        </ul>
    </nav>
    `,
    data: function () {
        return {
            menus: [
                {id: 0, name: 'Listar contas', routeName: 'bill.list'},
                {id: 1, name: 'Criar contas', routeName: 'bill.create'}
            ],
        };
    }
});