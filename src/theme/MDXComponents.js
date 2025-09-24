import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import AdsComponent from "@site/src/components/AdsComponent";
import BrowserWindow from "@site/src/components/BrowserWindow";
import GiscusComponent from "@site/src/components/GiscusComponent";
import MDXComponents from "@theme-original/MDXComponents";
import DocCardList from "@theme/DocCardList";
import Image from "@theme/IdealImage";
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";
import { FaReact } from "react-icons/fa";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // custom
  Tabs,
  TabItem,
  BrowserWindow,
  GiscusComponent,
  DocCardList,
  FaReact,
  Image,
  LiteYouTubeEmbed,
  AdsComponent,
};
