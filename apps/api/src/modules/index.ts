import { GoogleModule } from "./google/google.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { InterestsModule } from "./interests/interests.module";
import { SeedModule } from "./seed/seed.module";
import { UploadsModule } from "@/modules/uploads/uploads.module";
import { EventModule } from "@/modules/event/event.module";

export default [
    AuthModule,
    GoogleModule,
    UserModule,
    ProfileModule,
    InterestsModule,
    EventModule,
    SeedModule,
    UploadsModule,
];