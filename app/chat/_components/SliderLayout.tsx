import { getConversationsByUser } from "@/app/db/redis";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ChevronUp, Plus, User2 } from "lucide-react";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { TbList } from "react-icons/tb";

interface SliderLayoutProps {
  children: React.ReactNode;
}
async function ConversionList({ userId }: { userId: string }) {
  const conversions = await getConversationsByUser(userId!);

  return (
    <SidebarMenu>
      {conversions.map((conversion) => (
        <SidebarMenuItem key={conversion.id}>
          <SidebarMenuButton asChild>
            <a href={`/chat/conversation/${conversion.id}`}>
              <TbList />
              <span>{conversion.id}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

async function UserDropdown() {
  const user = await currentUser();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User2 /> {user?.fullName}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem>
              <SignOutButton>
                <a>Sign out</a>
              </SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default async function SliderLayout({ children }: SliderLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const { userId } = await auth();
  if (!userId) {
    return <main className="w-full">{children}</main>;
  }
  return (
    <SidebarProvider className="h-full" defaultOpen={defaultOpen}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Conversations</SidebarGroupLabel>
            <SidebarGroupAction>
              <Plus />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <Suspense fallback={<Spinner />}>
                <ConversionList userId={userId!} />
              </Suspense>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Suspense fallback={<Spinner />}>
            <UserDropdown />
          </Suspense>
        </SidebarFooter>
      </Sidebar>
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
