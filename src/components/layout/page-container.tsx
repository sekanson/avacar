import { cn } from "@/lib/utils/cn";

interface PageContainerProps {
  children: React.ReactNode;
  padded?: boolean;
  scrollable?: boolean;
  className?: string;
}

export function PageContainer({
  children,
  padded = true,
  scrollable = true,
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        scrollable && "flex-1 overflow-y-auto",
        padded && "px-page-x",
        className
      )}
    >
      {children}
    </div>
  );
}

export default PageContainer;
