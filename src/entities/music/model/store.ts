import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Music } from ".";

interface AudioState {
  music: Music | undefined,
  musics: Music[],
  curIndex: number,
  isPlaying: boolean,
  progressTime: number,
  audioTime: number,
  duration: number,
}

const initialState: AudioState = {
  music: undefined,
  musics: [],
  curIndex: 0,
  isPlaying: false,
  progressTime: 0,
  audioTime: 0,
  duration: 0,
}

type PlayAction = {
  music: Music,
  musics: Music[],
  curIndex: number,
}

type SetDurationAction = {
  duration: number,
}

type SetProgressAction = {
  progressTime: number,
}

type SetAudioTimeAction = {
  audioTime: number,
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setMusicAndPlay(state, action: PayloadAction<PlayAction>) {
      state.music = action.payload.music;
      state.musics = action.payload.musics;
      state.curIndex = action.payload.curIndex;
      state.isPlaying = true;
    },
    play(state, action) {
      if (state.music) {
        state.isPlaying = true;
      }
    },
    pause(state, action) {
      state.isPlaying = false;
    },
    next(state, action) {
      const musics: Music[] = state.musics;
      const curIndex: number = state.curIndex;
      if (curIndex === (musics.length - 1)) {
        state.curIndex = 0;
        state.music = musics[0];
      } else {
        state.curIndex++;
        state.music = musics[curIndex + 1];
      }
    },
    previous(state, action) {
      const musics: Music[] = state.musics;
      const curIndex: number = state.curIndex;
      if (curIndex === 0) {
        state.curIndex = musics.length - 1;
        state.music = musics[musics.length - 1]
      } else {
        state.curIndex--;
        state.music = musics[curIndex - 1];
      }
    },
    setDuration(state, action: PayloadAction<SetDurationAction>) {
      if (action.payload.duration < 0) {
        return;
      }
      state.duration = action.payload.duration;
    },
    setProgressTime(state, action: PayloadAction<SetProgressAction>) {
      if (action.payload.progressTime < 0) {
        return;
      }
      state.progressTime = action.payload.progressTime;
    },
    setAudioTime(state, action: PayloadAction<SetAudioTimeAction>) {
      state.audioTime = action.payload.audioTime;
    }
  }
})

export const AudioSliceActions = audioSlice.actions;