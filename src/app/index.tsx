import './styles/common.scss'
import {useAuth} from "@/entities/UserProfile/hooks/useAuth/useAuth.tsx";
import Layout from "@/app/ui/Layout/Layout.tsx";
import {RouterProvider} from "@/app/providers/router";
import {Sign} from "@/widgets/Sign";
import {Modal} from "@/shared/ui/Modal";
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {getProfile} from "@/entities/UserProfile/model/selectors/getUserProfile/getUserProfile.ts";
import {PageLoader} from "@/shared/ui/PageLoader";

export const App = () => {

  const {isAuth} = useAppSelector(getProfile);

  const {logOut, isLoading} = useAuth();

  if (isLoading) {
    return <PageLoader/>
  }

  return (
    <>
      {isAuth ? (
        <Layout logout={logOut}>
          <RouterProvider/>
          <Modal/>
        </Layout>
      ) : (
        <Sign login={null}/>
      )}
    </>
  )
}
