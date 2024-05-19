import app, { prisma } from './app';

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
