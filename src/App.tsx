import { Outlet } from "react-router-dom";

export type CampaignType = {
  campaignId: number;
  clicks: number;
  cost: number;
  date: string;
};

export type ProfileType = {
  profileId: number;
  country: string;
  marketplace: string;
  campaigns?: CampaignType[];
};

export type AccountType = {
  accountId: number;
  email: string;
  authToken: string;
  creationDate: Date;
  profiles?: ProfileType[];
};

const App = () => {
  return (
    <div className="d-flex vw-100 vh-100 align-items-center justify-content-center flex-column">
      <Outlet />
    </div>
  );
};

export default App;
