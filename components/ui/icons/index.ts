// Icon registry — the only layer that imports lucide-react for UI icons.
import type { LucideIcon, LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { ActivityIcon } from "./ActivityIcon";
import { ArchiveIcon } from "./ArchiveIcon";
import { ArrowRightIcon } from "./ArrowRightIcon";
import { ArrowUpDownIcon } from "./ArrowUpDownIcon";
import { AlertCircleIcon } from "./AlertCircleIcon";
import { BadgeCheckIcon } from "./BadgeCheckIcon";
import { BanknoteIcon } from "./BanknoteIcon";
import { BarChart3Icon } from "./BarChart3Icon";
import { BarcodeIcon } from "./BarcodeIcon";
import { BlocksIcon } from "./BlocksIcon";
import { CalendarIcon } from "./CalendarIcon";
import { CheckIcon } from "./CheckIcon";
import { CheckCircleIcon } from "./CheckCircleIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { ChevronLeftIcon } from "./ChevronLeftIcon";
import { ChevronRightIcon } from "./ChevronRightIcon";
import { CircleOffIcon } from "./CircleOffIcon";
import { CirclePlayIcon } from "./CirclePlayIcon";
import { CreditCardIcon } from "./CreditCardIcon";
import { DownloadIcon } from "./DownloadIcon";
import { EyeIcon } from "./EyeIcon";
import { ExternalLinkIcon } from "./ExternalLinkIcon";
import { FacebookIcon } from "./FacebookIcon";
import { FileTextIcon } from "./FileTextIcon";
import { FlameIcon } from "./FlameIcon";
import { FolderOpenIcon } from "./FolderOpenIcon";
import { FunnelIcon } from "./FunnelIcon";
import { GiftIcon } from "./GiftIcon";
import { GlobeIcon } from "./GlobeIcon";
import { GithubIcon } from "./GithubIcon";
import { HeartIcon } from "./HeartIcon";
import { ImageIcon } from "./ImageIcon";
import { ImagesIcon } from "./ImagesIcon";
import { InboxIcon } from "./InboxIcon";
import { InfoIcon } from "./InfoIcon";
import { InstagramIcon } from "./InstagramIcon";
import { LayoutDashboardIcon } from "./LayoutDashboardIcon";
import { LayoutGridIcon } from "./LayoutGridIcon";
import { LinkedinIcon } from "./LinkedinIcon";
import { ListIcon } from "./ListIcon";
import { ListCollapseIcon } from "./ListCollapseIcon";
import { ListOrderedIcon } from "./ListOrderedIcon";
import { LoaderCircleIcon } from "./LoaderCircleIcon";
import { LogOutIcon } from "./LogOutIcon";
import { MegaphoneIcon } from "./MegaphoneIcon";
import { MenuIcon } from "./MenuIcon";
import { MessageSquareIcon } from "./MessageSquareIcon";
import { MinusIcon } from "./MinusIcon";
import { MoreHorizontalIcon } from "./MoreHorizontalIcon";
import { MousePointer2Icon } from "./MousePointer2Icon";
import { NavigationIcon } from "./NavigationIcon";
import { PackageIcon } from "./PackageIcon";
import { PackageCheckIcon } from "./PackageCheckIcon";
import { PackageOpenIcon } from "./PackageOpenIcon";
import { PanelsTopLeftIcon } from "./PanelsTopLeftIcon";
import { PaletteIcon } from "./PaletteIcon";
import { PencilIcon } from "./PencilIcon";
import { PlaySquareIcon } from "./PlaySquareIcon";
import { PlusIcon } from "./PlusIcon";
import { ReceiptIcon } from "./ReceiptIcon";
import { ScanBarcodeIcon } from "./ScanBarcodeIcon";
import { SearchIcon } from "./SearchIcon";
import { SearchXIcon } from "./SearchXIcon";
import { SettingsIcon } from "./SettingsIcon";
import { ShareIcon } from "./ShareIcon";
import { SlidersHorizontalIcon } from "./SlidersHorizontalIcon";
import { ShoppingBagIcon } from "./ShoppingBagIcon";
import { ShoppingCartIcon } from "./ShoppingCartIcon";
import { SparklesIcon } from "./SparklesIcon";
import { StarIcon } from "./StarIcon";
import { StoreIcon } from "./StoreIcon";
import { Table2Icon } from "./Table2Icon";
import { TagIcon } from "./TagIcon";
import { TagsIcon } from "./TagsIcon";
import { TextCursorInputIcon } from "./TextCursorInputIcon";
import { ThumbsUpIcon } from "./ThumbsUpIcon";
import { TriangleAlertIcon } from "./TriangleAlertIcon";
import { TruckIcon } from "./TruckIcon";
import { TwitchIcon } from "./TwitchIcon";
import { TwitterIcon } from "./TwitterIcon";
import { UploadCloudIcon } from "./UploadCloudIcon";
import { UserIcon } from "./UserIcon";
import { XIcon } from "./XIcon";
import { YoutubeIcon } from "./YoutubeIcon";

export type { LucideIcon, LucideProps as IconSvgProps };

export const iconComponents = {
  "activity": ActivityIcon,
  "archive": ArchiveIcon,
  "arrow-right": ArrowRightIcon,
  "arrow-up-down": ArrowUpDownIcon,
  "alert-circle": AlertCircleIcon,
  "badge-check": BadgeCheckIcon,
  "banknote": BanknoteIcon,
  "bar-chart3": BarChart3Icon,
  "barcode": BarcodeIcon,
  "blocks": BlocksIcon,
  "calendar": CalendarIcon,
  "check": CheckIcon,
  "check-circle": CheckCircleIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "circle-off": CircleOffIcon,
  "circle-play": CirclePlayIcon,
  "credit-card": CreditCardIcon,
  "download": DownloadIcon,
  "eye": EyeIcon,
  "external-link": ExternalLinkIcon,
  "facebook": FacebookIcon,
  "file-text": FileTextIcon,
  "flame": FlameIcon,
  "folder-open": FolderOpenIcon,
  "funnel": FunnelIcon,
  "gift": GiftIcon,
  "globe": GlobeIcon,
  "github": GithubIcon,
  "heart": HeartIcon,
  "image": ImageIcon,
  "images": ImagesIcon,
  "inbox": InboxIcon,
  "info": InfoIcon,
  "instagram": InstagramIcon,
  "layout-dashboard": LayoutDashboardIcon,
  "layout-grid": LayoutGridIcon,
  "linkedin": LinkedinIcon,
  "list": ListIcon,
  "list-collapse": ListCollapseIcon,
  "list-ordered": ListOrderedIcon,
  "loader-circle": LoaderCircleIcon,
  "log-out": LogOutIcon,
  "megaphone": MegaphoneIcon,
  "menu": MenuIcon,
  "message-square": MessageSquareIcon,
  "minus": MinusIcon,
  "more-horizontal": MoreHorizontalIcon,
  "mouse-pointer2": MousePointer2Icon,
  "navigation": NavigationIcon,
  "package": PackageIcon,
  "package-check": PackageCheckIcon,
  "package-open": PackageOpenIcon,
  "panels-top-left": PanelsTopLeftIcon,
  "palette": PaletteIcon,
  "pencil": PencilIcon,
  "play-square": PlaySquareIcon,
  "plus": PlusIcon,
  "receipt": ReceiptIcon,
  "scan-barcode": ScanBarcodeIcon,
  "search": SearchIcon,
  "search-x": SearchXIcon,
  "settings": SettingsIcon,
  "share": ShareIcon,
  "sliders-horizontal": SlidersHorizontalIcon,
  "shopping-bag": ShoppingBagIcon,
  "shopping-cart": ShoppingCartIcon,
  "sparkles": SparklesIcon,
  "star": StarIcon,
  "store": StoreIcon,
  "table2": Table2Icon,
  "tag": TagIcon,
  "tags": TagsIcon,
  "text-cursor-input": TextCursorInputIcon,
  "thumbs-up": ThumbsUpIcon,
  "triangle-alert": TriangleAlertIcon,
  "truck": TruckIcon,
  "twitch": TwitchIcon,
  "twitter": TwitterIcon,
  "upload-cloud": UploadCloudIcon,
  "user": UserIcon,
  "x": XIcon,
  "youtube": YoutubeIcon,
} satisfies Record<string, ComponentType<LucideProps>>;

export type IconName = keyof typeof iconComponents;

export {
  ActivityIcon,
  ArchiveIcon,
  ArrowRightIcon,
  ArrowUpDownIcon,
  AlertCircleIcon,
  BadgeCheckIcon,
  BanknoteIcon,
  BarChart3Icon,
  BarcodeIcon,
  BlocksIcon,
  CalendarIcon,
  CheckIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleOffIcon,
  CirclePlayIcon,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  ExternalLinkIcon,
  FacebookIcon,
  FileTextIcon,
  FlameIcon,
  FolderOpenIcon,
  FunnelIcon,
  GiftIcon,
  GlobeIcon,
  GithubIcon,
  HeartIcon,
  ImageIcon,
  ImagesIcon,
  InboxIcon,
  InfoIcon,
  InstagramIcon,
  LayoutDashboardIcon,
  LayoutGridIcon,
  LinkedinIcon,
  ListIcon,
  ListCollapseIcon,
  ListOrderedIcon,
  LoaderCircleIcon,
  LogOutIcon,
  MegaphoneIcon,
  MenuIcon,
  MessageSquareIcon,
  MinusIcon,
  MoreHorizontalIcon,
  MousePointer2Icon,
  NavigationIcon,
  PackageIcon,
  PackageCheckIcon,
  PackageOpenIcon,
  PanelsTopLeftIcon,
  PaletteIcon,
  PencilIcon,
  PlaySquareIcon,
  PlusIcon,
  ReceiptIcon,
  ScanBarcodeIcon,
  SearchIcon,
  SearchXIcon,
  SettingsIcon,
  ShareIcon,
  SlidersHorizontalIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  SparklesIcon,
  StarIcon,
  StoreIcon,
  Table2Icon,
  TagIcon,
  TagsIcon,
  TextCursorInputIcon,
  ThumbsUpIcon,
  TriangleAlertIcon,
  TruckIcon,
  TwitchIcon,
  TwitterIcon,
  UploadCloudIcon,
  UserIcon,
  XIcon,
  YoutubeIcon,
};
