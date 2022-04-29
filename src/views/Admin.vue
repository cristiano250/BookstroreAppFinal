<template>
	<div>
		<NavbarAdmin />
			<b-container class="mt-4" fluid>
				<b-table fixed :busy="busy" bordered :fields="fields" hover :items="items" style="white-space: pre-line;">
					<template v-slot:cell(products)="data">
						<h5>Id: {{ data.item.id.substring(0,9)}}</h5>
						<ul v-for="(product, index) in data.item.products" :key="index">
							<li>Name: {{ product.name }}</li>
							<li>Price: {{ product.price }} $</li>
							<li>Quantity: {{ product.quantity }}</li>
							
							<hr />
						</ul>
					</template>
					<template v-slot:cell(total)="data">
						<h2>$ {{ data.item.total }}</h2>
					</template>
					<template v-slot:cell(delete)="data">
						<b-button @click="deletesale(data.item.id)" block class="mt-4" style="top:50%!important;" size="lg" variant="danger">Delete Sale</b-button>
					</template>
					<template v-slot:table-busy>
						<div class="text-center text-success my-2">
							<b-spinner class="align-middle"></b-spinner>
							<strong>Loading...</strong>
						</div>
					</template>
				</b-table>
			</b-container>
	</div>
</template>
	
<script>
import { db } from "@/firebase";
import NavbarAdmin from "@/components/NavbarAdmin";
export default {
	data() {
		return {
			data: "",
			busy: true,
			items: [],
			fields: [
				{key: "products", label: "Sales", tdClass: 'field1'},
				{key: "total", label: "Total", tdClass: 'field2'},
				{key: "delete", label: "Delete", tdClass: 'field3'}
			]
		};
	},
	components: {
		NavbarAdmin
	},
	created() {
		db.collection("vue").onSnapshot(querySnapshot => {
			this.items = []
			this.buys=true
			querySnapshot.forEach(doc => {
				const doc2 = doc.data();
				doc2.id = doc.id;
				this.items.push(doc2);
			})
			if (this.items.length) {
				this.busy=false
			}else{
				
				this.busy = false
			}
			
		})
		
	},
	methods: {
		deletesale(id){
			db.collection("vue").doc(id).delete().then(function(){
			if(navigator){
			navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100])
			}
				
			})
			
		}
	}
};
</script>

<style>
.field1 {
   width: 70%;
}
.field2 {
   width: 20%;
}
.field3 {
   width: 10%;

}
</style>