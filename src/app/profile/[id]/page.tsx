import { UserProfile } from "../../../../common.types";
import ProfilePage from "../../../../components/ProfilePage";
import { getUserProject } from "../../../../lib/actions";

type Props = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params }: Props) => {
  const result = (await getUserProject(params.id, 100)) as {
    user: UserProfile;
  };

  if (!result?.user) {
    return <p className="no-result-text">Fail to fetch user info</p>;
  }

  return <ProfilePage user={result?.user} />;
};

export default UserProfile;
