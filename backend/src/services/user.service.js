import { PrismaClient } from "./../generated/prisma/index.js"; // Adjust the import path as necessary

const prisma = new PrismaClient();

export const getTopScores = async () => {
  return await prisma.score.findMany({
    distinct: ['userId'],
    orderBy: [
      { tiempo: 'asc' }, 
      { createdAt: 'asc' } 
    ],
    take: 20,
    include: {
      user: {
        select: { name: true, photo: true }
      }
    }
  });
};


export const saveScore = async (userId, tiempo) => {
	return await prisma.score.create({
		data: {
			userId,
			tiempo,
		},
	});
};
