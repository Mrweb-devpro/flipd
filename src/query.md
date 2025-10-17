# React Query (tanstack)

```bash

  npm i tanstack/react-Query
```

<!-- initialize the query client -->

<!-- wrap the app with the query client provider -->

<!-- useQuery hook-->

```js
const [id, setId] = useState(1);
const [on, setOn] = useState(false);
const {
  data, // the data returned from the queryFn
  isLoading, // this is for when it is fetching for the first time
  isFetching, // this is for when it is fetching, wether it is cached or not
  isPending, // this is for when it is fetching and there is no cached data (re-caching)
  error, // this for error catching.
} = useQuery({
  queryKey: ["todos"], //-- a unique key used for fecthing and cacheing data
  queryKey: ["todos", id], //-- use this when the data you are fetching dynamic(meaing that is varies based on something or some variable like id). This way every time the id changes and the component remounts the data will be re-fetched because the querykey is different from its predecessors.
  // //----NOTE Each of those predecessor will be stored in the cache to avoid re-fething of already fetched data
  queryFn: async () => {
    //-- this function is used to call the API endpoint
    const response = await fetch("API EndPoint");
    return await response.json();
  },
  enabled: on, // this is for conditional dataFetching, the query will run if it is set to true
});

console.log(data);
```

## best practices

- create a folder "queryOptions"

```js of createTodo in the queryOptions
function createTodoQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: async (): Promise<Todos[]> => {
      const response = await fetch("API EndPoint");
      return await response.json();
    },
  });
}

const { data } = useQuery(createTodoQueryOptions);

type Todos = {
  //you can add types to the return type if you know the return type of the data
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};
```

###### useSuspenseQuery

- this should be used only when you want to tell react and typescript that the query will return something or when you are guranteed that the query will return something .
- you can use this with the suspense component from react
- you can use the enabled property on the suspense, for handling conditional data fetching. The property doenst exist at all in the useSuspenseQuery

```jsx

<Suspense fallback={<h1>Loading ...</h2>}>
<Card > //-- if anything is loading some unresolved data inside this Card component,the suspense will return the fallback
</Suspense>

```

```js In theCard component
const { data } = useSuspenseQuery(createTodoQueryOptions);
return <div>{JSON.stringify(data)}</div>;
```

###### For multiple ednpoint data fetching ==> useQuerys

-- this is good i for you want to fetch multiple data
-- it is also good for where one query depend on the result of another. But --NOTE this doesn't work for useSuspenseQueries

```js In theCard component
const [{ data }, result2, result3] = useQuerys({
  queries: [
    createTodoQueryOptions(), //-- the  query options for todos Data
    createUsersQueryOptions(), //-- the  query options for users Data
    createPostQueryOptions(), //-- the  query options for post Data
  ],
});
```

###### For multiple ednpoint data fetching ==> useSuspenseQueries

```js
//-- There is also useSuspenseQueries
const [{ data }, result2, result3] = useSuspenseQueries({
  queries: [
    createTodoQueryOptions(), //-- the query options for todos Data
    createUsersQueryOptions(), //-- the query options for users Data
    createPostQueryOptions(), //-- the query options for post Data
  ],
});
```

##### useMutation

```js
const mutation = useMutation({
  mutationFn: async (newTodo) => {
    const response = await fetch("URL", { method: "POST" });
  },
});
```
