const Permission = require('../models/permission.model')
const Module=require('../models/module.models')

const setPermission = async (req, res) => {
  try {
    const { roleId, permissions } = req.body;

    if (!roleId) {
      return res.status(400).json({ message: 'roleId is required' });
    }

    const permissionArray = Array.isArray(permissions) ? permissions : [req.body];

    const results = [];

    for (const perm of permissionArray) {
      const { moduleId, can_create, can_read, can_update, can_delete } = perm;

      if (!moduleId) continue; 
      const existing = await Permission.findOne({ where: { RoleId: roleId, ModuleId: moduleId } });

      let permissionRecord;

      if (existing) {
        permissionRecord = await existing.update({
          can_create: can_create ?? existing.can_create,
          can_read: can_read ?? existing.can_read,
          can_update: can_update ?? existing.can_update,
          can_delete: can_delete ?? existing.can_delete,
        });
      } else {
        permissionRecord = await Permission.create({
          RoleId: roleId,
          ModuleId: moduleId,
          can_create: can_create ?? false,
          can_read: can_read ?? false,
          can_update: can_update ?? false,
          can_delete: can_delete ?? false,
        });
      }

      results.push(permissionRecord);
    }
    res.status(200).json({permissionList:results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:"Something went wrong" });
  }
};

const getPermissionByRole = async (req, res) => {
    try {
        const { id } = req.params
        const permission = await Permission.findAll({ where: { RoleId: id },include:[{model:Module,attributes:['name']}] })
        if (permission.length == 0) {
            return res.status(200).json({ message: "No Permission found" })
        }
        return res.status(200).json({ permissionList: permission })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

module.exports={setPermission,getPermissionByRole}
