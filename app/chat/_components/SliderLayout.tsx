import { getConversationsByUser } from "@/app/db/redis";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
import { auth, currentUser } from "@clerk/nextjs/server";
import { Plus, User2 } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import SidebarConversionLink from "./SIdebarConversionLink";

interface SliderLayoutProps {
  children: React.ReactNode;
}
async function ConversationList({ userId }: { userId: string }) {
  const conversations = await getConversationsByUser(userId!);
  return (
    <SidebarMenu>
      {conversations.map((conversation) => (
        <SidebarMenuItem key={conversation.id}>
          <SidebarConversionLink conversation={conversation} />
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
              {/* <ChevronUp className="ml-auto" /> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem>
              <SignOutButton>
                <a>Sign out</a>
              </SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent> */}
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
    <SidebarProvider className="min-h-full h-full" defaultOpen={defaultOpen}>
      <Sidebar className="absolute h-full">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Conversations</SidebarGroupLabel>
            <SidebarGroupAction>
              <Link href="/chat/">
                <Plus />
              </Link>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <Suspense fallback={<Spinner />}>
                <ConversationList userId={userId!} />
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
      <main className="w-full relative">
        <div className="absolute">
          <SidebarTrigger className="-mb-4" />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
