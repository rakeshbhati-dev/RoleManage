const Employee = require('../models/employee.model')
const Role = require('../models/role.model')
const Enterprise = require('../models/enterprise.model')

const createEmployee = async (req, res) => {

    try {
        const { name, email, department, salary, status, roleId, enterpriseId } = req.body
        const role = await Role.findByPk(roleId)
        if (!role) {
            return res.status(404).json({ error: "No Role found" })
        }
        const enterprise = await Enterprise.findByPk(enterpriseId)
        if (!enterprise) {
            return res.status(404).json({ error: "No Enterprise found" })
        }
        const employee = await Employee.create({ name, email, department, salary, status, RoleId: roleId, EnterpriseId: enterpriseId })
        return res.status(201).json({ employee: employee })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}

const getEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const employee = await Employee.findByPk(id)
        if (!employee) {
            return res.status(404).json({ error: "No Employee Found" })
        }
        return res.status(200).json({ employee: employee })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}

const getAllEmployee = async (req, res) => {
    try {
        const employeeList = await Employee.findAll()
        if (employeeList.length == 0) {
            return res.status(200).json({ message: "No Employee Found" })
        }
        else {
            return res.status(200).json({ employeeList: employeeList })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, department, salary, status, roleId, enterpriseId } = req.body
        const employee = await Employee.findByPk(id)
        if (!employee) {
            return res.status(404).json({ error: "No Employee Found." })
        }
        if (roleId) {
            const role = await Role.findByPk(roleId)
            if (!role) {
                return res.status(404).json({ error: "Role do not exist" })
            }
            else {
                employee.RoleId = roleId
            }
        }

        if (enterpriseId) {
            const enterprise = await Enterprise.findByPk(enterpriseId)
            if (!enterprise) {
                return res.status(404).json({ error: "Enterprise do not exist" })
            }
            else {
                employee.EnterpriseId = enterpriseId
            }
        }

        if (name) employee.name = name
        if (email) employee.email = email
        if (department) employee.department = department
        if (salary) employee.salary = salary
        if (status) employee.status = status

        employee.save()
        return res.status(200).json({ employee: employee })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Employee.destroy({ where: { id: id } })

        if (deleted == 0) {
            return res.status(400).json({ error: "Unable to delete employee" })
        }
        return res.status(200).json({ message: "Employee deleted successfully." })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}

module.exports = { createEmployee, getEmployee, getAllEmployee, updateEmployee,deleteEmployee }