import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const TRACK_WIDTH = SCREEN_WIDTH * 3; // 横スクロール用の幅
export const START_X = 40; // スタート位置のx座標
export const END_X = TRACK_WIDTH - 40; // ゴール位置のx座標
export const TRACK_HEIGHT = 8; // プログレスバーの高さ
export const THUMBNAIL_SIZE_WIDTH = 80; // 表紙画像のサイズ
export const THUMBNAIL_SIZE_HEIGHT = 112; // 表紙画像のサイズ
export const FLAG_SIZE = 40; // 旗のサイズ
export const MARK_SIZE = 18; // マーカーのサイズ


