<template>
	<div >
	
		<b-container fluid style="margin-top:1rem">
		
		<b-row >
			<b-col sm="12" md="2" v-for="(book,index) in books" :key="index">
				<b-card
					:title=book.name
					:img-src="require(`@/assets/img/books/book${index+1}.jpg`)"
					img-alt="Image"
					tag="article"
					img-top
					class="mb-4"
					
					>
					<b-card-text>
						<h5>Price: {{book.price}} $</h5>
					</b-card-text>
				
					<b-button v-if="!book.cart" :disabled="book.cart" @click="book.cart=true, addtocart(JSON.parse(JSON.stringify(book)))" block href="#" variant="success">Add to Cart</b-button>
					<b-button v-if="book.cart" :disabled="book.cart" block href="#" variant="warning">Already added to cart </b-button>
				</b-card>
			</b-col>	
		</b-row>
		</b-container>
	
	</div>
</template>

<script>

export default {
	
	data() {
		return {
books: [
				{
					id:1,
					quantity:1,
					name: 'Harry Potter and Philosophers Stone vol. 1',
					price:15.69,
					img: '@/assets/books/book1.jpg',
					cart:false
				},
				{
					id:2,
					quantity:1,
					name: 'Harry Potter and Chamber of Secrets vol. 2',
					price:17.99,
					img: '@/assets/books/book1.jpg',
					cart:false
				},
				{
					id:3,
					quantity:1,
					name: 'Harry Potter and Prisoner of Azkaban vol. 3',
					price:18.09,
					img: '@/assets/books/book1.jpg',
					cart:false
				},
				{
					id:4,
					quantity:1,
					name: 'Harry Potter and Goblet of Fire vol. 4',
					price:17.59,
					img: '@/assets/books/book1.jpg',
					cart:false
				},
				{
					id:5,
					quantity:1,
					name: 'Harry Potter and Order of the Phoenix vol. 5',
					price:19.99,
					img: '@/assets/books/book1.jpg',
					cart:false
				},
				{
					id:6,
					quantity:1,
					name: 'Harry Potter and Half-Blood Prince vol. 6',
					price:16.79,
					img: '@/assets/books/book1.jpg',
					cart:false
				},
				{
					id:7,
					quantity:1,
					name: 'Harry Potter and Deathly Hallows vol. 7',
					price:21.89,
					img: '@/assets/books/book1.jpg',
					cart:false
				},
				{
					id:8,
					quantity:1,
					name: 'Harry Potter and the Cursed Child vol. 8',
					price:15.69,
					img: '@/assets/books/book8.jpg',
					cart:false
				},
			]
		}
	},
	methods: {
		addtocart(product){
			
			let cart = []
			if (JSON.parse(localStorage.getItem('products'))) {
				cart= JSON.parse(localStorage.getItem('products'))
			} else {
				cart = []
			}
			cart.push(product);
			localStorage.setItem('products', JSON.stringify(cart))
		}
	},
	created(){
		let cart = []
		if (JSON.parse(localStorage.getItem('products'))) {
			cart= JSON.parse(localStorage.getItem('products'))
		} else {
			cart = []
		}
		for (let index = 0; index < cart.length; index++) {
			for (let index2 = 0; index2 < this.books.lenght; index2++){
				if (cart[index].id == this.books[index2].id) {
					this.books[index2].cart=true
				}
				
			}
			
		}
	}
}
</script>

<style>

</style>