import { FC } from "react";
import './styles.scss';
import { useNavigate } from "react-router-dom";
import { Note } from "../model";
import { useAppSelector } from "../../../app/store";

interface NoteLineProps {
  note: Note,
}
const NoteLine: FC<NoteLineProps> = ({ note }) => {

  const navigate = useNavigate();

  return (
    <div 
      className="note-line"
      onClick={() => navigate(note.link)}
    >
      <h4 className="header">{note.header + ' ' + note.id}</h4>
      <p>{note.body}</p>
    </div>
  )
}

const NotesList: FC = () => {

  const { notes } = useAppSelector(state => state.notes);

  return (
    <div className="notes-list">
      {notes.length ? (
        notes.map((note, index) => <NoteLine 
          key={index}
          note={note}
        />)
      ) : (
        <div className="empty">
          Никаких уведомлений
        </div>
      )}
    </div>
  )
}

export const NotesUi = {
  NoteLine,
  NotesList,
}