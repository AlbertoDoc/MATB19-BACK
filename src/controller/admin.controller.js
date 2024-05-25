import adminService from "../services/admin.service.js";

const findAll = async (req, res) => {
  try {
    const users = await adminService.findAll();
    if (users.length === 0) {
      return res.status(400).json({ error: "There are no registered users" });
    }
    res.json(users);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return res.status(400).json({
        error: "Please add at least one of the fields: name, email, password",
      });
    }
    const id = req.params.id;
    await userService.updateService(id, name, email, password);
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};


export const deleteUserById = async (req, res) => {
  try {
    const requestingUserId = req.body.id;
    const userIdToDelete = req.params.id;

    const result = await adminService.deleteUserById(
      requestingUserId,
      userIdToDelete
    );
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { findAll, deleteUserById, updateAdmin };
