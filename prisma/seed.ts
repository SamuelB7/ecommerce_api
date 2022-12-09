import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()
async function main() {
    for (let i = 0; i < 100; i++) {
        const hash = await bcrypt.hash('1234', 7);
        await prisma.user.create({
            data: {
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: hash,
                documentId: faker.datatype.bigInt({ min: 10000, max: 99999 }).toString(),
                role: 'user'
            }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })