import { EntitySystemAdminRoleEnum } from "src/modules/users/enum/system_admin.enum";


export class JwtTokenPayloadModel {
  sub: string;
  entityName: EntitySystemAdminRoleEnum;
}
