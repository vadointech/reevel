import { EditProfileFormSchemaValues } from "@/features/profile/update/edit-profile-form.schema";
import { UpdateProfile } from "@/api/profile";

export class EditProfileFormMapper {
    static toUpdateProfileRequestInput(input: Partial<EditProfileFormSchemaValues>): UpdateProfile.TInput {
        const {
            location,
            interests,
            avatar,
            ...changedData
        } = input;

        const output: UpdateProfile.TInput = {
            ...changedData,
            picture: avatar,
        };

        if (location) {
            output.placeName = location.displayName;
            output.locationCenter = [
                location.location.longitude,
                location.location.latitude,
            ];
            output.locationBbox = location.bbox;
        }

        if(interests) {
            output.interests = interests.map(item => item.slug);
        }

        return output;
    }
}