import { GoogleModule } from "@/modules/google/google.module";
import { UserModule } from "@/modules/user/user.module";
import { AuthModule } from "@/modules/auth/auth.module";

export default [
    AuthModule,
    GoogleModule,
    UserModule,
];