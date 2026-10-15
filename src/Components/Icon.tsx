import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AppsIcon from "@mui/icons-material/Apps";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";
import SellIcon from "@mui/icons-material/Sell";
import ShareIcon from "@mui/icons-material/Share";
import ShieldIcon from "@mui/icons-material/Shield";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import type { SvgIconComponent } from "@mui/icons-material";

const icons: Record<string, SvgIconComponent> = {
  add: AddIcon,
  app: AppsIcon,
  arrow: AutorenewIcon,
  cart: ShoppingCartIcon,
  delete: DeleteIcon,
  heart: FavoriteBorderIcon,
  headset: HeadsetMicIcon,
  home: HomeIcon,
  layers: LayersIcon,
  lock: LockIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  plus: AddIcon,
  refresh: AutorenewIcon,
  return: AutorenewIcon,
  search: SearchIcon,
  shield: ShieldIcon,
  share: ShareIcon,
  star: StarIcon,
  tag: SellIcon,
  truck: LocalShippingIcon,
  user: PersonIcon,
};

export default function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Component = icons[name] ?? ShieldIcon;
  return (
    <Component className={className} fontSize="inherit" aria-hidden="true" />
  );
}
