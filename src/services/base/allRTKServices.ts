import { aboutService } from "../aboutService";
import { blogService } from "../blogService";
import { cateService } from "../categoryService";
import { manuService } from "../manuService";
import { notificationService } from "../notificationService";
import { policyService } from "../policyService";
import { productService } from "../productService";
import { searchService } from "../searchService";
import { siteConfigService } from "../siteConfigService";

export const allRTKServices = {
  aboutService,
  productService,
  cateService,
  siteConfigService,
  policyService,
  manuService,
  blogService,
  searchService,
  notificationService,
};
