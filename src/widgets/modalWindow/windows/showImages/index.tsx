import { FC } from "react";
import { useAppSelector } from "../../../../app/store";
import { useQuery } from "react-query";
import { ImageApi } from "../../../../entities/image";
import OrdinarPanel from "../../types/ordinarType.tsx";
import LoadErrorHandler from "../../../../shared/loadErrorHandler";
import './styles.scss';

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
      <LoadErrorHandler
        isError={isError}
        isLoading={isLoading}
        data={data}
      >
        <div>asdf</div>
      </LoadErrorHandler>
    </OrdinarPanel>
  )
}

export default ShowImages;