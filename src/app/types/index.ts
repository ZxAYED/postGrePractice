import { userRole } from "../../../generated/prisma";

export interface DecodedToken {
    id: string;
    email: string;
    role: userRole;
}
export type IAuthUser = {
    email: string;
    role: userRole
} | null;
export type IPaginationOptions = {
    page?: number,
    limit?: number,
    sortOrder?: string,
    sortBy?: string}