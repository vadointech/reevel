import { Injectable } from "@nestjs/common";
import * as deepl from "deepl-node";

import data from "../seed/data/interests.json";
import { InjectRepository } from "@nestjs/typeorm";
import { InterestCategoriesEntity } from "@/modules/interests/entities/interest-category.entity";
import { Repository } from "typeorm";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";
import slugify from "slugify";
import { InterestRelationsEntity } from "@/modules/interests/entities/interest-relations.entity";


@Injectable()
export class InterestsService {

}
