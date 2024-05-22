import { int, mysqlEnum, mysqlTable, datetime, float, varchar } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const users = mysqlTable('users', {
    id: varchar('id', {
        length: 36
    }).primaryKey().default(sql`(UUID())`),
    firstName: varchar('first_name', {
        length: 50
    }).notNull(),
    lastName: varchar('last_name', {
        length: 255
    }).notNull(),
    email: varchar('email', {
        length: 255
    }).notNull().unique(),
    token: varchar('token', {
        length: 255
    }).notNull().unique(),
    age: int('age').notNull(),
    role: mysqlEnum('role', ['admin', 'worker']).notNull().default('worker'),
    profilePicture: varchar('profile_picture', {
        length: 255
    }),
})

export const clients = mysqlTable('clients', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', {
        length: 255
    }).notNull(),
    email: varchar('email', {
        length: 255
    }).unique(),
    status: mysqlEnum('status', ['active', 'inactive']).notNull().default('active')
})

export const products = mysqlTable('products', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', {
        length: 255
    }).notNull(),
    price: int('price').notNull(),
    stock: int('stock').notNull(),
    description: varchar('description', {
        length: 255
    }).notNull(),
    discount: float('discount').notNull().default(0)
})

export const sales = mysqlTable('sales', {
    id: int('id').primaryKey().autoincrement(),
    clientId: int('client_id').notNull().references(() => clients.id),
    userId: varchar('user_id', {
        length: 36
    }).notNull().references(() => users.id),
    createdDate: datetime('created_date').notNull().default(sql`NOW()`),
    total: float('total').notNull(),
    cashback: float('cashback').notNull(),
    status: mysqlEnum('status', ['completed', 'pending']).notNull().default('pending'),
    paymentMethod: mysqlEnum('payment_method', ['cash', 'credit_card']).notNull().default('cash'),
    receivedAmount: float('received_amount').notNull()
})

export const saleItems = mysqlTable('sale_items', {
    id: int('id').primaryKey().autoincrement(),
    saleId: int('sale_id').notNull().references(() => sales.id),
    productId: int('product_id').notNull().references(() => products.id),
    quantity: int('quantity').notNull(),
    total: float('total').notNull()
})