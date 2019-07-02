<template>
	<text class="formatDate">{{startTime}}-{{endTime}}</text>
</template>

<script>
	export default {
		props:{
			date:{
				type:String,
				default:''
			},
			starttime:{
				type:String,
				default:''
			},
			endtime:{
				type:String,
				default:''
			}
		},
		computed:{
			format(){
				return this.date.split('T')[0]
			},
			startTime(){
				return this.starttime.split('T')[0]
			},
			endTime(){
				return this.endtime.split('T')[0]
			}
		}
	}
</script>

<style>
</style>
