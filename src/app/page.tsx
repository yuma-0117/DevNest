import { ThreadList } from "./components/thread/thread-list";

export default function Home() {
  return (
    <div className="p-2">
      <div className="max-w-4xl mx-auto">
        <ThreadList />
      </div>
    </div>
  );
}
