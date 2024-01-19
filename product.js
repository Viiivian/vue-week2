import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';



const app = {
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'vivian-product-website',
            products:[],
            tempProduct: {}
        }
    },
    methods: {
        loginCheck() {
            axios.post(`${this.apiUrl}/api/user/check`)
                .then((res) => {
                    console.log("Success!");
                    this.getProducts();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                    //未登入時，跳回登入頁面
                    window.location = 'index.html'
                })
        },
        getProducts() {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
                .then((res) => {
                    //取出data裡的產品資料，放入products中的空陣列
                    this.products = res.data.products;
                })
                .catch((err) => {
                    console.log(err.res.data.message)
                })
        }
    },

    mounted() {
        //取得token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)vivianCookieName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //將token加入headers
        axios.defaults.headers.common['Authorization'] = token;
        //初始化 
        this.loginCheck();
    }
};

createApp(app).mount("#app")