import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateBlogDto } from "./create-blog";

export class UpdateBlogDto extends  PartialType(
    OmitType(CreateBlogDto, [])
) {}