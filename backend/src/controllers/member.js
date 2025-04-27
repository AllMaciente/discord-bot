const ServiceMember = require("./../service/member");

class ControllerMember {
  async getMembers(req, res) {
    try {
      const members = await ServiceMember.getMembers();
      return res.status(200).json(members);
    } catch (error) {
      console.error("Error getting members:", error);
      res.status(500).json({ error: error.message });
    }
  }
  async getMembersById(req, res) {
    try {
      const { id } = req.params;
      const member = await ServiceMember.getMembersById(id);
      return res.status(200).json(member);
    } catch (error) {
      console.error("Error getting member:", error);
      res.status(500).json({ error: error.message });
    }
  }
  async upsertMember(req, res) {
    try {
      const { body } = req;
      const member = await ServiceMember.upsertMember(body);
      return res.status(200).json(member);
    } catch (error) {
      console.error("Error creating/updating member:", error);
      res.status(500).json({ error: error.message });
    }
  }
  async deleteMember(req, res) {
    try {
      const { id } = req.params;
      const member = await ServiceMember.deleteMember(id);
      return res.status(200).json(member);
    } catch (error) {
      console.error("Error deleting member:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new ControllerMember();
