import { FC } from 'react';

import { FaRegBell } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { IoMdExit } from 'react-icons/io';
import "./styles.scss";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { authThunks } from '../../fetures/auth';
import { AllMessagesButton, MessagesUi } from '../../entities/message';
import { SharedUi } from '../../shared/sharedUi';
import { NotesUi } from '../../entities/notes';

const Upbar: FC = () => {
  const navigate = useNavigate();

  const { user, loading, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  
  return (
    <div className='upbar'>
      <h1>SuckNet</h1>
      <div>
        <input>

        </input>
      </div>
      <SharedUi.Buttons.ExtraButton
        Icon={FaRegBell}
        iconSize={25}
      >
        <NotesUi.NotesList />
      </SharedUi.Buttons.ExtraButton>
      <AllMessagesButton />
      <MessagesUi.MyMessageStatuses />
      <div>
        Minisongbar
      </div>
      <div>
        <FiSettings size={25} />
      </div>
      <button className='green-to-pale' onClick={() => {
        if (user) {
          dispatch(authThunks.logoutThunk({userId: user?.id}));
        }
        navigate('/auth');
      }}>
        <IoMdExit size={25} />
      </button>
    </div>
  )
}

export default Upbar;