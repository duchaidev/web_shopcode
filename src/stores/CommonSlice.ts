import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	counterLoading: 0 as number,
	type: 'success' as NoticeType,
	message: '' as string,
	description: '' as string,
};

const CommonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		incrementLoading: (state) => {
			state.counterLoading = state.counterLoading + 1;
		},
		decrementLoading: (state) => {
			if (state.counterLoading - 1 < 0) {
				state.counterLoading = 0;
			} else {
				state.counterLoading = state.counterLoading - 1;
			}
		},
	},
});

export default CommonSlice;
