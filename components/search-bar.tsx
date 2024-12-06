"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        // Prevent the form from doing default behavior
        e.preventDefault();

        // Make new searchParams
        const params = new URLSearchParams(searchParams.toString());
        params.set("query", query);

        // Redirect to search
        router.push("/results?" + params.toString());
    }

    return (<div className="flex-grow mx-4">
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search recipes..."
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={query}
                onChange={(elem) => {
                    // const spaceRegex = /[_ ]+/;
                    // const commaRegex = /[,]+/;
                    // const noStartSpaceRegex = /,_/;
                    // const noEndSpaceRegex = /_,/;
                    // const newQuery = elem.target.value
                    //     .toLowerCase()
                    //     .replace(spaceRegex, '_')
                    //     .replace(commaRegex, ',')
                    //     .replace(noStartSpaceRegex, ',')
                    //     .replace(noEndSpaceRegex, ',');
                    // const tagRegex = /^[a-z,_]*$/;
                    // if(tagRegex.test(newQuery)) {
                    //     setQuery(newQuery);
                    // }
                    setQuery(elem.target.value);
                }}
            />
            <button type="submit" style={{display: "none"}} />
        </form>
    </div>);
}