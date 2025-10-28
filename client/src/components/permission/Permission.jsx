import React, { useEffect, useState } from 'react'
import { getAllRole } from '../../services/role'
import { getAllModule } from '../../services/module'
import { getPermission, updatePermission } from '../../services/permission'

function Permission({ token }) {
  const [roleList, setRoleList] = useState([])
  const [selectedRole, setSelectedRole] = useState("")
  const [module, setModule] = useState([])
  const [permission, setPermission] = useState({})
  const [canEdit, setCanEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  async function fetchRole() {
    try {
      const response = await getAllRole(token)
      let filterRole = response?.roleList.filter((role) => role.name !== 'Admin');
      setRoleList(filterRole);
      setSelectedRole(filterRole[0].id)
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchModule() {
    try {
      const response = await getAllModule(token)
      setModule(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function permissionHandler() {
    if (selectedRole) {
      try {
        const response = await getPermission(token, selectedRole)
        if (module.length > 0) {
          let perm = {}
          module.forEach((m) => {
            let mod = m.name.toLowerCase()
            perm[mod] = response[mod] || {
              create: false,
              read: false,
              update: false,
              delete: false
            }
          })
          setPermission(perm)
        }

      } catch (error) {
        console.log(error);
        setPermission({})
      }
    }
  }

  function handleCheckbox(mod, action) {
    if (!canEdit) return
    setPermission((prev) => ({
      ...prev, [mod]: { ...prev[mod], [action]: !prev[mod][action] },
    }))
  }

  async function submitHandler() {
    try {
      setLoading(true);
      const payload = module.map((m) => {
        const key = m.name.toLowerCase();
        const perm = permission[key] || {};
        return {
          moduleId: m.id,
          can_create: perm.create,
          can_read: perm.read,
          can_update: perm.update,
          can_delete: perm.delete,
        };
      });

      const body = {
        roleId: selectedRole,
        permissions: payload,
      };

      const response = await updatePermission(token, body)
      if (response) {
        alert("Permissions updated successfully!");
        setCanEdit(false);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to update permissions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchRole()
      fetchModule()
    }
  }, [])

  useEffect(() => {
    permissionHandler()
  }, [selectedRole])

  if (loading) {
    return (
      <>Loading...</>
    )
  }
  return (
    <>
      <h3 className='font-semibold text-xl mb-3'>Permission</h3>
      <p>Select Role</p>
      <select name="" id="" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className='border w-full md:w-1/2 lg:w-1/4  py-2'>
        {
          roleList.map((role) => {
            return (
              <option key={role.id} value={role.id}>{role.name}</option>
            )
          })
        }
      </select>
      <div>
        <table className='w-full md:w-1/2'>
          <thead>
            <tr>
              <th>Module</th>
              <th>Create</th>
              <th>Read</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          {
            module.length > 0 && Object.keys(permission).length > 0 &&
            <tbody>
              {
                module.map((mod) => {
                  let perm = permission[mod.name.toLowerCase()]
                  return (
                    <tr key={`${mod.id}-${mod.name}`}>
                      <td>{mod.name}</td>
                      {['create', 'read', 'update', 'delete'].map((action) => {
                        return (
                          <td className='text-center' key={`${mod.id}-${action}`}>
                            <input type="checkbox" name="" id="" checked={perm[action] || false} className={`${!canEdit ? "cursor-not-allowed" : 'cursor-pointer cursor-allowed'}`} onChange={() => handleCheckbox(mod.name.toLowerCase(), action)} />
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              }
            </tbody>
          }
        </table>
        <div className='mt-4'>
          {
            canEdit ? <button className='bg-violet-600 text-white px-4 py-1 font-semibold rounded' onClick={submitHandler}>Save</button> :
              <button className='bg-yellow-500 text-black px-4 py-1 font-semibold rounded' onClick={() => setCanEdit(true)}>Update</button>
          }
        </div>
      </div>
    </>
  )
}

export default Permission