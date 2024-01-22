// dataSources.ts
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'user',
    entities: ['src/entities/*.ts'],
    synchronize: true, // This option will create database tables if they do not exist

});