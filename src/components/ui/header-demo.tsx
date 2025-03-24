
import { Header1 } from "@/components/ui/header";

function HeaderDemo() {
  return (
    <div className="block pt-20">
      <Header1 />
      <div className="mt-24 text-center py-8">
        <h2 className="text-2xl font-bold">Header Demo</h2>
        <p className="text-muted-foreground">This demonstrates our new navigation header</p>
      </div>
    </div>
  );
}

export { HeaderDemo };
