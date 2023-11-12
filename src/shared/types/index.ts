export type Hook<Entity, Effects> = (entity: Entity, effects: Effects) => {
  headline: string,
  refetch: () => any,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
}