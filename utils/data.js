import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
          name: 'John',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: true,
        },
        {
          name: 'Jane',
          email: 'user@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: false,
        },
      ], 
    products : [
        {
            name : "Peter England White Shirt",
            slug : "shirt-1",
            category : "shirt",
            image:"/images/shirt1.jpg",
            price : 200,
            brand : "Peter England",
            reviews: [] ,
            stock :20,
            description :"A very good shirt !"

        },
        {
            name : "Nike Shirt",
            slug : "shirt-2",

            category : "shirt",
            image:"/images/shirt2.jpg",
            price : 250,
            brand : "Nike",
            reviews: [] ,
            stock :2,
            description :"A very good shirt !"

        },
        {
            name : "Shirt",
            slug : "shirt-3",

            category : "shirt",
            image:"/images/shirt3.jpg",
            price : 200,
            brand : "Allen Solly",
            reviews: [] ,
            stock :24,
            description :"A very good shirt !"

        },
        {
            name : "Denim Pant",
            slug : "pant-1",

            category : "pant",
            image:"/images/pant1.jpg",
            price : 170 ,
            brand : "Peter England",
            reviews: [] ,
            stock : 10,
            description :"A very good pant !"

        },
        {
            name : "Pant-Adidas",
            slug : "pant-2",
            category : "pant",
            image:"/images/pant2.jpg",
            price : 200,
            brand : "Adidas",
            reviews: [] ,
            stock :20,
            description :"A very good pant !"

        },
        {
            name : "Denim jacket",
            slug : "jacket-1",
            category : "jacket",
            image:"/images/jacket1.jpg",
            price : 200,
            brand : "Peter England",
            reviews: [] ,   
            stock :0,
            description :"A very good jacket !"

        }
    ]
}

export default data;