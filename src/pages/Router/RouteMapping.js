import Dashboard from "../home/Dashboard";
import Users from "../member/Members";
import MembersGroup from "../member/MembersGroup";
import Organization from "../organization/Organization";
import OrgType from "../orgType/OrgType";
import Position from "../Position/Position";
import Profile from "../Profile/Profile";

const RouteMapping = {
  Dashboard: Dashboard,
  Profile: Profile,
  Users: Users,
  OrgType: OrgType,
  MembersGroup: MembersGroup,
  Position: Position,
  Organization: Organization,
};

export default RouteMapping;
