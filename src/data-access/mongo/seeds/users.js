const mongoose = require('mongoose');
const User = require('../models/userModel');
const Product = require("../models/productModel")
const ClientInfo = require("../models/clientInfoModel")
const Teacher = require('../models/teacherInfoModel')
const { ObjectId } = require('mongodb')
const config = require("../../../shared/config")
const bcrypt = require('bcryptjs');

mongoose
    .connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}`, { dbName: config.db.name }, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB ga ulandi.');
    })
    .catch((err) => {
        console.log('DB da xatolik: ', err);
    });

const seedAdmins = [
    {
        "id": new ObjectId('64dfb699c7ea86c4037cbbf9'),
        "first_name": "Sardor",
        "last_name": "Yuldashev",
        "password": bcrypt.hashSync('123456', 10),
        "birthday": "02.02.1995",
        "phone": 998991234567,
        "email": 'henkook-baron@mail.ru',
        "role": 'admin',
        "gender": 'erkak',
        "photo": "default.png"
    },
    {
        "id": new ObjectId('64dfb699c7ea86c4037cbbf8'),
        "first_name": "Iroda",
        "last_name": "Muminova",
        "birthday": "01.03.2004",
        "email": "iroda3242@gmail.com",
        "role": "admin",
        "password": bcrypt.hashSync('123456', 10),
        "phone": 998882222220,
        "gender": "ayol",
        "photo": "default.png"
    },
    {
        "id": new ObjectId('64dfb699c7ea86c4037cbbf7'),
        "first_name": "Xurshid",
        "last_name": "Shodiyev",
        "birthday": "01.06.2000",
        "email": "khurshid.upwork@gmail.com",
        "role": "admin",
        "password": bcrypt.hashSync('123456', 10),
        "phone": 998882222221,
        "gender": "erkak",
        "photo": "default.png"
    }

];

const seedProducts = [
    {
        "id": "65166faf3b362ef26dfbabc4",
        "name": "Trinajor runner",
        "brand": "Doys Rong",
        "info": "Yugurish uchun",
        "count": 100,
        "price": 130,
        "type": "trinajor",
        "category": "device",
        "photo": "product_img.png"
    },
    {
        "id": "65166fac3b362ef26dfbabbe",
        "name": "Trinajor runner",
        "brand": "Doys Rong",
        "info": "Yugurish uchun",
        "count": 100,
        "price": 130,
        "type": "trinajor",
        "category": "device",
        "photo": "product_img.png"
    },
    {
        "id": "65166fa93b362ef26dfbabb8",
        "name": "Trinajor runner",
        "brand": "Doys Rong",
        "info": "Yugurish uchun",
        "count": 100,
        "price": 130,
        "type": "trinajor",
        "category": "device",
        "photo": "product_img.png"
    },
    {
        "id": "65166f983b362ef26dfbabb0",
        "name": "Trinajor runner",
        "brand": "Doys Rong",
        "info": "Yugurish uchun",
        "count": 100,
        "price": 130,
        "type": "trinajor",
        "category": "device",
        "photo": "product_img.png"
    },
    {
        "id": "65166f943b362ef26dfbabaa",
        "name": "Trinajor runner",
        "brand": "Doys Rong",
        "info": "Yugurish uchun",
        "count": 100,
        "price": 130,
        "type": "trinajor",
        "category": "device",
        "photo": "product_img.png"
    },
    {
        "id": "65166f8e3b362ef26dfbaba7",
        "name": "Trinajor runner",
        "brand": "Doys Rong",
        "info": "Yugurish uchun",
        "count": 100,
        "price": 130,
        "type": "trinajor",
        "category": "device",
        "photo": "product_img.png"
    },
    {
        "id": "65166f963b362ef26dfbabad",
        "name": "Trinajor runner",
        "brand": "Doys Rong",
        "info": "Yugurish uchun",
        "count": 100,
        "price": 130,
        "type": "trinajor",
        "category": "device",
        "photo": "product_img.png"
    },
    {
        "id": "65166faa3b362ef26dfbabbb",
        "name": "Trinajor runner",
        "brand": "Doys Rong",
        "info": "Yugurish uchun",
        "count": 100,
        "price": 130,
        "type": "trinajor",
        "category": "device",
        "photo": "product_img.png"
    }
]

const seedProductsEdibles = [
    {
        "id": "65178d51e14face0f021dda9",
        "name": "PureGold8",
        "brand": "Chocolate Hazelnut8",
        "info": "Mazali",
        "count": 100,
        "price": 130,
        "type": "yegulik",
        "category": "edibles",
        "photo": "mahsulot.png"
    },
    {
        "id": "65178d51e14face0f021dda8",
        "name": "PureGold7",
        "brand": "Chocolate Hazelnut7",
        "info": "Mazali",
        "count": 100,
        "price": 130,
        "type": "yegulik",
        "category": "edibles",
        "photo": "mahsulot.png"
    },
    {
        "id": "65178d51e14face0f021dda7",
        "name": "PureGold6",
        "brand": "Chocolate Hazelnut6",
        "info": "Mazali",
        "count": 100,
        "price": 130,
        "type": "yegulik",
        "category": "edibles",
        "photo": "mahsulot.png"
    },
    {
        "id": "65178d51e14face0f021dda6",
        "name": "PureGold5",
        "brand": "Chocolate Hazelnut5",
        "info": "Mazali",
        "count": 100,
        "price": 130,
        "type": "yegulik",
        "category": "edibles",
        "photo": "mahsulot.png"
    },
    {
        "id": "65178d51e14face0f021dda5",
        "name": "PureGold4",
        "brand": "Chocolate Hazelnut4",
        "info": "Mazali",
        "count": 100,
        "price": 130,
        "type": "yegulik",
        "category": "edibles",
        "photo": "mahsulot.png"
    },
    {
        "id": "65178d51e14face0f021dda4",
        "name": "PureGold3",
        "brand": "Chocolate Hazelnut3",
        "info": "Mazali",
        "count": 100,
        "price": 130,
        "type": "yegulik",
        "category": "edibles",
        "photo": "mahsulot.png"
    },
    {
        "id": "65178d51e14face0f021dda2",
        "name": "PureGold2",
        "brand": "Chocolate Hazelnut2",
        "info": "Mazali",
        "count": 100,
        "price": 130,
        "type": "yegulik",
        "category": "edibles",
        "photo": "mahsulot.png"
    },
    {
        "id": "65178d51e14face0f021dda1",
        "name": "PureGold1",
        "brand": "Chocolate Hazelnut1",
        "info": "Mazali",
        "count": 100,
        "price": 130,
        "type": "yegulik",
        "category": "edibles",
        "photo": "mahsulot.png"
    }
]

const seedTeachersUsers = [
    {
        "id": new ObjectId('64dfb699c7ea86c4037cbbf6'),
        "first_name": "Sardor",
        "last_name": "Yuldashev",
        "password": bcrypt.hashSync('123456', 10),
        "birthday": "02.02.1995",
        "phone": 998991234500,
        "email": 'henkook-baron1@mail.ru',
        "role": 'teacher',
        "photo": "default.png"
    },
    {
        "id": new ObjectId('64dfb699c7ea86c4037cbbf5'),
        "first_name": "Iroda",
        "last_name": "Muminova",
        "birthday": "01.03.2004",
        "email": "iroda32422@gmail.com",
        "role": "teacher",
        "password": bcrypt.hashSync('123456', 10),
        "phone": 998882222200,
        "photo": "default.png",
    },
    {
        "id": new ObjectId('64dfb699c7ea86c4037cbbf4'),
        "first_name": "Xurshid",
        "last_name": "Shodiyev",
        "birthday": "01.06.2000",
        "email": "khurshid.upwork1@gmail.com",
        "role": "teacher",
        "password": bcrypt.hashSync('123456', 10),
        "phone": 998882220011,
        "photo": "default.png",
    }

];

const seedTeachers = [{
    "id": new ObjectId('64dfb699c7ea86c4037cbbf3'),
    "user_id": "64dfb699c7ea86c4037cbbf4",
    "gender": 'erkak',
    "info": "dwdwd",
    "kun": "juft",
    "category": 2
}, {
    "id": new ObjectId('64dfb699c7ea86c4037cbbf2'),
    "user_id": "64dfb699c7ea86c4037cbbf5",
    "info": "dwdwd",
    "kun": "juft",
    "category": 2,
    "gender": "ayol"
}, {
    "id": new ObjectId('64dfb699c7ea86c4037cbbf1'),
    "user_id": "64dfb699c7ea86c4037cbbf7",
    "info": "dwdwd",
    "kun": "juft",
    "category": 2,
    "gender": "erkak"
}]

const seedClientUser = [
    {
        "id": new ObjectId('65166faf3b362ef26dfbabc9'),
        "first_name": "Sardor",
        "last_name": "Yuldashev",
        "password": bcrypt.hashSync('123456', 10),
        "birthday": "02.02.1995",
        "phone": 998991234511,
        "email": 'henkook-baron2@mail.ru',
        "role": 'teacher',
        "photo": "default.png"
    },
    {
        "id": new ObjectId('65166faf3b362ef26dfbabc8'),
        "first_name": "Iroda",
        "last_name": "Muminova",
        "birthday": "01.03.2004",
        "email": "iroda32429@gmail.com",
        "role": "teacher",
        "password": bcrypt.hashSync('123456', 10),
        "phone": 998882222211,
        "photo": "default.png",
    },
    {
        "id": new ObjectId('65166faf3b362ef26dfbabc7'),
        "first_name": "Xurshid",
        "last_name": "Shodiyev",
        "birthday": "01.06.2000",
        "email": "khurshid.upwork2@gmail.com",
        "role": "teacher",
        "password": bcrypt.hashSync('123456', 10),
        "phone": 998882220088,
        "photo": "default.png",
    }

];

const seedClient = [
    {
        "id":new ObjectId("65166faf3b362ef26dfbabc6"),
        "user_id":"65166faf3b362ef26dfbabc9",
        "teacher_id": "6516c13ff54dee99ce36eea4",
        "service": 300
    },
    {
        "id":new ObjectId("65166faf3b362ef26dfbabc5"),
        "user_id":"65166faf3b362ef26dfbabc8",
        "teacher_id": "6516c13ff54dee99ce36eea4",
        "service": 300
    },
    {
        "id":new ObjectId("65166faf3b362ef26dfbabc4"),
        "user_id":"65166faf3b362ef26dfbabc7",
        "teacher_id": "6516c13ff54dee99ce36eea4",
        "service": 300
    },
]

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany([...seedAdmins, ...seedTeachersUsers,...seedClientUser]);

    await Product.deleteMany({});
    await Product.insertMany([...seedProducts,...seedProductsEdibles]);

    await Teacher.deleteMany({});
    await Teacher.insertMany(seedTeachers);

    await ClientInfo.deleteMany({});
    await ClientInfo.insertMany(seedClient);

};

seedDB().then(() => {
    mongoose.connection.close();
});