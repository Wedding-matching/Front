import usePost from "../hooks/usePost";

export const useAskQuery = ()=> {
    return usePost("/ask");
}