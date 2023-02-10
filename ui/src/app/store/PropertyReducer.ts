import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Property } from "../data/Property";

export const PropertyApi = createApi({
    reducerPath: 'propertyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
    }),
    tagTypes: ["Property"],
    endpoints: (build) => ({
        getPropertiesById: build.query<Property[], string>({
            query: (id: string) => ({ url: `MOCK_DATA.json` }),
            providesTags: ['Property'],
        }),
    }),
});

export const { useGetPropertiesByIdQuery } = PropertyApi;

