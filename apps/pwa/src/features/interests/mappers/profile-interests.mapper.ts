import { ProfileInterestsEntity } from "@/entities/profile";
import { InterestEntity } from "@/entities/interests";

export function profileInterestsToInterestsEntity(profile: ProfileInterestsEntity): InterestEntity {
    return profile.interest;
}