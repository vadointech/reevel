import { GoogleModule } from "./google/google.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { InterestsModule } from "./interests/interests.module";

export default [
    AuthModule,
    GoogleModule,
    UserModule,
    ProfileModule,
    InterestsModule,
];