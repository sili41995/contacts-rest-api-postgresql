import app, { prisma } from './app';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });

prisma
  .$connect()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Database connection successful');
    });
  })
  .catch(() => {
    prisma.$disconnect();
  });
