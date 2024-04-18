import { FC } from "react";
import './styles.scss';
import { GroupsLib, GroupsUi } from "../../../entities/group";
import { SharedUi } from "../../../shared/sharedUi";
import { GroupFeaturesUi } from "../../../fetures/group";

interface MProps {
  groupId: number,
}
export const MembersPanel: FC<MProps> = ({ groupId }) => {

  const {
    members,
    isLoading,
    isError,
    changeGMType,
  } = GroupsLib.useMembers(groupId)

  return (
    <div className="regular-panel members-panel">
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={isLoading}
        isError={isError}
      >
        {members?.length ? (
          members.map((member, index) => <GroupsUi.MemberCard 
            key={index}
            member={member}
            actions={[
              <SharedUi.Buttons.ExtraActionsDotButton 
                buttons={[
                  <GroupFeaturesUi.DeleteMemberExtraLine 
                    key={0} 
                    memberId={member.id} 
                  />,
                  <GroupFeaturesUi.ChangeGMTypeButton 
                    key={1} 
                    memberId={member.id} 
                    changeGMType={changeGMType}
                  />
                ]}
              />
            ]}
          />)
        ) : (
          <SharedUi.Divs.Empty
            body="No Members"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}