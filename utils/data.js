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
            name : "Shirt 1",
            slug : "shirt-1",
            category : "shirt",
            image:"/images/shirt1.jpg",
            price : 200,
            brand : "peter england",
            rating:4.5,
            reviewsCount : 10 ,
            stock :20,
            description :"A very good shirt !"

        },
        {
            name : "Shirt 2",
            slug : "shirt-2",

            category : "shirt",
            image:"/images/shirt2.jpg",
            price : 250,
            brand : "nike",
            rating: 4,
            reviewsCount : 11 ,
            stock :2,
            description :"A very good shirt !"

        },
        {
            name : "Shirt 3",
            slug : "shirt-3",

            category : "shirt",
            image:"/images/shirt3.jpg",
            price : 200,
            brand : "allen solly",
            rating:3.5,
            reviewsCount : 5 ,
            stock :24,
            description :"A very good shirt !"

        },
        {
            name : "Pant 1",
            slug : "pant-1",

            category : "pant",
            image:"/images/pant1.jpg",
            price : 170 ,
            brand : "peter england",
            rating: 4.5,
            reviewsCount : 10 ,
            stock : 10,
            description :"A very good pant !"

        },
        {
            name : "Pant 2",
            slug : "pant-2",
            category : "pant",
            image:"/images/pant2.jpg",
            price : 200,
            brand : "adidas",
            rating: 4,
            reviewsCount : 10 ,
            stock :20,
            description :"A very good pant !"

        },
        {
            name : "jacket 1",
            slug : "jacket-1",
            category : "jacket",
            image:"/images/jacket1.jpg",
            price : 200,
            brand : "peter england",
            rating: 2.5,
            reviewsCount : 14 ,
            stock :0,
            description :"A very good jacket !"

        }
    ]
}

export default data;