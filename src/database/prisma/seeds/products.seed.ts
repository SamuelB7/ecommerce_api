import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

export async function seedProducts(prisma: PrismaClient) {

    for (let i = 0; i < 1000; i++) {
        const product = await prisma.product.create({
            data: {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: +faker.commerce.price(),
                isAvailable: faker.datatype.boolean(),
                category: faker.commerce.department(),
            }
        })

        const productPhotos = await prisma.productPhotos.createMany({
            data: [
                {
                    url: faker.image.url(),
                    productId: product.id
                },
                {
                    url: faker.image.url(),
                    productId: product.id
                },
                {
                    url: faker.image.url(),
                    productId: product.id
                },
                {
                    url: faker.image.url(),
                    productId: product.id
                },
            ]
        })

        const productRating = await prisma.productRating.createMany({
            data: [
                {
                    rating: faker.number.int({ min: 1, max: 5 }),
                    description: faker.lorem.paragraph(),
                    productId: product.id
                },
                {
                    rating: faker.number.int({ min: 1, max: 5 }),
                    productId: product.id
                },
                {
                    rating: faker.number.int({ min: 1, max: 5 }),
                    productId: product.id
                },
                {
                    rating: faker.number.int({ min: 1, max: 5 }),
                    productId: product.id
                },
            ]
        })
    }
}