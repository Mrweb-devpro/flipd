import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { searchForUsersByUsername } from "../actions/userStoreAction";

export function useSearchedUsers() {
  const queryClient = useQueryClient();

  const { data, refetch, isLoading } = useSuspenseQuery({
    queryKey: ["searchedUsers"],
    queryFn: () => searchForUsersByUsername(""),
  });

  const search = async (query: string) => {
    const data = await searchForUsersByUsername(query);
    queryClient.setQueryData(["searchedUsers"], data);
  };

  return { data, search, refetch, isLoading };
}
