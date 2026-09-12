const { patcher, metro } = vendetta;

const UserProfileStore = metro.findByProps("getUserProfile");
const UserStore = metro.findByProps("getCurrentUser");

const GIF_BANNER_URL = "https://cdn.discordapp.com/attachments/1330769136397193250/1548187978109558885/From_Klickpin.com-_Save_these_14_Creative_holiday_table_setting_ideas_that_bring_together_comfort_beauty_and_useful_ideas_you_will_actually_try_fo.gif?ex=6aa625e9&is=6aa4d469&hm=047522f4cee3213814f3f72fa391b2592d3eebabc8e1160a53fc5f31f407a88e&";

let unpatch;

export default {
  onLoad: () => {
    unpatch = patcher.after("getUserProfile", UserProfileStore, (args, res) => {
      const currentUser = UserStore?.getCurrentUser();
      if (currentUser && args[0] === currentUser.id && res) {
        res.banner = GIF_BANNER_URL;
        res.bannerURL = GIF_BANNER_URL;
      }
    });
  },
  onUnload: () => {
    if (unpatch) unpatch();
  }
};
