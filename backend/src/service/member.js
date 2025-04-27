const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class ServiceMember {
  async getMembers() {
    return await prisma.member.findMany();
  }
  async getMembersById(id) {
    return await prisma.member.findUnique({
      where: {
        id: id,
      },
    });
  }
  async upsertMember(data) {
    const member = await prisma.member.upsert({
      where: {
        id: data.id,
      },
      update: data,
      create: data,
    });
    return member;
  }
  async deleteMember(id) {
    const existingMember = await prisma.member.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingMember) {
      throw new Error("Member not found");
    }
    return await prisma.member.delete({
      where: {
        id: id,
      },
    });
  }
}
module.exports = new ServiceMember();
