import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDashboardLeadership = createAsyncThunk(
  "leadership/fetchDashboardLeadership",
  async () => {
    const response = await axios.get("/api/leadership");
    // Map dashboard TeamMember structure to website internal teamData structure
    return response.data.map((item: any) => ({
      id: item.id,
      img: item.image_url || "/assets/img/team/1.png",
      title: item.name,
      subTitle: item.title,
      socials: [
        { icon: "fa-facebook-f", link: "#" },
        { icon: "fa-twitter", link: "#" },
        { icon: "fa-linkedin-in", link: "#" }
      ]
    }));
  }
);

interface LeadershipState {
  teamData: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: LeadershipState = {
  teamData: [],
  status: 'idle',
};

const leadershipSlice = createSlice({
  name: "leadership",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardLeadership.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardLeadership.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teamData = action.payload;
      })
      .addCase(fetchDashboardLeadership.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default leadershipSlice.reducer;
