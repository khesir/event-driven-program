import * as z from "zod"

export const postSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

export const AddEmployeeSchema = z.object({
    firstname: z.string().min(1),
    middlename: z.string().min(1),
    lastname: z.string().min(1),
    address_line: z.string().min(1),
    barangay: z.string().min(1),
    province: z.string().min(1),
    country: z.string().min(1),
    last_update: z.string()
});

export const AddDepartmentSchema = z.object({
    departmentName: z.string().min(1),
    status: z.string().min(1)
});

export const EmployeeSchema = z.object({
    id:z.string(),
    firstname: z.string().min(1),
    middlename: z.string().min(1),
    lastname: z.string().min(1),
    address_line: z.string().min(1),
    barangay: z.string().min(1),
    province: z.string().min(1),
    country: z.string().min(1),
    last_update: z.string()
});


export const DepartmentSchema = z.object({
    id:z.string(),
    departmentName: z.string().min(1),
    status: z.string().min(1)
});
export const DesignationSchema = z.object({
    id:z.string(),
    departmentId: DepartmentSchema,
    designationName: z.string(),
    status: z.string()
  });
  

export const AssignDesignation = z.object({
    id: z.string(),
    employeeType: z.string(),
    status: z.string(),
    designation: DesignationSchema,
    employee: EmployeeSchema,
  });

