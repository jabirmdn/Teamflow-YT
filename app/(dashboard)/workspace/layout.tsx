import React, { ReactNode, Suspense } from "react";
import { WorkspaceList } from "./_components/WorkspaceList";
import { CreateWorkspace } from "./_components/CreateWorkspace";
import { UserNav } from "./_components/UserNav";

const WorkspaceLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      <div className="flex h-full w-16 flex-col items-center bg-secondary py-3 px-2 border-r border-border">
        <Suspense fallback={<p>Loading workspaces...</p>}>
          <WorkspaceList />
        </Suspense>
        <div className="mt-4">
          <CreateWorkspace />
        </div>
        <div className="mt-auto">
          <Suspense>
            <UserNav />
          </Suspense>
        </div>
      </div>
      {children}
    </div>
  );
};

export default WorkspaceLayout;
