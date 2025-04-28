import { z } from "zod";
import { Gender, UserStatus } from "../../../../generated/prisma";

const createAdminValidation =z.object({
    password:z.string({
        required_error: "Password is required",
    }),
    admin:z.object({
        name:z.string({
            required_error: "Name is required",
        }),
        email:z.string({
            required_error: "Email is required",
        }),
        contactNumber:z.string({
            required_error: "Contact Number is required",
        }),
       
    })
})

const createDoctorValidation =z.object({
    password:z.string({
        required_error: "Password is required",
    }),
    doctor:z.object({
        name:z.string({
            required_error: "Name is required",
        }),
        email:z.string({
            required_error: "Email is required",
        }),
        contactNumber:z.string({
            required_error: "Contact Number is required",
        }),
        address:z.string({
            required_error: "Address is required",
        }),
        registrationNumber:z.string({
            required_error: "Registration Number is required",
        }),
        experience:z.number({
            required_error: "Experience is required",
        }),
        appointmentFee:z.number({
            required_error: "Appointment Fee is required",
        }),
        qualification:z.string({
            required_error: "Qualification is required",
        }),
        currentWorkingplace:z.string({
            required_error: "Current Workingplace is required",
        }),
        designation:z.string({
            required_error: "Designation is required",
        }),
        gender:z.enum([Gender.female,Gender.male])

    })
})
const createPatientValidation = z.object({
    password:z.string({
        required_error: "Password is required",
    }),
    patient:z.object({
        email: z.string(), 
        name: z.string({ message: "Name is required" }),   
        contactNumber: z.string().optional(),  
        address: z.string().optional(),  
      })

});

const updateUserStatusValidation =
    z.object({
        status:z.enum(["ACTIVE","BLOCKED","DELETED"])
    })
  
 
    export const userValidation={
        createAdminValidation,createDoctorValidation,
        createPatientValidation,updateUserStatusValidation
    }
