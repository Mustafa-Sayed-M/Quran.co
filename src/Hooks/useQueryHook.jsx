import { useQuery } from "@tanstack/react-query";

function useQueryHook({ queryKey, queryFn }) {

    const { data, isLoading, isError } = useQuery({
        queryKey,
        queryFn,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, isError };
}

export default useQueryHook;