import './styles/common.scss'
import {useAuth} from "@/entities/UserProfile/hooks/useAuth/useAuth.tsx";
import Layout from "@/app/ui/Layout/Layout.tsx";
import {RouterProvider} from "@/app/providers/router";
import {Sign} from "@/widgets/Sign";
import {Modal} from "@/shared/ui/Modal";

export const App = () => {
  const {isAuthenticated, loading, logOut, logIn} = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <Layout logout={logOut}>
          <RouterProvider/>
          <Modal/>
        </Layout>
      ) : (
        <Sign login={logIn}/>
      )}
    </>
  )
}
