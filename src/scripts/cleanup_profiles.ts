import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning up profiles...')
  const deleted = await prisma.profile.deleteMany({
    where: {
      name: 'Profil Spécialiste UX/UI'
    }
  })
  console.log(`Successfully deleted ${deleted.count} profile(s).`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
