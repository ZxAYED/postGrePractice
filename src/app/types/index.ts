import { userRole } from "../../../generated/prisma";

export interface DecodedToken {
    id: string;
    email: string;
    role: userRole;
}