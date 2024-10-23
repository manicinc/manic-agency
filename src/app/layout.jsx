
import RoutingLayout from "./layout/RoutingLayout";

export const metadata = {
  title: {
    template: "Manic Agency",
    default: "Manic Agency",
  },
};

export default function Layout({ children }) {

  return <RoutingLayout>{children}</RoutingLayout>
  

}
