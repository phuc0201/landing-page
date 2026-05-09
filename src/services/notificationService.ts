import type { ApiResponse } from "../types/apiResponse";
import { createBaseApiFactory } from "./base/baseFactory";

interface ContactFormData {
  type: "contact";
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const notificationService = createBaseApiFactory<any, "Notification">({
  resource: "/notifications",
  tag: "Notification",
});

const notificationExtraApi = notificationService.injectEndpoints({
  endpoints: (builder) => ({
    sendContact: builder.mutation<ApiResponse<null>, ContactFormData>({
      query: (data) => ({
        url: "notifications",
        method: "POST",
        data,
      }),
      transformErrorResponse: (response) => {
        console.error("Send contact failed:", response);
        return response;
      },
    }),
  }),
});

export const { useSendContactMutation } = notificationExtraApi;
