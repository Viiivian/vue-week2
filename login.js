import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = { 
    //資料 (函式)
    data(){
		return{
            //登入用的物件，v-model要綁訂input，才能匯入
			user:{
                username: "",
                password:"",
            }
		}
	},
	//方法 (物件)
	methods:{
        login(){
            const apiUrl = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            axios.post(apiUrl, this.user)
            .then((res)=>{
                //登入後取出token和expired
                const {token, expired} = res.data;
                //取的cookie，用new Data轉換expired
                document.cookie = `vivianCookieName=${token}; expires=${new Date(expired)}; path=/`;
                //登入後，跳轉至商品頁
                window.location =  'product.html'
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

};
	
createApp(app).mount('#app')
