import { message } from "antd";
import { addImages, loadImage } from "../../api/images";
import { db } from "../../firebase";
import { getUserInfo, setUser } from "../auth/action";
import { UserActionTypes } from "../auth/types";

export const parseImage = async (
  filename: string,
  userId: string
): Promise<any> => ({
  fullscreen: await loadImage(userId, filename),
  original: await loadImage(userId, filename),
  thumbnail: await loadImage(userId, filename),
});

export const addImagesAsync = (uid, file) => async (
  dispatch: (fn: UserActionTypes) => {}
) => {
  try {
    const res = await addImages(uid, file);
    if (res.body.data) {
      const cu = await getUserInfo(uid);
      const user: any = cu.data();
      const photos = [...user.photos, res.body.data];
      await db()
        .collection("users")
        .doc(uid)
        .set({ ...user, photos });
      user.photos = photos;
      dispatch(setUser(user));
    }
    message.success("Image uploaded successfully");
  } catch (err) {
    message.error("An error has occured please try again");
    console.log(err);
  }
};
