export const formConfig = {
  employee: [
    { name: "name", label: "Employee Name", type: "text", id:"ename" },
    { name: "email", label: "Email", type: "email",id:"e_email" },
    { name: "department", label: "Department", type: "text",id:"dept" },
    { name: "salary", label: "Salary", type: "number",id:"sal" },
  ],

  enterprise: [
    { name: "name", label: "Enterprise Name", type: "text",id:"entname" },
    { name: "address", label: "Address", type: "text",id:'add' },
    { name: "country", label: "Country", type: "text",id:'cont' },
    { name: "city", label: "City", type: "text",id:'ct' },
    { name: "state", label: "State", type: "text",id:'st' },
    { name: "email", label: "Email ID", type: "email",id:'mail' },
    { name: "website", label: "Enterprise Website URL", type: "text",id:'url' },
  ],

  product: [
    { name: "name", label: "Product Name", type: "text", id:"pname"},
    { name: "sku", label: "SKU", type: "text" ,id:"psku" },
    { name: "price", label: "Price", type: "number" ,id:"prod_price" },
    { name: "category", label: "Category", type: "text" ,id:"catg" },
    { name: "stocks", label: "Stock", type: "number" ,id:"prod_stk" },
  ],

  user: [
    { name: "name", label: "Username", type: "text" ,id:"uname" },
    { name: "email", label: "Email", type: "email" ,id:"umail" },
    { name: "password", label: "Password", type: "password" ,id:"upassword" },
  ],
  
  role: [
    { name: "name", label: "Role Name", type: "text" }
  ],
};
