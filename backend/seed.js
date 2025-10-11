import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleEmployees = [
  {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@fintechflow.com',
    position: 'Senior Software Engineer',
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@fintechflow.com',
    position: 'Frontend Developer',
  },
  {
    name: 'Rahul Gupta',
    email: 'rahul.gupta@fintechflow.com',
    position: 'Backend Developer',
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@fintechflow.com',
    position: 'Full Stack Developer',
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@fintechflow.com',
    position: 'DevOps Engineer',
  },
  {
    name: 'Anita Joshi',
    email: 'anita.joshi@fintechflow.com',
    position: 'Product Manager',
  },
  {
    name: 'Karthik Nair',
    email: 'karthik.nair@fintechflow.com',
    position: 'Data Scientist',
  },
  {
    name: 'Meera Agarwal',
    email: 'meera.agarwal@fintechflow.com',
    position: 'UI/UX Designer',
  },
  {
    name: 'Rohit Kumar',
    email: 'rohit.kumar@fintechflow.com',
    position: 'Blockchain Developer',
  },
  {
    name: 'Kavya Iyer',
    email: 'kavya.iyer@fintechflow.com',
    position: 'Financial Analyst',
  },
  {
    name: 'Amit Verma',
    email: 'amit.verma@fintechflow.com',
    position: 'Risk Manager',
  },
  {
    name: 'Deepika Rao',
    email: 'deepika.rao@fintechflow.com',
    position: 'Compliance Officer',
  },
  {
    name: 'Sanjay Mehta',
    email: 'sanjay.mehta@fintechflow.com',
    position: 'Security Engineer',
  },
  {
    name: 'Neha Kapoor',
    email: 'neha.kapoor@fintechflow.com',
    position: 'Business Analyst',
  },
  {
    name: 'Rajesh Khanna',
    email: 'rajesh.khanna@fintechflow.com',
    position: 'Payment Systems Lead',
  },
  {
    name: 'Pooja Sinha',
    email: 'pooja.sinha@fintechflow.com',
    position: 'Mobile Developer',
  },
  {
    name: 'Manish Tiwari',
    email: 'manish.tiwari@fintechflow.com',
    position: 'API Developer',
  },
  {
    name: 'Ritu Bansal',
    email: 'ritu.bansal@fintechflow.com',
    position: 'Credit Analyst',
  },
  {
    name: 'Arun Pandey',
    email: 'arun.pandey@fintechflow.com',
    position: 'Machine Learning Engineer',
  },
  {
    name: 'Swati Jain',
    email: 'swati.jain@fintechflow.com',
    position: 'Digital Marketing Manager',
  },
]

async function seed() {
  try {
    console.log('[API] 💾 Setting up database...')
    await prisma.employee.deleteMany()

    console.log('[API] 👥 Adding sample employees...')
    const batchSize = 10
    for (let i = 0; i < sampleEmployees.length; i += batchSize) {
      const batch = sampleEmployees.slice(i, i + batchSize)
      await prisma.employee.createMany({
        data: batch,
      })
    }

    console.log('[API] ✅ Database ready with 20 employees')
  } catch (error) {
    console.log('[API] ❌ Database setup failed')
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()