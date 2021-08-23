import { Generic } from "../common/generic.model"

export interface User {
    id ?: number;
    name ?: string;
    uniqueId ?: string;
    email ?: string;
    password ?: string;
    newPassword ?: string;
    confirmPassword ?: string;
    phone ?: string;
    address ?: string;
    addressNumber ?: string;
    addressComplement ?: string;
    district ?: string;
    city ?: string;
    state ?: string;
    zipCode ?: string;
    bio ?: string;
    site ?: string;
    profileImage ?: string;
    userType ?: Generic;
    userStatus ?: Generic;
    occupationAreas ?: Generic[];
    balance ?: number;
    category ?: number;
}
