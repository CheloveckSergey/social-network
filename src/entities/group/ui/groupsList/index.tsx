import { FC } from "react";
import { SharedUi } from "../../../../shared/sharedUi";
import { OneGroup } from "../../model";

interface GLProps {
  groups: OneGroup[],
  isLoading: boolean,
  isError: boolean,
  renderGroup: (group: OneGroup, index: number) => React.ReactNode | React.ReactNode[],
}
export const GroupsList: FC<GLProps> = ({ groups, isLoading, isError, renderGroup }) => {

  return (
    <div className="groups-list">
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={isLoading}
        isError={isError}
      >
        {groups?.length > 0 ? (
          groups.map(renderGroup)
        ) : (
          <SharedUi.Divs.Empty
            body="No fucking groups"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}