<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="success">
			<b-navbar-brand href="#">
				<!-- <b-icon-brightness-fill-high></b-icon-brightness-fill-high> -->
				Admin</b-navbar-brand>
				
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			
			<b-collapse id="nav-collapse" is-nav>
			
				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					
					<b-nav-item @click="gohome" active> Exit </b-nav-item>
					
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
		
		
		<div>
		
		
			<b-modal id="modal-1" title="BootstrapVue">
				<p class = "my-4"> Admin </p>
				
			</b-modal>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	created(){
		
	},
	methods: {
		gohome(){
			this.$router.push('/')
		}
	}
}
</script>


<style>

</style>