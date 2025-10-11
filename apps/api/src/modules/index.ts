import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { InterestsModule } from "./interests/interests.module";
import { SeedModule } from "./seed/seed.module";
import { UploadsModule } from "@/modules/uploads/uploads.module";
import { EventModule } from "@/modules/event/event.module";
import { BookingModule } from "@/modules/booking/booking.module";
import { PaymentModule } from "@/modules/payment/payment.module";
import { SubscriptionModule } from "@/modules/subscription/subscription.module";
import { CalendarModule } from "./calendar/calendar.module";
import { ReportsModule } from "@/modules/reports/reports.module";
import { CitiesModule } from "@/modules/cities/cities.module";
import { DiscoverModule } from "@/modules/discover/discover.module";

export default [
    AuthModule.forRoot(),
    CitiesModule,

    DiscoverModule,
    ReportsModule,

    UserModule,
    ProfileModule,
    CalendarModule,
    InterestsModule,
    EventModule,
    BookingModule,
    PaymentModule,
    SubscriptionModule,
    SeedModule,
    UploadsModule,
];