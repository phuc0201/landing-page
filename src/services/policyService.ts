import type { Policy } from "../types/policy.type";
import { createBaseApiFactory } from "./base/baseFactory";

export const policyService = createBaseApiFactory<Policy, "Policy">({
  resource: "/policies",
  tag: "Policy",
});

export const { useGetListQuery: useGetPoliciesQuery, useGetByIdQuery: useGetPolicyByIdQuery } =
  policyService;
