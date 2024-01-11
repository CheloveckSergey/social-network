import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from ".";
import { Helpers } from "../../../shared/helpers";

interface NotesState {
  notes: Note[],
}

const initialState: NotesState = {
  notes: [],
}

const idGenerator = Helpers.createIdGenerator();

interface AddNoteAction {
  header: string,
  body: string,
  link: string
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<AddNoteAction>) {
      state.notes = [...state.notes, 
        {
          id: idGenerator(),
          header: action.payload.header,
          body: action.payload.body,
          link: action.payload.link,
        }
      ];
    }
  }
});

export const NotesActions = notesSlice.actions;