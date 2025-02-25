import { GoogleModule } from "./google/google.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { InterestsModule } from "./interests/interests.module";
import { SeedModule } from "./seed/seed.module";
import { UploadModule } from "./upload/upload.module";
import { CloudinaryModule } from "@/modules/upload/cloudinary/cloudinary.module";

export default [
    AuthModule,
    GoogleModule,
    UserModule,
    ProfileModule,
    InterestsModule,
    SeedModule,
    UploadModule,
    // CloudinaryModule,
];