const stronge = {
	getStronge:function (key){
		return uni.getStorageSync(key)
	}
}
export default stronge