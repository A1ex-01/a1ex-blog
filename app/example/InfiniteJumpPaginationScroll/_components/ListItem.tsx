import { IListItem } from "./List";

interface ListItemProps {
  item: IListItem;
}

export default function ListItem({ item }: ListItemProps) {
  return (
    <div
      className="flex cursor-grab items-center gap-2 rounded-md border bg-background p-2 shadow-sm"
      role="button"
      aria-disabled="false"
      aria-roledescription="draggable"
      aria-describedby="DndDescribedBy-0"
    >
      <div className="h-2 w-2 shrink-0 rounded-full"></div>
      <p className="m-0 flex-1 font-medium text-sm">{item.title}</p>
      <span className="relative flex overflow-hidden rounded-full h-4 w-4 shrink-0">
        <img
          className="aspect-square h-full w-full"
          src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=1"
        />
      </span>
    </div>
  );
}
