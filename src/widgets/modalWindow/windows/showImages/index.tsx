import { FC } from "react";
import { useAppSelector } from "../../../../app/store";
import { useQuery } from "react-query";
import { ImageApi } from "../../../../entities/image";
import OrdinarPanel from "../../types/ordinarType.tsx";
import './styles.scss';
import { SharedUi } from "../../../../shared/sharedUi";

const ShowImages: FC = () => {
  const { user } = useAppSelector(state => state.user);

  const { data, isLoading, isError } = useQuery(
    ['getUserImages', user?.id],
    () => {
      if (user) {
        return ImageApi.getAllImagesByUserId(user.id);
      }
    }
  );

  return (
    <OrdinarPanel 
      windowName="Images"
      windowClass="show-images-window"
    >
      <SharedUi.Helpers.LoadErrorHandler
        isError={isError}
        isLoading={isLoading}
      >
        <div>asdf</div>
      </SharedUi.Helpers.LoadErrorHandler>
    </OrdinarPanel>
  )
}

export default ShowImages;