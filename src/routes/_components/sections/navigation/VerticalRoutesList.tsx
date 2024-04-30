import { Link } from "rakkasjs";
import { TooltipWrapper } from "@/components/wrappers/TooltipWrapper";
import { route_list } from "./route-list";
interface VerticalRoutesListProps {
  icontsOnly?: boolean;
}

export function VerticalRoutesList({ icontsOnly = true }: VerticalRoutesListProps) {
  const routes = route_list

  return (
    <div className="h-[80%] flex flex-col justify-between items-center gap-1 ">
      <div>
        <TooltipWrapper label="Home">
          <Link  href="/" className="">
            <img src="/site.svg" alt="logo" className="size-10" />
          </Link>
        </TooltipWrapper>
      </div>
      <ul className="flex flex-col gap-1 items-center ">
        {routes.map((route) => {
          return (
            <TooltipWrapper label={route.name} key={route.name}>
              <Link
                href={route.url}
                className="text-3xl  items-center flex gap-3 
                hover:bg-base-300 
              rounded-lg p-1 lg:p-2  "
              >
                {route.icon}
                {icontsOnly ? (
                  <div className="hidden  ">{route.name}</div>
                ) : (
                  <div className="flex text-lg ">{route.name}</div>
                )}
              </Link>
            </TooltipWrapper>
          );
        })}
      </ul>
    </div>
  );
}
