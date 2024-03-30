import { FC } from "react"
import { GroupsUi, GroupsLib, OneGroup } from "../../../entities/group"

export const GroupList: FC = () => {
  
  const {
    groups,
    isLoading,
    isError,
  } = GroupsLib.useAllGroups()

  return (
    <div className="groups-list">
      <GroupsUi.GroupsList
        groups={groups}
        isLoading={isLoading}
        isError={isError}
        renderGroup={(group: OneGroup, index: number) => <GroupsUi.GroupCard
          key={index}
          group={group}
        />}
      />
    </div>
  )
}