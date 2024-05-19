import app from './app';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);
const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      // console.log(connectionString);
      console.log('Database connection successful');
    });
  })
  .catch(() => {
    prisma.$disconnect();
  });

export default prisma;
