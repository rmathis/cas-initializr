import React, { ReactNode } from "react";

import { groupBy } from "lodash";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import {
    useGetPropertiesByIdQuery,
} from "../store/PropertyReducer";
import { HighlightOff } from "@mui/icons-material";
import { Property } from "../data/Property";

export interface PropertySearchProps {
    id: string;
    children: (properties: Property[], groups: string[], counts: number[]) => ReactNode;
}

export function PropertySearch({
    id,
    children,
}: PropertySearchProps) {
    const { data: properties = [] } = useGetPropertiesByIdQuery(id);

    const [search, setSearch] = React.useState<string>("");
    const [limited, setLimited] = React.useState<Property[]>([...properties]);
    const [groups, setGroups] = React.useState<string[]>([]);
    const [counts, setCounts] = React.useState<number[]>([]);

    const getSearchResults = React.useCallback(
        (search: string) => {
            return search.length > 0
                ? properties.filter((p) => p.name.toLowerCase().match(search.toLowerCase()))
                : properties;
        },
        [properties]
    );

    React.useEffect(() => {
        const results = getSearchResults(search);

        console.log(results);

        const grouped = groupBy(results, (item) => item.group);
        setLimited(results);
        setGroups(Object.keys(grouped));
        setCounts(Object.values(grouped).map((item) => item.length));
    }, [search, properties, getSearchResults]);

    return (
        <>
            <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <InputLabel htmlFor="dep-search-select-helper-label">
                    Search
                </InputLabel>
                <OutlinedInput
                    id="dep-search-select-helper-label"
                    fullWidth
                    label="Search"
                    value={search}
                    onChange={(ev) => setSearch(ev.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setSearch("")}
                                onMouseDown={() => setSearch("")}
                                edge="end"
                            >
                                <HighlightOff />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {children(limited, groups, counts)}
        </>
    );
}

/*

*/