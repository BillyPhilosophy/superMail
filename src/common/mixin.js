import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop' 

export const itemImageLoad = {
	data(){
		return {
			eventFn:null
		}
	},
	mounted() {
		// 页面img加载scroll组件需要refresh重载计算高度
		const refresh = debounce(this.$refs.scroll.refresh,200);
		this.eventFn = ()=>{
			refresh();
		}
		this.$bus.$on('imgLoad',this.eventFn);
		// console.log("混入in");
	},
}

export const backTopMixin = {
	data(){
		return {
			isShowBackTop:false,
		}
	},
	methods:{
		backTopClick(){
			this.$refs.scroll.scrollTo();
		},
		
	},
	components:{
		BackTop
	}
}