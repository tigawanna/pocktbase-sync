import {
  ClientSuspense,
  type LayoutProps,
  type PreloadContext,
} from "rakkasjs";
import ErrorBoundaryComponent from "@/components/wrappers/ErrorBoundaryComponent";
import "./index.css";
import { TailwindIndicator } from "@/components/others/tailwind-indicator";
import { Toolbar } from "@/routes/_components/sections/navigation/Toolbar";
import { Toaster } from "@/components/shadcn/ui/sonner";
import { getSSRFriendlyTheme } from "@/lib/rakkas/theme";
import "@/components/pagination/pagination.css";
function MainLayout({ children }: LayoutProps) {
  // useHead({

  // })
  return (
    <ErrorBoundaryComponent>
      <div className="flex h-full min-h-screen w-full  flex-col items-center justify-center ">
        <Toolbar />
        {children}
        <TailwindIndicator />

        <ClientSuspense fallback={<div className="h-8 " />}>
          <Toaster richColors className="" />
        </ClientSuspense>
      </div>
    </ErrorBoundaryComponent>
  );
}
MainLayout.preload = (ctx: PreloadContext) => {
  const theme = getSSRFriendlyTheme(ctx.requestContext);
  return {
    head: {
      title: "Pocketbase sync",

      description:
        "Sync your remote  Pocketbase instance with your local instance ",
      htmlAttributes: { "data-theme": theme },
      elements: [
        {
          tagName: "link",
          rel: "icon",
          type: "image/svg+xml",
          href: "/site.svg",
        },
      ],
      // htmlAttributes:{ "data-theme":"dark" }
    },
  };
};

export default MainLayout;
