import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
    const DEFAULT_PASSWORD = "$2a$08$BiD1oQZRdqcse9e5qV1wVeW64/8pg76KSbQEbywkEd5mKxufMOnrW" //12345 bcrypt
    const adminUser = {
        email: "admin@email.com",
        name: "Admin",
        role: "ADMIN",
        password: DEFAULT_PASSWORD
    }

    await prisma.user.create({
        data: adminUser
    })
}